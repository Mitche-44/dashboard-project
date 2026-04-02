from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db, bcrypt, jwt
from flask_migrate import Migrate

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Disable strict slashes globally
    app.url_map.strict_slashes = False
    
    migrate = Migrate(app, db)

    # Configure CORS properly - Allow PATCH method
    CORS(
        app,
        origins=["http://localhost:5173"],
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],  # PATCH is here
        expose_headers=["Content-Type", "Authorization"]
    )

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    from routes.auth import auth_bp
    from routes.tasks import task_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(task_bp, url_prefix="/tasks")

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)