import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import Chart from "react-apexcharts";

const property_options = [{label:"Apartment"},{label:"House"},{label:"Guest"}, {label:"suite"},{label:"Serviced"},
    {label:"Hotel"},{label:"Condominium"},{label:"Boutique hotel"},{label:"Aparthotel"},{label:"Loft"},
    {label:"Townhouse"},{label:"Bed and breakfast"},{label:"Villa"}];

const room_options = [{label:"Entire home/apt"},{label:"Private room"},{label:"Shared room"}];

const bed_options = [{label:"Real bed"},{label:"Pull-out Sofa"}];

const cancelation_options =[{label:"moderate"},{label:"flexable"},{label:"strict_14_with_grace_period"},{label:"super_strict_60"},{label:"super_strict_30"}];

const amenities_options = [{label:"Dishes and silverware"},{label:"Shampoo"},{label:"Kitchen"},{label:"Wide entryway"},
            {label:"Paid parking off premises"},{label:"Host greets you"},{label:"Washer"},{label:"Wifi"},
            {label:"Hair dryer"},{label:"Microwave"},{label:"Hot water"},{label:"Cooking basics"},{label:"TV"},
            {label:"Lockbox"},{label:"Family/kid friendly"},{label:"Long term stays allowed"},
            {label:"Ethernet connection"},{label:"Heating"},{label:"Fireplace guards"},{label:"Luggage dropoff allowed"},
            {label:"Refrigerator"},{label:"Bed linens"},{label:"Cat(s)"},{label:"Dryer"},{label:"Private entrance"},
            {label:"Fixed grab bars for shower"},{label:"Oven"},{label:"Carbon monoxide detector"},
            {label:"Elevator"},{label:"Essentials"},{label:"Free parking on premises"},
            {label:"Hangers"},{label:"Air conditioning"},{label:"Room-darkening shades"},
            {label:"translation missing: en.hosting_amenity_50"},{label:"Building staff"},
            {label:"Fire extinguisher"},{label:"First aid kit"},{label:"Pocket wifi"},
            {label:"Lock on bedroom door"},{label:"Private living room"},
            {label:"Smoking allowed"},{label:"Smoke detector"},{label:"Iron"},
            {label:"Children's dinnerware"},{label:"Coffee maker" }]


const country_options = [{label:"Spain"},{label:"Canada"},{label:"China"},{label:"United States"},{label:"Hong Kong"},{label:"Brazil"},
    {label:"Turkey"},{label:"Portugal"},{label:"Australia"}]


const fields = {"name":"string_sug","description":"string_sug","neighborhood_overview":"string_sug","transit":"string_sug","property_type":"dist",
                "room_type":"dist","bed_type":"dist","minimum_nights":"dist","maximum_nights":"dist","cancelation_policy":"dist","accommodates":"dist",
               "bedrooms":"dist","beds":"dist","bathrooms":"dist","amenities":"dist","price":"dist","weekly_price":"dist","monthly_price":"dist",
               "cleaning_fee":"dist","extra_people":"dist","guests_included":"dist","country":"dist","government_area":"string_sug","street":"string_sug"}

  const options = {
    categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  };
  const series =
    [{
      name:"recommeded words",
      data: [30, 40, 25, 50, 49, 21, 70, 51]
    }];



