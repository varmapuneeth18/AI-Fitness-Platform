from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date, timedelta
import models, database, schemas, dependencies

router = APIRouter(
    prefix="/workouts",
    tags=["workouts"],
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

class WorkoutPlanCreate(schemas.BaseModel):
    template_id: int 

class SetLog(schemas.BaseModel):
    weight: float
    reps: int
    rpe: Optional[float] = None

class ExerciseLog(schemas.BaseModel):
    exercise_id: int
    sets: List[SetLog]

class SessionLogCreate(schemas.BaseModel):
    session_id: int
    logs: List[ExerciseLog]
    notes: Optional[str] = None

@router.post("/plan")
def assign_plan(plan_req: WorkoutPlanCreate, db: Session = Depends(get_db), current_user: models.User = Depends(dependencies.get_current_user)):
    # Deactivate old plans
    db.query(models.WorkoutPlan).filter(models.WorkoutPlan.user_id == current_user.id).update({"active": False})
    
    template = db.query(models.WorkoutTemplate).filter(models.WorkoutTemplate.id == plan_req.template_id).first()
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")

    # Generate schedule (simplistic: Start active today, repeat sessions)
    # config["sessions"] is a list of sessions. We map them to days.
    # We will just save the structure for now.
    
    new_plan = models.WorkoutPlan(
        user_id=current_user.id,
        start_date=date.today(),
        active=True,
        schedule=template.config
    )
    db.add(new_plan)
    db.commit()
    return {"status": "Plan assigned", "plan_id": new_plan.id}

@router.get("/today")
def get_today_workout(db: Session = Depends(get_db), current_user: models.User = Depends(dependencies.get_current_user)):
    # Find active plan
    plan = db.query(models.WorkoutPlan).filter(models.WorkoutPlan.user_id == current_user.id, models.WorkoutPlan.active == True).first()
    if not plan:
        return None
    
    # In a real app, we check if today is a workout day from `plan.schedule`
    # For MVP, we just return the first session of the template as "Next Workout" 
    # if no session is logged for today.
    
    # Check if logged today
    # ...
    
    # Return placeholder next session
    sessions_config = plan.schedule.get("sessions", [])
    if not sessions_config: return None
    
    # Just rotate A/B based on id parity for fun? Or just return A.
    next_session_config = sessions_config[0] 
    
    # Resolve exercise names to IDs
    exercise_names = next_session_config["exercises"]
    exercises_db = db.query(models.Exercise).filter(models.Exercise.name.in_(exercise_names)).all()
    
    # Map back to preserve order or just send what we found
    exercises_data = []
    for name in exercise_names:
        # Find matching db record
        match = next((e for e in exercises_db if e.name == name), None)
        if match:
            exercises_data.append({"id": match.id, "name": match.name})
        else:
            # Fallback if name mismatch (e.g. seed difference)
            exercises_data.append({"id": -1, "name": name})

    return {
        "plan_id": plan.id,
        "session_name": next_session_config["name"],
        "exercises": exercises_data 
    }

@router.post("/log")
def log_workout(log: SessionLogCreate, db: Session = Depends(get_db), current_user: models.User = Depends(dependencies.get_current_user)):
    # Create session entry if not exists for this specific instance?
    # Our data model `WorkoutSession` links to `WorkoutPlan`.
    # `log.session_id` might refer to a pre-created session or we create one now.
    
    # Simplification: We create a new `WorkoutSession` record on the fly for "Today".
    
    plan = db.query(models.WorkoutPlan).filter(models.WorkoutPlan.user_id == current_user.id, models.WorkoutPlan.active == True).first()
    if not plan:
         raise HTTPException(status_code=400, detail="No active plan")

    session = models.WorkoutSession(
        plan_id=plan.id,
        date=date.today(),
        completed=True,
        name="Logged Session"
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    
    for ex_log in log.logs:
        new_log = models.WorkoutLog(
            session_id=session.id,
            exercise_id=ex_log.exercise_id,
            sets=[s.dict() for s in ex_log.sets], # Store as JSON
            notes=log.notes
        )
        db.add(new_log)
    
    db.commit()
    return {"status": "Logged", "session_id": session.id}
