from jsonschema import validate

schema = {
    "type":"object",
    "properties":{
        "name":{"type":"string"},
        "fields":{"type":"array"},
        "items":{
            "title":{"type":"string"},
            "field_name":{"type":"string"}
        }
    }
}

validate({"name":"str","fields":[{"title":"str","field_name":"str"},{"title":"str","field_name":"str"}]},schema=schema)