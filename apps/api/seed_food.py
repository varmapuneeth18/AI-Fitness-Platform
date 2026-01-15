from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from . import models

# Ensure tables exist
models.Base.metadata.create_all(bind=engine)

def seed_food_data():
    db = SessionLocal()
    
    # Check if empty
    if db.query(models.FoodItem).count() > 0:
        print("Food DB already populated.")
        db.close()
        return

    foods = [
        {"name": "Chicken Breast (Raw)", "calories": 110, "protein": 23, "carbs": 0, "fat": 1.2, "unit": "100g"},
        {"name": "Chicken Breast (Cooked)", "calories": 165, "protein": 31, "carbs": 0, "fat": 3.6, "unit": "100g"},
        {"name": "White Rice (Cooked)", "calories": 130, "protein": 2.7, "carbs": 28, "fat": 0.3, "unit": "100g"},
        {"name": "Brown Rice (Cooked)", "calories": 111, "protein": 2.6, "carbs": 23, "fat": 0.9, "unit": "100g"},
        {"name": "Egg (Large)", "calories": 70, "protein": 6, "carbs": 0.5, "fat": 5, "unit": "1 item", "serving_unit": "item", "serving_size_g": 50},
        {"name": "Oats (Rolled, Dry)", "calories": 389, "protein": 16.9, "carbs": 66, "fat": 6.9, "unit": "100g"},
        {"name": "Banana", "calories": 89, "protein": 1.1, "carbs": 23, "fat": 0.3, "unit": "100g"},
        {"name": "Apple", "calories": 52, "protein": 0.3, "carbs": 14, "fat": 0.2, "unit": "100g"},
        {"name": "Broccoli (Raw)", "calories": 34, "protein": 2.8, "carbs": 7, "fat": 0.4, "unit": "100g"},
        {"name": "Spinach (Raw)", "calories": 23, "protein": 2.9, "carbs": 3.6, "fat": 0.4, "unit": "100g"},
        {"name": "Olive Oil", "calories": 884, "protein": 0, "carbs": 0, "fat": 100, "unit": "100g"},
        {"name": "Almonds", "calories": 579, "protein": 21, "carbs": 22, "fat": 50, "unit": "100g"},
        {"name": "Whey Protein Powder", "calories": 370, "protein": 80, "carbs": 5, "fat": 3, "unit": "100g"},
        {"name": "Salmon (Raw)", "calories": 208, "protein": 20, "carbs": 0, "fat": 13, "unit": "100g"},
        {"name": "Potato (Boiled)", "calories": 87, "protein": 1.9, "carbs": 20, "fat": 0.1, "unit": "100g"},
        {"name": "Sweet Potato (Boiled)", "calories": 86, "protein": 1.6, "carbs": 20, "fat": 0.1, "unit": "100g"},
        {"name": "Greek Yogurt (Nonfat)", "calories": 59, "protein": 10, "carbs": 3.6, "fat": 0.4, "unit": "100g"},
        {"name": "Milk (Whole)", "calories": 61, "protein": 3.2, "carbs": 4.8, "fat": 3.3, "unit": "100g"},
        {"name": "Avocado", "calories": 160, "protein": 2, "carbs": 9, "fat": 15, "unit": "100g"},
        {"name": "Pasta (Cooked)", "calories": 131, "protein": 5, "carbs": 25, "fat": 1.1, "unit": "100g"},
    ]

    for f in foods:
        item = models.FoodItem(
            name=f["name"],
            calories_per_100g=f["calories"],
            protein_per_100g=f["protein"],
            carbs_per_100g=f["carbs"],
            fat_per_100g=f["fat"],
            serving_unit=f.get("serving_unit", "g"),
            serving_size_g=f.get("serving_size_g", 100)
        )
        db.add(item)
    
    db.commit()
    print(f"Seeded {len(foods)} food items.")
    db.close()

if __name__ == "__main__":
    seed_food_data()
