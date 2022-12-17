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
        data['Name'] = request.form['lname']
        data['Summary'] = request.form['smry']
        data['Space'] = request.form['space']
        data['Description'] = request.form['dsc']
        data['Neighborhood Overview'] = request.form['neb_ov']
        data['Notes'] = request.form['notes']
        data['Transit'] = request.form['transit']
        data['Access'] = request.form['access']
        data['Property type'] = request.form['property_type']
        data['Room type'] = request.form['room_type']
        data['Bed type'] = request.form['bed_type']
        data['Minimum Nights'] = request.form['min_nights']
        data['Maximum Nights'] = request.form['max_nights']
        data['Accommodates'] = request.form['accommodates']
        data['Bedrooms'] = request.form['bedroom']
        data['Beds'] = request.form['beds']
        data['Bathrooms'] = request.form['bathrooms']
        data['Price'] = request.form['price']
        data['Weekly Price'] = request.form['weekly_price']
        data['Monthly Price'] = request.form['monthly_price']
        data['Security Deposit'] = request.form['sec_deposite']
        data['Cleaning Fee'] = request.form['cln_fee']
        data['Extra People'] = request.form['extra_ppl']
        data['Street'] = request.form['street']
        data['Country'] = request.form['country']

        collection.insert_one(data)

    for field in data:
        print(field)
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


