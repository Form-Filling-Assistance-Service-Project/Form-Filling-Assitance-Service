from logging import shutdown
import formLogic.fieldStatistics as stat
import json
from concurrent.futures import ThreadPoolExecutor

# general method for getting field statistics for form
def fields_stats(form,fcollection,filled_form):
    field_stats = list()
    # find statistics of form
    unrelated_listings = list(fcollection.find({},{"_id":0}).limit(1000))

    # find statistics bases on filled part of form
    affecting_fields =[field["field_name"] for field in form["fields"] if field["field_type"] in ["string_set","int_set","string_mult_set","boolean"]]
    query = {key: filled_form[key] for key in filled_form if key in affecting_fields}
    related_listings = list(fcollection.find(query,{"_id":0}).limit(1000))

    with ThreadPoolExecutor() as executer:
        for field in form["fields"]:
            if related_listings and field["field_name"] not in filled_form.keys():

                values = [listing.get(field["field_name"]) for listing in related_listings
                    if listing.get(field["field_name"]) is not None]
            else:

                values = [listing.get(field["field_name"]) for listing in unrelated_listings
                    if listing.get(field["field_name"]) is not None]

            field_stats.append({field["field_name"]:executer.submit(stat.get_dist,values,field["field_type"])})

    for field in field_stats:
        for key in field:
            field[key] = field[key].result()


    return field_stats
