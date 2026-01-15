from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, DateTime, Enum, JSON, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from .database import Base

class GoalType(str, enum.Enum):
    FAT_LOSS = "fat_loss"
    MUSCLE_GAIN = "muscle_gain"
    MAINTENANCE = "maintenance"
    STRENGTH = "strength"
    GENERAL_HEALTH = "general_health"

class ActivityLevel(str, enum.Enum):
    SEDENTARY = "sedentary"
    LIGHTLY_ACTIVE = "lightly_active"
    MODERATELY_ACTIVE = "moderately_active"
    VERY_ACTIVE = "very_active"
    EXTRA_ACTIVE = "extra_active"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    profile = relationship("Profile", back_populates="user", uselist=False)
    body_metrics = relationship("BodyMetric", back_populates="user")
    workout_plans = relationship("WorkoutPlan", back_populates="user")
    food_logs = relationship("FoodLog", back_populates="user")

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    
    full_name = Column(String, nullable=True)
    age = Column(Integer)
    height_cm = Column(Float)
    weight_kg = Column(Float) # Current weight snapshot
    sex = Column(String)
    
    activity_level = Column(Enum(ActivityLevel), default=ActivityLevel.MODERATELY_ACTIVE)
    goal = Column(Enum(GoalType), default=GoalType.GENERAL_HEALTH)
    
    dietary_restrictions = Column(JSON, default=list) # e.g. ["vegan", "nut_allergy"]
    equipment = Column(JSON, default=list) # e.g. ["dumbbells", "bench"]
    
    user = relationship("User", back_populates="profile")

class BodyMetric(Base):
    __tablename__ = "body_metrics"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(Date, default=func.now())
    
    weight_kg = Column(Float)
    body_fat_pct = Column(Float, nullable=True)
    
    # Store other metrics as JSON to allow flexibility (e.g. chest_cm, waist_cm)
    measurements = Column(JSON, default=dict)
    
    user = relationship("User", back_populates="body_metrics")

class WorkoutTemplate(Base):
    __tablename__ = "workout_templates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    # Plan structure config
    config = Column(JSON) 

class WorkoutPlan(Base):
    __tablename__ = "workout_plans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    active = Column(Boolean, default=True)
    start_date = Column(Date)
    end_date = Column(Date, nullable=True)
    
    # The generated weekly schedule
    schedule = Column(JSON) 
    
    user = relationship("User", back_populates="workout_plans")
    sessions = relationship("WorkoutSession", back_populates="plan")

class WorkoutSession(Base):
    __tablename__ = "workout_sessions"

    id = Column(Integer, primary_key=True, index=True)
    plan_id = Column(Integer, ForeignKey("workout_plans.id"))
    date = Column(Date)
    completed = Column(Boolean, default=False)
    name = Column(String) # e.g. "Upper Body Power"
    
    plan = relationship("WorkoutPlan", back_populates="sessions")
    logs = relationship("WorkoutLog", back_populates="session")

class Exercise(Base):
    __tablename__ = "exercises"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    muscle_group = Column(String)
    category = Column(String) # Barbell, Dumbbell, Machine, Bodyweight
    description = Column(String, nullable=True)
    image_url = Column(String, nullable=True)

class WorkoutLog(Base):
    __tablename__ = "workout_logs"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("workout_sessions.id"))
    exercise_id = Column(Integer, ForeignKey("exercises.id"))
    
    # List of sets: [{"weight": 100, "reps": 5, "rpe": 8}, ...]
    sets = Column(JSON)
    notes = Column(String, nullable=True)

    session = relationship("WorkoutSession", back_populates="logs")
    exercise = relationship("Exercise")

class FoodItem(Base):
    __tablename__ = "food_items"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    brand = Column(String, nullable=True)
    
    calories_per_100g = Column(Float)
    protein_per_100g = Column(Float)
    carbs_per_100g = Column(Float)
    fat_per_100g = Column(Float)
    
    serving_size_g = Column(Float, nullable=True)
    serving_unit = Column(String, nullable=True) # "slice", "cup", etc.

class FoodLog(Base):
    __tablename__ = "food_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(Date, default=func.now())
    meal_type = Column(String) # Breakfast, Lunch, Dinner, Snack
    
    food_item_id = Column(Integer, ForeignKey("food_items.id"))
    quantity_g = Column(Float) # Amount consumed in grams
    
    user = relationship("User", back_populates="food_logs")
    food_item = relationship("FoodItem")
class WeeklySummary(Base):
    __tablename__ = "weekly_summaries"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    week_start_date = Column(Date)
    summary_text = Column(String) # AI generated text
    created_at = Column(DateTime, default=func.now())
    
    user = relationship("User", back_populates="weekly_summaries")

User.weekly_summaries = relationship("WeeklySummary", back_populates="user")

