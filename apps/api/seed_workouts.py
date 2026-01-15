from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from . import models
import json

models.Base.metadata.create_all(bind=engine)

def seed_workouts():
    db = SessionLocal()
    
    # Check exercises
    if db.query(models.Exercise).count() == 0:
        exercises = [
            {"name": "Bench Press", "muscle_group": "Chest", "category": "Barbell"},
            {"name": "Squat", "muscle_group": "Legs", "category": "Barbell"},
            {"name": "Deadlift", "muscle_group": "Back", "category": "Barbell"},
            {"name": "Overhead Press", "muscle_group": "Shoulders", "category": "Barbell"},
            {"name": "Pull Up", "muscle_group": "Back", "category": "Bodyweight"},
            {"name": "Dumbbell Row", "muscle_group": "Back", "category": "Dumbbell"},
            {"name": "Dumbbell Curl", "muscle_group": "Biceps", "category": "Dumbbell"},
            {"name": "Tricep Extension", "muscle_group": "Triceps", "category": "Cable"},
            {"name": "Lunge", "muscle_group": "Legs", "category": "Dumbbell"},
        ]
        for e in exercises:
            db.add(models.Exercise(**e))
        db.commit()
    
    # Check templates
    if db.query(models.WorkoutTemplate).count() == 0:
        # Full Body Template
        full_body = models.WorkoutTemplate(
            name="Full Body Beginner",
            description="3 days a week, hitting all major muscle groups.",
            config={
                "days_per_week": 3,
                "split": "Full Body",
                "sessions": [
                    {
                        "name": "Full Body A",
                        "exercises": ["Squat", "Bench Press", "Dumbbell Row"] 
                    },
                    {
                        "name": "Full Body B", 
                        "exercises": ["Deadlift", "Overhead Press", "Pull Up"]
                    }
                ]
            }
        )
        db.add(full_body)
        db.commit()

    print("Seeded workouts.")
    db.close()

if __name__ == "__main__":
    seed_workouts()
