from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db, bcrypt, jwt
from flask_migrate import Migrate

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    migrate = Migrate(app, db)

    # Enable CORS properly for your frontend origin
    CORS(
        app,
        supports_credentials=True,  # allow cookies/auth headers
        resources={r"/*": {"origins": "http://localhost:5173"}}  # your frontend
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