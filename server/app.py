from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from extensions import db, bcrypt, jwt
from flask_migrate import Migrate
import os

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Disable strict slashes globally
    app.url_map.strict_slashes = False
    
    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    
    # Setup migrations
    migrate = Migrate(app, db)

    # Configure CORS for production
    allowed_origins = os.environ.get("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
    
    CORS(
        app,
        origins=allowed_origins,
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        expose_headers=["Content-Type", "Authorization"]
    )

    # Register blueprints
    from routes.auth import auth_bp
    from routes.tasks import task_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(task_bp, url_prefix="/tasks")

    # Add a simple home route for health checks
    @app.route("/")
    def home():
        return jsonify({"message": "TaskMaster Pro API is running"}), 200

    @app.route("/health")
    def health():
        return jsonify({"status": "healthy"}), 200

    return app

# Create the app instance for Gunicorn
app = create_app()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)