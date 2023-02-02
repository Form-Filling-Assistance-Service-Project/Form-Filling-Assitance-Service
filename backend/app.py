from flask import Flask, request, Response
from extensions import register_extensions
from config import register_env_variables
from views.user import user
from views.form import form
"""
This is the entry point to the backend of the application, it registers any extensions to the app
such as the db, registers the views for each class of endpoint and configures the env variables
"""

app = Flask(__name__)

# Now we register any extensions we use into the app
register_extensions(app)

# Register all blueprints for the app
"""
Blueprints are used to separate common functionality into it's own file. To add more blueprints,
create a new file and follow user.py. Then register it here in app.py the same as
below.
"""
app.register_blueprint(user)
app.register_blueprint(form)
# Configure all env variables for the app
register_env_variables()

if __name__ =='__main__':
    app.run(debug = True)