export default function Listings(){
    const [inputs, setInputs] = useState({})
    const [focused, setFocused] = useState({})
    const [dist, setDist] = useState({})
    const [series, setSeries] = useState({})

    useEffect(() => {
      getSuggestion();
      console.log(inputs)
    },[inputs]);

    useEffect(() => {
      getSuggestion();
      console.log(inputs)
    },[]);

    const handleFieldFocus= (event)=>{
      const name = event.name;
      const focus = event.focus;
      setFocused(values=>({...values, [name]:focus}))
    }

    const handleInputChange= (event)=> {
      const name = event.target.name;
      const value = event.target.value;

      setInputs(values=>({...values, [name]:value}))
      console.log(name);
      console.log(inputs)
    }

    // const chart_options= {}

    const handleSubmit= (event)=>{
      event.preventDefault();
      console.log(inputs)
    }

    function getSuggestion(){
      axios
        .post("api/airbnb/listings",inputs,{})
        .then((response) => {
          console.log(response);
          var data = response.data;
          for(var i in data){
            const field_name=Object.keys(data[i])[0]
              if(fields[field_name]==="string_sug"){
                var tmp = (data[i][field_name]).map((x)=>{return{"x":x[0],"y":x[1]}});
                console.log(tmp)
                setDist(values=>({...values, [field_name]:tmp}));
              }else if(fields[field_name]==="dist"){
                console.log(data[i][field_name])
                var tmp = Object.entries(data[i][field_name]).map(
                  ([k, v]) => {return {"x":k,"y":v}});
                  console.log(tmp)
                setDist(values=>({...values, [field_name]:tmp}));
              }

              // (response.data[i]).forEach((value,key) =>
              // {chart_options[key]={"options":{"xaxis":value.map((x)=>x[0])},"series":{"data":value.map((x)=>x[1])}};
            //});

          }
        })
        .catch((error) => {
          alert("there was an error getting recommendations");
          console.log(error);
        })
    }

    return (
        <form onSubmit={handleSubmit} onChange={getSuggestion}>
            <label htmlFor="name">
              Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"name","focus":false})}}
                onFocus={()=>handleFieldFocus({"name":"name","focus":true})}
            />
          {focused["name"]&&<Chart
           options={{}} name="suggested words" series={[{"data":dist["name"]?dist["name"]:null}]} type="area" />}
          <br />
          <label htmlFor="description">
            Description:</label>
          <input
              type="text"
              id="description"
              name="description"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"description","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"description","focus":true})}
              />
          {focused["description"]&&<Chart
                    options={{}} name="suggested words" series={[{"data":dist["description"]?dist["description"]:null}]} type="area" />}
          <br />
          <label htmlFor="neighborhood_overview">
            Neighborhood Overview:</label>
          <input
              type="text"
              id="neighborhood_overview"
              name="neighborhood_overview"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"neighborhood_overview","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"neighborhood_overview","focus":true})}
              />
          {focused["neighborhood_overview"]&&<Chart
                    options={{}} name="suggested words" series={[{"data":dist["neighborhood_overview"]?dist["neighborhood_overview"]:null}]} type="area" />}
          <br />
          <label htmlFor="transit">
            Transit:</label>
          <input
              type="text"
              id="transit"
              name="transit"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"transit","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"transit","focus":true})}
              />
          {focused["transit"]&&<Chart
           options={{}} name="suggested words" series={[{"data":dist["transit"]?dist["transit"]:null}]} type="area" />}
          <br />
          <label htmlFor="property_type">
            Property Type:</label>
          <Select
            options={property_options}
            id="property_type"
            onChange={(option)=>handleInputChange({"target":{"name":"property_type","value":option.label}})}
            onBlur={()=>{handleFieldFocus({"name":"property_type","focus":false})}}
            onFocus={()=>handleFieldFocus({"name":"property_type","focus":true})}
          />
          {focused["property_type"]&&<Chart
           options={{}} name="suggested words" series={[{"data":dist["property_type"]?dist["property_type"]:null}]} type="area" />}
          <br />
          <label htmlFor="room_type">
            Room Type:</label>
          <Select
          id="room_type"
          options={room_options}
          onChange={(option)=>handleInputChange({"target":{"name":"room_type","value":option.label}})}
          onBlur={()=>{handleFieldFocus({"name":"room_type","focus":false})}}
          onFocus={()=>handleFieldFocus({"name":"room_type","focus":true})}
          />
          {focused["room_type"]&&<Chart
           options={{}} name="suggested words" series={[{"data":dist["room_type"]?dist["room_type"]:null}]} type="area" />}
          <br />
          <label htmlFor="bed_type">
            Bed Type:</label>
            <Select
            options={bed_options}
            id="bed_type"
            onChange={(option)=>handleInputChange({"target":{"name":"bed_type","value":option.label}})}
          />
          <br />
          <label htmlFor="minimum_nights">
            Minimum nights:</label>
          <input
              type= "number"
              id="minimum_nights"
              name="minimum_nights"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"minimum_nights","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"minimum_nights","focus":true})}
              />
              {focused["minimum_nights"]&&<Chart
           options={{}} name="suggestion" series={[{"data":dist["minimum_nights"]?dist["minimum_nights"]:null}]} type="area" />}
          <br />
          <label htmlFor="maximum_nights">
            Maximum nights:</label>
          <input
              type= "number"
              id="maximum_nights"
              name="maximum_nights"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"maximum_nights","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"maximum_nights","focus":true})}
              />
              {focused["maximum_nights"]&&<Chart
           options={{}} name="suggestion" series={[{"data":dist["maximum_nights"]?dist["maximum_nights"]:null}]} type="area" />}
          <br />
          <label htmlFor="cancellation_policy">
            Cancellation policy:</label>
          <Select
          options={cancelation_options}
            id="cancellation_policy"
            onChange={(option)=>handleInputChange({"target":{"name":"cancellation_type","value":option.label}})}
            onBlur={()=>{handleFieldFocus({"name":"cancellation_policy","focus":false})}}
            onFocus={()=>handleFieldFocus({"name":"cancellation_policy","focus":true})}
          />
          {focused["cancellation_policy"]&&<Chart
           options={{}} name="suggestion" series={[{"data":dist["cancellation_policy"]?dist["cancellation_policy"]:null}]} type="area" />}
          <br />
          <label htmlFor="accommodates">
           Accommodates:</label>
          <input
              type= "number"
              id="accommodates"
              name="accommodates"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"accommodates","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"accommodates","focus":true})}
              />
              {focused["accommodates"]&&<Chart
           options={{}} name="suggestion" series={[{"data":dist["accommodates"]?dist["accommodates"]:null}]} type="area" />}
          <br />
          <label htmlFor="bedrooms">
            Bedrooms:</label>
          <input
              type= "number"
              id="bedrooms"
              name="bedrooms"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"bedrooms","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"bedrooms","focus":true})}
              />
              {focused["bedrooms"]&&<Chart
           options={{}} name="suggestion" series={[{"data":dist["bedrooms"]?dist["bedrooms"]:null}]} type="area" />}
          <br />
          <label htmlFor="Beds">
            Beds:</label>
          <input
              type= "number"
              id="Beds"
              name="Beds"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"Beds","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"Beds","focus":true})}
              />
              {focused["Beds"]&&<Chart
           options={{}} name="Beds" series={[{"data":dist["Beds"]?dist["Beds"]:null}]} type="area" />}
          <br />
          <label htmlFor="bathrooms">
            Bathrooms:</label>
          <input
              type= "number"
              id="bathrooms"
              name="bathrooms"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"bathrooms","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"bathrooms","focus":true})}
              />
              {focused["bathrooms"]&&<Chart
           options={{}} name="bathrooms" series={[{"data":dist["bathrooms"]?dist["bathrooms"]:null}]} type="area" />}
          <br />
          <label htmlFor="amenities">
           Amenities:</label>
          <Select options={amenities_options}
            isMulti
            getOptionValue={(option)=>{return option.label}}
            id="amenities"
            isSearchable={true}
            onChange={(option)=>handleInputChange({"target":{"name":"amenities","value":option.map(x=>x.label)}})}
            onBlur={()=>{handleFieldFocus({"name":"amenities","focus":false})}}
            onFocus={()=>handleFieldFocus({"name":"amenities","focus":true})}
          />
          {focused["amenities"]&&<Chart
           options={{}} name="amenities" series={[{"data":dist["amenities"]?dist["amenities"]:null}]} type="bar" />}
          <br />
          <label htmlFor="price">
            Price:</label>
          <input
              type= "number"
              id="price"
              name="price"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"price","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"price","focus":true})}
              />
              {focused["price"]&&<Chart
           options={{}} name="price" series={[{"data":dist["price"]?dist["price"]:null}]} type="area" />}
          <br />
          <label htmlFor="weekly_price">
          Weekly price:</label>
          <input
              type= "number"
              id="weekly_price"
              name="weekly_price"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"weekly_price","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"weekly_price","focus":true})}
              />
              {focused["weekly_price"]&&<Chart
           options={{}} name="weekly_price" series={[{"data":dist["weekly_price"]?dist["weekly_price"]:null}]} type="area" />}
          <br />
          <label htmlFor="monthly_price">
           Monthly price:</label>
          <input
              type= "number"
              id="monthly_price"
              name="monthly_price"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"monthly_price","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"monthly_price","focus":true})}
              />
              {focused["monthly_price"]&&<Chart
           options={{}} name="monthly_price" series={[{"data":dist["monthly_price"]?dist["monthly_price"]:null}]} type="area" />}
          <br />
          <label htmlFor="cleaning_fee">
           Cleaning fee:</label>
          <input
              type= "number"
              id="cleaning_fee"
              name="cleaning_fee"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"cleaning_fee","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"cleaning_fee","focus":true})}
              />
              {focused["cleaning_fee"]&&<Chart
           options={{}} name="cleaning_fee" series={[{"data":dist["cleaning_fee"]?dist["cleaning_fee"]:null}]} type="area" />}
          <br />
          <label htmlFor="extra_people">
           Extra people:</label>
          <input
              type= "number"
              id="extra_people"
              name="extra_people"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"extra_people","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"extra_people","focus":true})}
              />
              {focused["extra_people"]&&<Chart
           options={{}} name="extra_people" series={[{"data":dist["extra_people"]?dist["extra_people"]:null}]} type="area" />}
          <br />
          <label htmlFor="guests_included">
           Guests included:</label>
          <input
              type= "number"
              id="guests_included"
              name="guests_included"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"guests_included","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"guests_included","focus":true})}
              />
              {focused["guests_included"]&&<Chart
           options={{}} name="guests_included" series={[{"data":dist["guests_included"]?dist["guests_included"]:null}]} type="area" />}
          <br />
          <label htmlFor="country">
           Country:</label>
          <Select
            options={country_options}
            id="country"
            onChange={(option)=>handleInputChange({"target":{"name":"country","value":option.label}})}
            onBlur={()=>{handleFieldFocus({"name":"country","focus":false})}}
            onFocus={()=>handleFieldFocus({"name":"country","focus":true})}
          />
          {focused["country"]&&<Chart
           options={{}} name="country" series={[{"data":dist["country"]?dist["country"]:null}]} type="area" />}
          <br />
          <label htmlFor="government_area">
            Goverment Area:</label>
          <input
              type="text"
              id="government_area"
              name="government_area"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"government_area","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"government_area","focus":true})}
              />
              {focused["government_area"]&&<Chart
           options={{}} name="government_area" series={[{"data":dist["government_area"]?dist["government_area"]:null}]} type="area" />}
          <br />
          <label htmlFor="street">
            Street:</label>
          <input
              type="text"
              id="street"
              name="street"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"street","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"street","focus":true})}
              />
              {focused["street"]&&<Chart
           options={{}} name="street" series={[{"data":dist["street"]?dist["street"]:null}]} type="area" />}
          <br />
          <input type="submit" />
        </form>
    );
}
