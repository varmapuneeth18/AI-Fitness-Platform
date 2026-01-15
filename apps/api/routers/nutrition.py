from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from datetime import date
import models, database, schemas, auth, dependencies

router = APIRouter(
    prefix="/nutrition",
    tags=["nutrition"],
    responses={404: {"description": "Not found"}},
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

class FoodItemResponse(schemas.BaseModel):
    id: int
    name: str
    calories_per_100g: float
    protein_per_100g: float
    carbs_per_100g: float
    fat_per_100g: float
    unit: str = "100g"

class FoodLogCreate(schemas.BaseModel):
    food_item_id: int
    quantity_g: float
    meal_type: str = "Snack" 

class FoodLogResponse(schemas.BaseModel):
    id: int
    food_item: FoodItemResponse
    quantity_g: float
    calories: float
    protein: float
    carbs: float
    fat: float
    meal_type: str
    date: date

@router.get("/search", response_model=List[FoodItemResponse])
def search_food(q: str, db: Session = Depends(get_db)):
    # Simple search
    foods = db.query(models.FoodItem).filter(models.FoodItem.name.ilike(f"%{q}%")).limit(20).all()
    return foods

@router.post("/log", response_model=FoodLogResponse)
def log_food(log: FoodLogCreate, db: Session = Depends(get_db), current_user: models.User = Depends(dependencies.get_current_user)):
    user = current_user


    food_item = db.query(models.FoodItem).filter(models.FoodItem.id == log.food_item_id).first()
    if not food_item:
        raise HTTPException(status_code=404, detail="Food item not found")

    new_log = models.FoodLog(
        user_id=user.id,
        food_item_id=log.food_item_id,
        quantity_g=log.quantity_g,
        meal_type=log.meal_type,
        date=date.today()
    )
    db.add(new_log)
    db.commit()
    db.refresh(new_log)

    # Calculate macros
    ratio = new_log.quantity_g / 100.0
    
    return {
        "id": new_log.id,
        "food_item": food_item,
        "quantity_g": new_log.quantity_g,
        "calories": food_item.calories_per_100g * ratio,
        "protein": food_item.protein_per_100g * ratio,
        "carbs": food_item.carbs_per_100g * ratio,
        "fat": food_item.fat_per_100g * ratio,
        "meal_type": new_log.meal_type,
        "date": new_log.date
    }

from fastapi import UploadFile, File

@router.post("/analyze-image")
async def analyze_food_image(file: UploadFile = File(...)):
    # Mock implementation of Vision API
    # In real world: Send image bytes to OpenAI GPT-4V or Gemini Vision
    
    # Mocking a detected "Chicken Salad"
    return {
        "detected_items": [
            {
                "name": "Grilled Chicken Salad",
                "calories_per_100g": 150,
                "protein_per_100g": 12,
                "carbs_per_100g": 5,
                "fat_per_100g": 8,
                "estimated_weight_g": 350
            }
        ],
        "message": "I detected a Chicken Salad. Would you like to log it?"
    }

@router.get("/today", response_model=List[FoodLogResponse])
def get_daily_logs(db: Session = Depends(get_db), current_user: models.User = Depends(dependencies.get_current_user)):
    logs = db.query(models.FoodLog).filter(
        models.FoodLog.user_id == current_user.id, 
        models.FoodLog.date == date.today()
    ).all()
    
    result = []
    for log in logs:
        item = log.food_item
        ratio = log.quantity_g / 100.0
        result.append({
            "id": log.id,
            "food_item": item,
            "quantity_g": log.quantity_g,
            "calories": item.calories_per_100g * ratio,
            "protein": item.protein_per_100g * ratio,
            "carbs": item.carbs_per_100g * ratio,
            "fat": item.fat_per_100g * ratio,
            "meal_type": log.meal_type,
            "date": log.date
        })
    return result
