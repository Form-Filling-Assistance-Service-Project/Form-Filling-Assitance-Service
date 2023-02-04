import mimetypes
from flask import Blueprint, request, jsonify, make_response
from database.db import mongo,collection
from bson import ObjectId
from formLogic.formStatParser import fields_stats

# create the blueprint to be registered in app.py
form = Blueprint("form", __name__)
@form.route('/')
def index():
    print(request.headers)
    return "Hi!! from server"

@form.route("/api/<company_name>", methods=["POST"])
def create_user(company_name):
    # validate company is registered for service here

    # endpoint for company client to register form
    form_json = request.get_json()
    form_json["company_name"] = company_name
    try:
        mongo.db.forms.insert_one(form_json)
        return make_response("form was registered",200)
    except Exception as e:
        # log error and return error to client
        return make_response(e, 500)


@form.route("/api/<company_name>/<form_name>", methods=["GET"])
def get_form_schema(company_name,form_name):
    form_schema = mongo.db.forms.find_one({"company_name":company_name,"form_name":form_name},{"_id":0})
    if form_schema:
        return make_response(form_schema, 200)
    else:
        return make_response("No form found", 404)


@form.route("/api/<company_name>/<form_name>",methods=["POST"])
def get_field_stats(company_name,form_name):
    # validate and check from stat request correctness
    form = mongo.db.forms.find_one({'company_name':company_name,'form_name':form_name},{"_id":0})
    if form == None:
        return make_response("No form found", 404)

    # connect to forms db
    filled_form = request.get_json()
    fcollection = collection(form['db_uri'],form_name)
    response =jsonify(fields_stats(form, fcollection, filled_form))

    # stat logic and create response

    return make_response(response,200)



@form.route("/api/user/<string:user_id>", methods=["DELETE"])
def delete_user(user_id):

    result = mongo.db.users.delete_one({"_id": ObjectId(user_id)})
    if result.deleted_count == 1:
        return {}, 204
    else:
        return "No user found with this ID", 404
