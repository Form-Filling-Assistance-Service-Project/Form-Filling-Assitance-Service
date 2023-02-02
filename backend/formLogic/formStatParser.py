import formLogic.fieldStatistics as stat
import json

def fields_stats(form,fcollection,filled_form):
    field_stats = list()
    # find statistics bases on filled part of form
    unrelated_listings = list(fcollection.find({},{"_id":0}).limit(1000))

    affecting_fields =[field["field_name"] for field in form["fields"] if field["field_type"] in ["string_set","int_set","string_mult_set","boolean"]]
    query = {key: filled_form[key] for key in filled_form if key in affecting_fields}
    related_listings = list(fcollection.find(query,{"_id":0}).limit(1000))

    for field in form["fields"]:
        if field["field_name"] not in filled_form.keys():
            print(field["field_name"]+" unfilled part")
            values = [listing.get(field["field_name"]) for listing in related_listings
                if listing.get(field["field_name"]) is not None]
        else:
            print(field["field_name"]+" filled part")
            values = [listing.get(field["field_name"]) for listing in unrelated_listings
                if listing.get(field["field_name"]) is not None]

        field_stats.append({field["field_name"]:stat.get_dist(values,field["field_type"])})

    return field_stats
