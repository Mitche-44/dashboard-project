import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

class Config:
    # Secret keys with fallbacks for development
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key-change-in-production")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-jwt-secret-change-in-production")
    
    # Database configuration
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///app.db")
    
    # Fix for Supabase: convert postgres:// to postgresql://
    if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
    
    # Add sslmode=require for production PostgreSQL if not present
    if "postgresql" in DATABASE_URL and "sslmode" not in DATABASE_URL:
        separator = "?" if "?" not in DATABASE_URL else "&"
        DATABASE_URL = f"{DATABASE_URL}{separator}sslmode=require"
    
    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Additional configuration for production
    DEBUG = os.getenv("FLASK_DEBUG", "False").lower() == "true"
    
    # JWT configuration
    JWT_TOKEN_LOCATION = ["headers"]
    JWT_HEADER_NAME = "Authorization"
    JWT_HEADER_TYPE = "Bearer"
    
    # CORS configuration (read from environment)
    ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
    
    # Database pool settings for production
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_size": int(os.getenv("DB_POOL_SIZE", 10)),
        "max_overflow": int(os.getenv("DB_MAX_OVERFLOW", 20)),
        "pool_pre_ping": True,
        "pool_recycle": 3600
    }

# For debugging (remove in production)
if __name__ == "__main__":
    print(f"Database URL: {Config.SQLALCHEMY_DATABASE_URI}")
    print(f"Allowed Origins: {Config.ALLOWED_ORIGINS}")