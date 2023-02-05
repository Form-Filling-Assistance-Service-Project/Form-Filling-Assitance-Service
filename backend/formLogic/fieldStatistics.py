import numpy as np
from collections import Counter
import bson.decimal128 as decimal128
from multi_rake import Rake


def get_dist(collection, type):
    match type:
        case "string_set" | "boolean":
            return desc_field(collection)
        case  "string_mult_set":
            values=[]
            for i in collection:
                values.extend(i)
            return desc_field(values)
        case "string":
            return word_freq(collection)
        case "int":
            return desc_field(collection)
        case "int_list":
            return desc_field(collection)
        case "float":
            return cont_field(collection)
        case "decimal128":
            collection = [float(val.to_decimal()) for val in collection]
            # collection = np.array(collection,dtype=np.double)
            # res =cont_field(collection)
            # res["bin_edges"] = [str(decimal128.Decimal128(str(b))) for b in res["bin_edges"]]
            # res["hist"] = [str(decimal128.Decimal128(str(b))) for b in res["hist"]]
            # return res
            return desc_field(collection)



def desc_field(collection):
    # default 10 bins, no range
    hist = Counter(collection)
    return  {key: value/len(collection) for key, value in hist.items()}


def cont_field(collection):
    hist, bin_edges = np.histogram(collection)
    return  {"hist":hist.tolist(),"bin_edges":bin_edges.tolist()}


def word_freq(collection):
    rake = Rake(min_freq=3)
    text = ' '.join(collection)
    res = rake.apply(text,text_for_stopwords=None)

    return res

