from flask_pymongo import PyMongo
from pymongo import MongoClient

mongo = PyMongo()


def initialize_db(app):
    mongo.init_app(app)


def collection(uri,form_name):
    db = MongoClient(uri).get_database()
    return db[form_name]