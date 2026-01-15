import requests
from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from .models import FoodItem, Base
import os
from dotenv import load_dotenv

load_dotenv()

USDA_API_KEY = os.getenv("USDA_API_KEY")
print(f"Using USDA Key: {USDA_API_KEY}")

def seed_usda():
    db = SessionLocal()
    
    # Check if we already did this (simple check: count > 30)
    if db.query(FoodItem).count() > 30:
        print("Database already seems seeded. Skipping USDA fetch.")
        return

    # Endpoint: Foundation Foods from FoodData Central
    # Documentation: https://fdc.nal.usda.gov/api-guide.html
    url = f"https://api.nal.usda.gov/fdc/v1/foods/list?api_key={USDA_API_KEY}&dataType=Foundation&pageSize=50"
    
    print("Fetching data from USDA...")
    resp = requests.get(url)
    if resp.status_code != 200:
        print(f"Error fetching from USDA: {resp.status_code} - {resp.text}")
        return

    foods = resp.json()
    count = 0
    
    for item in foods:
        description = item.get("description", "Unknown")
        nutrients = item.get("foodNutrients", [])
        
        # USDA Nutrient IDs:
        # 203 = Protein
        # 204 = Fat
        # 205 = Carbs
        # 208 = Energy (KCAL)
        
        kcal = 0
        prot = 0
        fat = 0
        carbs = 0
        
        for n in nutrients:
            nid = n.get("number")
            amount = n.get("amount", 0)
            
            if nid == "208": kcal = amount
            if nid == "203": prot = amount
            if nid == "204": fat = amount
            if nid == "205": carbs = amount

        # Create Record
        food_obj = FoodItem(
            name=description,
            calories_per_100g=float(kcal),
            protein_per_100g=float(prot),
            carbs_per_100g=float(carbs),
            fat_per_100g=float(fat)
        )
        db.add(food_obj)
        count += 1

    db.commit()
    print(f"Successfully seeded {count} real items from USDA!")

if __name__ == "__main__":
    seed_usda()
