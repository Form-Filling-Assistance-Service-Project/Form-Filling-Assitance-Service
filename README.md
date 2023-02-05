# Form-Filling-Assitance-Service

Backround:
Today, filling out interactive forms is a basic process for receiving service. With the development of the existing services, these forms have become complex and full of concepts and information that a basic user is not familiar with these details, which may make it difficult for the user to receive the optimal service, and the conditions that he deserves to receive and thus may not find the maximum potential from the service. This tool is designed to make it easier for users and provide end-to-end support with filling out and submitting forms based on suggestions tailored to the user, thus enabling new users or those who are interested in this support to fill out these forms professionally and correctly.

This repository contains project of form filling assistance, this provide customers end-to-end assistance with completing and submitting their entire form. 
Client who want to use this tool need to send his Database URI with all the filled forms. and to send form format structure, and fields data type.

# How it works
The project analyzes the data in the data base, and the details that the end user adds in his form.
Parser analyzes the filled forms from the filled forms data base, and for the unfilled forms the tool will take forms based on the fields that the user filled.
The statistics being computing for two main types: string fields that computing based on Rake algorithm, and numerical and finite set strings that are computed for the distribution of the data, the output data has value and weight pairs. 
To demonstrate the use of the service, we created a basic UI for filling out an AirBNB sample form, by an end customer. The project uses HTML to display the UI, in addition to accessing objects we used Javascript and the React library. The site is built from a landing page which with the click of a button, redirect to filling out the form, followed by a view of the form that it must fill out. When the user is on the field that he is required to fill in, a statistic will be opened for him that will be displayed graphically based on the information found in the database and the information he filled out.


Distrubution elements:
1.Thread pool 
2.Nginx load balancer 
3.Using MongoDB - non relation data base



#Getting Started

Firstly, you must have the following installed:
Python 3
node.js
MongoDB


## Steps To run project:

1.Clone repo to local directory 

Initialize DataBases:

2.open first shell
create data/clientdb directory and initialize mongodb database for client on localhost port 27017 

CMD: ```mongod --dbpath .../data/clientdb```


3.open second shell 
create data/appdb directory and  andinitialize mongodb database for app on localhost port 4444 
CMD: ```mongod --dbpath .../data/appdb --port 4444```

4.In the project shell:
a.mongosh --nodb
b.load ("createFormAppDb.js")

5.Open MongoDB compass:
Connect to default:27017 
create db :  airbnb , collection:listings 
import the listings.json file

Backend-
4.Open shell from backend directory 
a.python -m venv ./venv
b.source ./venv/bin/activate
c.pip install -r ./backend/requirements.txt
d.flask run (for localhost port 8080 and localhost port 8081)
h.Enter shell from nginx directory and run: nginx start 

Frontend-

5.Open new shell from frontend directory

a.npm install 

b.npm start 


![image](https://user-images.githubusercontent.com/74301168/216817255-274639e5-4082-42fe-b490-c9a7ce702cc7.png)
