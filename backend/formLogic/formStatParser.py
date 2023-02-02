import formLogic.fieldStatistics as stat
import json
from langdetect import detect
# def parse_form(form,collection,filled_fields) :

    # fields = list(collection[0].keys())
    # types = list(map(lambda x:type(x).__name__, collection[0].values()))

    # # map the inputs to the function blocks
    # options = {'str' : fieldStatistics.string_field,
    #         'int' : fieldStatistics.int_field,
    #         'Decimal128' : fieldStatistics.float_field,
    # }
    # legalFields = set({'str','int','Decimal128'})
    # res = {}
    # for i,field in enumerate(types):
    #     if field in legalFields:

    #         if field == 'Decimal128':
    #             res[fields[i]] = options[field](list(map(lambda x:(x[fields[i]]).to_decimal(),collection)))
    #         else:
    #             res[fields[i]] = options[field](list(map(lambda x:x[fields[i]],collection)))

def fields_stats(form,fcollection,filled_form):

    # find statistics bases on filled part of form
    affecting_fields =[field["field_name"] for field in form["fields"] if field["field_type"] in ["string_set","int_set","string_mult_set","boolean"]]
    query = {key: filled_form[key] for key in filled_form if key in affecting_fields}
    collection = list(fcollection.find(query,{"_id":0}).limit(1000))



    #sample = list(map(lambda field: "{},{}".format([field,filled_form[field]]),filled_form))
    # collection = list(fcollection.find({field["field_name"]:{"$exists":True}},{"_id":0}))
    collection = list(fcollection.find({},{"_id":0}).limit(1000))

    # find statistics for unfilled fields based on filled part of form
    field_stats = list()
    for field in form["fields"]:
        print(field["field_name"])
        values = [listing.get(field["field_name"]) for listing in collection
            if listing.get(field["field_name"]) is not None]

        field_stats.append({field["field_name"]:stat.get_dist(values,field["field_type"])})

    return field_stats
