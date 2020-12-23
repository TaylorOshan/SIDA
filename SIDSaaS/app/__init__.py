from os import environ

from flask import Flask
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


def create_app():

    app = Flask(__name__)

    app.config["SECRET_KEY"] = environ.get("SECRET_KEY")
    app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("SQLALCHEMY_DATABASE_URI")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = environ.get(
        "SQLALCHEMY_TRACK_MODIFICATIONS"
    )

    db.init_app(app)

    ##
    # Blueprints
    ##

    from .views.main import main as main_blueprint

    app.register_blueprint(main_blueprint)

    from .views.model_api import model_api as model_api_blueprint

    app.register_blueprint(model_api_blueprint)

    return app
