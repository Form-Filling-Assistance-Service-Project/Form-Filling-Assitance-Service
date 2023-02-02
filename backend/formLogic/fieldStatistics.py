import numpy as np
from collections import Counter
import bson.decimal128 as decimal128
from multi_rake import Rake


def get_dist(collection, type):
    match type:
        case "string_set" | "string_multi_set" | "boolean":
            return desc_field(collection)
        case "string":
            #collection = list(map(len,collection))
            return word_freq(collection)
            #return cont_field(collection)
        case "int":
            return cont_field(collection)
        case "int_list":
            return
        case "float":
            return cont_field(collection)
        case "decimal128":
            collection = [val.to_decimal() for val in collection]
            collection = np.array(collection,dtype=np.double)
            res =cont_field(collection)
            res["bin_edges"] = [str(decimal128.Decimal128(str(b))) for b in res["bin_edges"]]
            res["hist"] = [str(decimal128.Decimal128(str(b))) for b in res["hist"]]
            return res



def desc_field(collection):
    # default 10 bins, no range
    hist = Counter(collection)
    total = sum(hist.values())
    return  {key: value / total for key, value in hist.items()}


def cont_field(collection):
    hist, bin_edges = np.histogram(collection)
    return  {"hist":hist.tolist(),"bin_edges":bin_edges.tolist()}


def word_freq(collection):
    rake = Rake(min_freq=3)
    text = ' '.join(collection)
    res = rake.apply(text,text_for_stopwords=None)

    return res

