//***script for initializing the forms db with collection and schema***/
// app uri
port = 4444
mongodb_hostname = 'mongodb://localhost'
db_name = 'formsApp'
uri = `${mongodb_hostname}:${port}/${db_name}`;
db = connect( uri );

//********************create form field options schema*****************/
// general field for types :
// "boolean","int","int_set","foat","string","int_set","decimal128"
const field_schema = {
    bsonType: ["object"],
    required: ["field_name","field_type"],
    description: "fields must contain name and type",
    additionalProperties: false,
    properties: {
        title: {
            bsonType:["string"],
            maxLength: 200
        },
        field_name:{
            bsonType: ["string"],
            minLength: 1,
            maxLength:50
        },
        field_type:{
            bsonType: ["string"],
            enum: ["boolean","int","float","string","decimal128"]
        }

    }
}

// list of strings
const string_set_field = {
    bsonType: ["object"],
    required: ["field_name","field_type","set_values"],
    description: "fields must contain name and type",
    additionalProperties: false,
    properties: {
        title: {
            bsonType:["string"],
            maxLength: 200
        },
        field_name:{
            bsonType: ["string"],
            minLength: 1,
            maxLength:50
        },
        field_type:{
            bsonType: ["string"],
            enum: ["string_set"]
        },
        set_values:{
            bsonType:["array"],
            minItems: 2,
            maxItems: 50,
            uniqueItems: true,
            additionalProperties: false,
            description:"set of items for field",
            items: {
                bsonType:["string"],
                minLength: 1,
                maxLength:50
            }
        }
    }
}

// list of integers
const int_set_field = {
    bsonType: ["object"],
    required: ["field_name","field_type","set_values"],
    description: "fields must contain name and type",
    additionalProperties: false,
    properties: {
        title: {
            bsonType:["string"],
            maxLength: 200
        },
        field_name:{
            bsonType: ["string"],
            minLength: 1,
            maxLength:50
        },
        field_type:{
            bsonType: ["string"],
            enum: ["int_set"]
        },
        set_values:{
            bsonType:["array"],
            minItems: 2,
            maxItems: 50,
            uniqueItems: true,
            additionalProperties: false,
            description:"set of items for field",
            items: {
                bsonType:["int"]
            }
        }
    }
}

// mutiple choice of strings
const string_mult_set_field = {
    bsonType: ["object"],
    required: ["field_name","field_type","set_values"],
    description: "fields must contain name and type",
    additionalProperties: false,
    properties: {
        title: {
            bsonType:["string"],
            maxLength: 200
        },
        field_name:{
            bsonType: ["string"],
            minLength: 1,
            maxLength:50
        },
        field_type:{
            bsonType: ["string"],
            enum: ["string_mult_set"]
        },
        set_values:{
            bsonType:["array"],
            minItems: 2,
            maxItems: 50,
            uniqueItems: true,
            additionalProperties: false,
            description:"set of items for field",
            items: {
                bsonType:["string"],
                minLength: 1,
                maxLength:50
            }
        }
    }
}

// create form schema
const json_schema = {
    required:["company_name","form_name","db_uri","fields"],
    additionalProperties: true,
    properties: {
        company_name: {
            bsonType: ["string"],
            description: "company name must be a string and is required"
        },
        form_name: {
            bsonType: ["string"],
            description: "form name must be a string and is required"
        },
        db_uri: {
            bsonType: ["string"],
            description: "uri must be a string and is required"
        },
        fields: {
            bsonType: ["array"],
            minItems: 1,
            maxItems: 30,
            uniqueItems: true,
            additionalProperties: false,
            items: {
                anyOf: [
                    field_schema,string_set_field,int_set_field,
                    string_mult_set_field
                ]
            }
        }
    }
}


//********************create collection with schema******************/
if (db.getCollectionNames().includes('forms')){
    db.forms.drop();
}

db.createCollection("forms", {
    validator: {$jsonSchema: json_schema}
})

var airbnb_listings = {
    company_name: "airbnb",
    form_name:"listings",
    db_uri:"mongodb://localhost:27017/airbnb",
    fields:[
        {
            field_name:"name",
            field_type:"string"
        },
        {
            field_name:"description",
            field_type:"string"
        },
        {
            field_name:"neighborhood_overview",
            field_type:"string"
        },
        {
            field_name:"transit",
            field_type:"string"
        },
        {
            field_name:"property_type",
            field_type:"string_set",
            set_values:[
                "Apartment","House", "Guest suite","Serviced apartment",
                "Hotel","Condominium","Boutique hotel","Aparthotel","Loft",
                "Townhouse","Bed and breakfast","Villa"
            ]
        },
        {
            field_name:"room_type",
            field_type:"string_set",
            set_values:[
                "Entire home/apt","Private room","Shared room"
            ]
        },
        {
            field_name:"bed_type",
            field_type:"string_set",
            set_values:[
                "Real Bed","Pull-out Sofa"
            ]
        },
        {
            field_name:"minimum_nights",
            field_type:"int"
        },
        {
            field_name:"maximum_nights",
            field_type:"int"
        },
        {
            field_name:"cancellation_policy",
            field_type:"string_set",
            set_values:[
                "moderate","flexible","strict_14_with_grace_period",
                "super_strict_60","super_strict_30"
            ]
        },
        {
            field_name:"accommodates",
            field_type:"int"
        },
        {
            field_name:"bedrooms",
            field_type:"int"
        },
        {
            field_name:"beds",
            field_type:"int"
        },
        {
            field_name:"bathrooms",
            field_type:"decimal128"
        },
        {
            field_name:"amenities",
            field_type:"string_mult_set",
            set_values:[
                  "Dishes and silverware","Shampoo","Kitchen","Wide entryway",
                  "Paid parking off premises","Host greets you","Washer","Wifi",
                  "Hair dryer","Microwave","Hot water","Cooking basics","TV",
                  "Lockbox", "Family/kid friendly","Long term stays allowed",
                  "Ethernet connection","Heating","Fireplace guards","Luggage dropoff allowed",
                  "Refrigerator","Bed linens","Cat(s)","Dryer","Private entrance",
                  "Fixed grab bars for shower","Oven","Carbon monoxide detector",
                  "Elevator","Essentials","Free parking on premises",
                  "Hangers","Air conditioning","Room-darkening shades",
                  "translation missing: en.hosting_amenity_50","Building staff",
                  "Fire extinguisher","First aid kit","Pocket wifi",
                  "Lock on bedroom door","Private living room",
                  "Smoking allowed","Smoke detector","Iron",
                  "Children’s dinnerware","Coffee maker"
            ]
        },
        {
            field_name:"price",
            field_type:"decimal128"
        },
        {
            field_name:"weekly_price",
            field_type:"decimal128"
        },
        {
            field_name:"monthly_price",
            field_type:"decimal128"
        },
        {
            field_name:"security_deposit",
            field_type:"decimal128"
        },
        {
            field_name:"cleaning_fee",
            field_type:"decimal128"
        },
        {
            field_name:"extra_people",
            field_type:"decimal128"
        },
        {
            field_name:"guests_included",
            field_type:"decimal128"
        },
        {
            field_name:"country",
            field_type:"string_set",
            set_values:[
                "Spain","Canada","China", "United States","Hong Kong",
                "Brazil","Turkey","Portugal","Australia"
            ]
        },
        {
            field_name:"government_area",
            field_type:"string"
        },
        {
            field_name:"street",
            field_type:"string"
        }
    ]
};

db.forms.insertOne(airbnb_listings);



