from flask import Blueprint, request, jsonify
from extensions import db
from models.task import Task
from flask_jwt_extended import jwt_required, get_jwt_identity
import traceback

task_bp = Blueprint("tasks", __name__)

# Handle OPTIONS preflight requests
@task_bp.route("", methods=["OPTIONS"])
@task_bp.route("/", methods=["OPTIONS"])
def handle_options():
    return "", 200

# Get all tasks for logged-in user
@task_bp.route("", methods=["GET"])
@task_bp.route("/", methods=["GET"])
@jwt_required()
def get_tasks():
    try:
        user_id_str = get_jwt_identity()
        print(f" GET /tasks/ - User ID from token: {user_id_str}")
        
        user_id = int(user_id_str)
        tasks = Task.query.filter_by(user_id=user_id).all()
        print(f" Found {len(tasks)} tasks for user {user_id}")
        
        return jsonify([{
            "id": t.id,
            "title": t.title,
            "description": getattr(t, 'description', None),
            "status": getattr(t, 'status', 'pending'),
            "created_at": t.created_at.isoformat() if t.created_at else None
        } for t in tasks]), 200
        
    except Exception as e:
        print(f" Error in get_tasks: {str(e)}")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

# Create a new task
@task_bp.route("", methods=["POST"])
@task_bp.route("/", methods=["POST"])
@jwt_required()
def create_task():
    try:
        user_id_str = get_jwt_identity()
        print(f" POST /tasks/ - User ID from token: {user_id_str}")
        
        user_id = int(user_id_str)
        
        data = request.get_json()
        print(f" Received data: {data}")
        
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        if "title" not in data:
            return jsonify({"error": "Title is required"}), 400
        
        title = data.get("title", "").strip()
        if not title:
            return jsonify({"error": "Title cannot be empty"}), 400
        
        task = Task(
            title=title,
            user_id=user_id
        )
        
        if "description" in data and hasattr(Task, 'description'):
            task.description = data["description"]
        
        if "status" in data and hasattr(Task, 'status'):
            task.status = data["status"]
        
        db.session.add(task)
        db.session.commit()
        
        print(f"Task created successfully: ID={task.id}")
        
        return jsonify({
            "message": "Task created successfully",
            "id": task.id,
            "title": task.title
        }), 201
        
    except Exception as e:
        print(f" Exception in create_task: {str(e)}")
        traceback.print_exc()
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Update a task (PATCH method)
@task_bp.route("/<int:id>", methods=["PATCH"])
@jwt_required()
def update_task(id):
    try:
        user_id_str = get_jwt_identity()
        print(f" PATCH /tasks/{id} - User ID from token: {user_id_str}")
        
        user_id = int(user_id_str)
        
        # Find task belonging to this user
        task = Task.query.filter_by(id=id, user_id=user_id).first()
        
        if not task:
            print(f" Task {id} not found for user {user_id}")
            return jsonify({"error": "Task not found"}), 404
        
        data = request.get_json()
        print(f" Update data: {data}")
        
        # Update fields if provided
        if "title" in data:
            task.title = data["title"]
            print(f" Updated title to: {data['title']}")
        
        if "description" in data:
            task.description = data["description"]
            print(f" Updated description")
        
        if "status" in data:
            task.status = data["status"]
            print(f" Updated status to: {data['status']}")
        
        db.session.commit()
        
        print(f" Task {id} updated successfully")
        
        return jsonify({
            "message": "Task updated successfully",
            "id": task.id,
            "title": task.title,
            "status": task.status
        }), 200
        
    except Exception as e:
        print(f" Error updating task: {str(e)}")
        traceback.print_exc()
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Delete a task
@task_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_task(id):
    try:
        user_id_str = get_jwt_identity()
        print(f" DELETE /tasks/{id} - User ID from token: {user_id_str}")
        
        user_id = int(user_id_str)
        
        task = Task.query.filter_by(id=id, user_id=user_id).first()
        
        if not task:
            print(f" Task {id} not found for user {user_id}")
            return jsonify({"error": "Task not found"}), 404
        
        db.session.delete(task)
        db.session.commit()
        
        print(f" Task {id} deleted successfully")
        return jsonify({"message": "Task deleted successfully"}), 200
        
    except Exception as e:
        print(f" Error deleting task: {str(e)}")
        traceback.print_exc()
        db.session.rollback()
        return jsonify({"error": str(e)}), 500