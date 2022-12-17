from flask import Flask, redirect , url_for , render_template , request , session
from datetime import timedelta
from pymongo import MongoClient

cluster = MongoClient("mongodb+srv://shoko:Top12233456!@cluster0.yvfuo7p.mongodb.net/?retryWrites=true&w=majority")
db = cluster["sample_airbnb"]
collection = db["listingsAndReviews"]


app = Flask(__name__)
app.secret_key = "hello"
app.permanent_session_lifetime = timedelta(minutes=5)


#Giving a root so flask will know where we should to go to pages
# '/' default page
@app.route("/" , methods=["POST" , "GET"])
#define the pages that will be on website
#this function will give back what displays on the page
def home():
    data = {}
    if request.method == "POST":
        data['name'] = request.form['lname']
        data['summary'] = request.form['smry']
        data['space'] = request.form['space']
        data['description'] = request.form['dsc']
        data['neighborhood Overview'] = request.form['neb_ov']
        data['notes'] = request.form['notes']
        data['transit'] = request.form['transit']
        data['access'] = request.form['access']
        data['property type'] = request.form['property_type']
        data['room type'] = request.form['room_type']
        data['bed type'] = request.form['bed_type']
        data['minimum Nights'] = request.form['min_nights']
        data['maximum Nights'] = request.form['max_nights']
        data['accommodates'] = request.form['accommodates']
        data['bedrooms'] = request.form['bedroom']
        data['beds'] = request.form['beds']
        data['bathrooms'] = request.form['bathrooms']
        data['price'] = request.form['price']
        data['weekly Price'] = request.form['weekly_price']
        data['monthly Price'] = request.form['monthly_price']
        data['security Deposit'] = request.form['sec_deposite']
        data['cleaning Fee'] = request.form['cln_fee']
        data['extra People'] = request.form['extra_ppl']
        data['street'] = request.form['street']
        data['country'] = request.form['country']

        collection.insert_one(data)
 #   for field,value in data.items():
 #       print(field,value)
        result = collection.find_one({"name":"ron"})
        print(result)

#func will get the name of the html file
    return render_template("index.html")
 #   return render_template("index.html", content="Testing")


""""
@app.route("/test")
def p2():
    return render_template("test.html")

# how to get information from a form
@app.route("/login", methods=["POST" , "GET"])
def login():
    if request.method == "POST":
        # when we set it it will last as we set it above ( in default its false)
        session.permanent = True
        #making dictionary key
        user = request.form["nm"]
        # save information in the session
        session["user"] = user
        #return redirect(url_for("user", usr=user))
        return redirect(url_for("user"))
    else:
        if "user" in session:
            return redirect(url_for("user"))
        return render_template("login.html")

#@app.route("/<usr>")
#def user(usr):
#    return f"<h1>{usr}</h1>"

@app.route("/user")
def user():
    if "user" in session:
        user = session["user"]
        return f"<h1>{user}</h1>"
    else:
        return redirect(url_for("login"))
# we avoided to pass any information we getting it from session veriable

# sessions are temporary and their adv is that they are not stored on the client side but on the server
# design to quick access of information around the server

@app.route("/logout")
def logout():
    session.pop("user" , None)
    return redirect(url_for("login"))

"""



#to show dynamic information on the screen we can pass information from back end of flask to front end of html
#@app.route("/<name>")
#def user(name):
#    return render_template("index.html")

# GET its inscure way of getting information
# POST its a secure information (form data , not going to save in the web , will save it on data base)


"""
@app.route("/")
def home():
    return "Hello! this is the main page <h1>HELLO</h1>"

@app.route("/<name>")
def user(name):
    return f"Hello {name}!"

# redirect different pages
# url_for expect to get name of the function
@app.route("/admin")
def admin():
    return redirect(url_for("user" , name = "Admin!"))
# Press the green button in the gutter to run the script.
"""

if __name__ == '__main__':
    app.run(debug=True)

    # we can also give this function port=<number> (between 0 - 65k)


