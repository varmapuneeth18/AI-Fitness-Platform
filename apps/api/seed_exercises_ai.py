import requests
import json
import os
from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from .models import Exercise
from dotenv import load_dotenv

load_dotenv()

PERPLEXITY_KEY = os.getenv("PERPLEXITY_API_KEY")

def seed_exercises_ai():
    if not PERPLEXITY_KEY:
        print("No Perplexity Key found.")
        return

    db = SessionLocal()
    # Check existing count
    if db.query(Exercise).count() > 10: 
        print("Exercises already populated.")
        return

    prompt = """
    Generate a JSON list of 20 popular gym exercises.
    Each item must have:
    - name (string)
    - description (string, 1-2 sentences on how to perform it)
    - muscle_group (string, e.g. Chest, Back, Legs)
    - image_url (string, use a placeholder like 'https://placehold.co/600x400?text=Squat')
    
    Output ONLY valid JSON array. No markdown.
    """
    
    headers = {
        "Authorization": f"Bearer {PERPLEXITY_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "sonar-pro", # or sonar-reasoning-pro
        "messages": [
            {"role": "system", "content": "You are a helpful API that outputs strict JSON."},
            {"role": "user", "content": prompt}
        ]
    }
    
    print("Asking AI for Exercise Database...")
    try:
        resp = requests.post("https://api.perplexity.ai/chat/completions", json=payload, headers=headers)
        if resp.status_code != 200:
            print(f"Error from Perplexity: {resp.text}")
            return
            
        content = resp.json()['choices'][0]['message']['content']
        # Cleanup markdown code blocks if present
        if "```json" in content:
            content = content.replace("```json", "").replace("```", "")
        
        exercises_data = json.loads(content)
        
        count = 0
        for ex in exercises_data:
            new_ex = Exercise(
                name=ex['name'],
                description=ex['description'],
                muscle_group=ex['muscle_group'],
                video_url=ex.get('image_url', "")
            )
            db.add(new_ex)
            count += 1
            
        db.commit()
        print(f"Successfully generated {count} exercises via AI!")
        
    except Exception as e:
        print(f"Failed: {e}")

if __name__ == "__main__":
    seed_exercises_ai()
