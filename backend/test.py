from pymongo import MongoClient as mongo
import bson
import formLogic.fieldStatistics as stat

uri = "mongodb://localhost:27017/airbnb"
db = mongo(uri).get_database()
form_name = "listings"
fcollection = db[form_name]




# form = db['listingsAndReviews'].find_one({'name':'none'})
# print(form)
# form = list(db['listingsAndReviews'].find())

# legalFields = set({'str','int','Decimal128'})
# options = {'str' : fieldStatistics.string_field,
#         'int' : fieldStatistics.int_field,
#         'Decimal128' : fieldStatistics.float_field,
# }
# fields = list(form[0].keys())
# types = list(map(lambda x:type(x).__name__, form[0].values()))

# res = {}
# for i,field in enumerate(types):
#     if field in legalFields:

#         if field == 'Decimal128':
#             res[fields[i]] = options[field](list(map(lambda x:(x[fields[i]]).to_decimal(),form)))
#         else:
#             res[fields[i]] = options[field](list(map(lambda x:x[fields[i]],form)))

