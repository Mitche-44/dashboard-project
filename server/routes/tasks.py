from flask import Blueprint, request, jsonify
from extensions import db
from models.task import Task
from flask_jwt_extended import jwt_required, get_jwt_identity

task_bp = Blueprint("tasks", __name__)

# Helper decorator to allow OPTIONS preflight requests
def allow_options(fn):
    def wrapper(*args, **kwargs):
        if request.method == "OPTIONS":
            return "", 200
        return fn(*args, **kwargs)
    wrapper.__name__ = fn.__name__
    return wrapper


@task_bp.route("/", methods=["GET", "POST", "OPTIONS"])
@allow_options
@jwt_required()
def tasks():
    user_id = get_jwt_identity()

    if request.method == "GET":
        tasks = Task.query.filter_by(user_id=user_id).all()
        return jsonify([{
            "id": t.id,
            "title": t.title,
            "description": t.description,
            "status": t.status
        } for t in tasks])

    if request.method == "POST":
        data = request.json
        task = Task(
            title=data["title"],
            description=data.get("description", ""),
            user_id=user_id
        )
        db.session.add(task)
        db.session.commit()
        return jsonify({"message": "Task created"}), 201


@task_bp.route("/<int:id>", methods=["PATCH", "DELETE", "OPTIONS"])
@allow_options
@jwt_required()
def task_detail(id):
    task = Task.query.get_or_404(id)

    if request.method == "PATCH":
        data = request.json
        task.status = data.get("status", task.status)
        db.session.commit()
        return jsonify({"message": "Task updated"})

    if request.method == "DELETE":
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Task deleted"})