from flask import Blueprint, request, jsonify
from extensions import db, bcrypt, jwt
from models.user import User
from flask_jwt_extended import create_access_token
import traceback

auth_bp = Blueprint("auth", __name__)

# Signup
@auth_bp.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()
        print(f"Signup attempt with data: {data}")
        
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            print(" Signup failed: Missing email or password")
            return jsonify({"error": "Email and password required"}), 400

        # Check if user exists
        if User.query.filter_by(email=email).first():
            print(f" Signup failed: Email {email} already exists")
            return jsonify({"error": "Email already exists"}), 400

        # Create user
        user = User(email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        
        print(f" User created successfully: {email} (ID: {user.id})")
        return jsonify({"message": "User created successfully"}), 201
        
    except Exception as e:
        print(f" Signup error: {str(e)}")
        traceback.print_exc()
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Login
@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        print(f" Login attempt with data: {data}")
        
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            print(" Login failed: Missing email or password")
            return jsonify({"error": "Email and password required"}), 400

        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            print(f" Login failed: Invalid credentials for {email}")
            return jsonify({"error": "Invalid credentials"}), 401

        # FIX: Convert user.id to string to avoid "Subject must be a string" error
        access_token = create_access_token(identity=str(user.id))
        
        print(f" Login successful: {email} (ID: {user.id})")
        print(f" Token created for user_id: {str(user.id)}")
        
        return jsonify({"token": access_token}), 200
        
    except Exception as e:
        print(f" Login error: {str(e)}")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500