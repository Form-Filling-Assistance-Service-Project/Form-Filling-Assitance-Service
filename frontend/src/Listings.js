import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import axios from "axios";
import Chart from "react-apexcharts";
import "./Listings.css";

const property_options = [{label:"Apartment"},{label:"House"},{label:"Guest"}, {label:"suite"},{label:"Serviced"},
    {label:"Hotel"},{label:"Condominium"},{label:"Boutique hotel"},{label:"Aparthotel"},{label:"Loft"},
    {label:"Townhouse"},{label:"Bed and breakfast"},{label:"Villa"}];

const room_options = [{label:"Entire home/apt"},{label:"Private room"},{label:"Shared room"}];

const bed_options = [{label:"Real bed"},{label:"Couch"},{label:"Futon"},{label:"Airbed"},{label:"Pull-out Sofa"}];

const cancellation_options =[{label:"moderate"},{label:"flexible"},{label:"strict_14_with_grace_period"},{label:"super_strict_60"},{label:"super_strict_30"}];

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
                "room_type":"dist","bed_type":"dist","minimum_nights":"dist","maximum_nights":"dist","cancellation_policy":"dist","accommodates":"dist",
               "bedrooms":"dist","beds":"dist","bathrooms":"dist","amenities":"dist","price":"dist","weekly_price":"dist","monthly_price":"dist",
               "cleaning_fee":"dist","extra_people":"dist","guests_included":"dist","country":"dist","government_area":"string_sug","street":"string_sug"}




export default function Listings(){
    const [inputs, setInputs] = useState({})
    const [focused, setFocused] = useState({})
    const [dist, setDist] = useState({})
    const prevInputs = useRef(inputs);

    useEffect(() => {
      if(JSON.stringify(inputs)!== JSON.stringify(prevInputs))
        getSuggestion();
    },[inputs]);

    useEffect(() => {
      getSuggestion();
    },[]);

    const handleFieldFocus= (event)=>{
      const name = event.name;
      if(dist[name] !== undefined){
      const focus = event.focus;
      setFocused(values=>({...values, [name]:focus}))}
    }

    const handleInputChange= (event)=> {
      const name = event.target.name;
      const value = event.target.value;

      setInputs(values=>({...values, [name]:value}))
    }

    const handleSubmit= (event)=>{
      event.preventDefault();
    }

    function getSuggestion(){
      axios
        .post("api/airbnb/listings",inputs,{})
        .then((response) => {
          console.log(response);
          var data = response.data;
          var tmp
          for(var i in data){
            const field_name=Object.keys(data[i])[0]
              if(fields[field_name]==="string_sug"){
                  tmp = (data[i][field_name]).map((x)=>{return{"x":x[0],"y":x[1]}});
                  setDist(values=>({...values, [field_name]:tmp}));
              }else if(fields[field_name]==="dist"){
                  tmp = Object.entries(data[i][field_name]).map(
                  ([k, v]) => {return {"x":k,"y":v}});
                  setDist(values=>({...values, [field_name]:tmp}));
              }
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }

    return (
      <div className="Listings-Form">
        <h1 align="center">AIRBNB Listings Registration Form</h1>
        <form  onSubmit={handleSubmit} onChange={getSuggestion}>
          <fieldset>
            <legend htmlFor="name">Airbnb Name:</legend>
            <input
                type="text"
                id="name"
                name="name"
                onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"name","focus":false})}}
                onFocus={()=>handleFieldFocus({"name":"name","focus":true})}
            />
          {focused["name"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
           options={{colors:['#546E7A', '#E91E63'],"dataLabels":{"enabled":false}}}   height={350} name="suggested words" series={[{"data":dist["name"]?dist["name"]:null}]} type="heatmap" /></div>}
           </fieldset>
          <br />
          <fieldset>
          <legend htmlFor="description">
            Description:</legend>
          <input
              type="text"
              id="description"
              name="description"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"description","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"description","focus":true})}
              />
          {focused["description"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
                    options={{"dataLabels":{"enabled":false}}} height={350} name="suggested words" series={[{"data":dist["description"]?dist["description"]:null}]} type="area" /></div>}
          </fieldset>
          <br />
          <fieldset>
          <legend htmlFor="neighborhood_overview">
            Neighborhood Overview:</legend>
          <input
              type="text"
              id="neighborhood_overview"
              name="neighborhood_overview"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"neighborhood_overview","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"neighborhood_overview","focus":true})}
              />
          {focused["neighborhood_overview"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
                    options={{"dataLabels":{"enabled":false}}}  height={350} name="suggested words" series={[{"data":dist["neighborhood_overview"]?dist["neighborhood_overview"]:null}]} type="area" /></div>}
          </fieldset>
          <br />
          <fieldset>
          <legend htmlFor="transit">
            Transit:</legend>
          <input
              type="text"
              id="transit"
              name="transit"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"transit","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"transit","focus":true})}
              />
          {focused["transit"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
           options={{"dataLabels":{"enabled":false}}}  height={350} name="suggested words" series={[{"data":dist["transit"]?dist["transit"]:null}]} type="bar" /></div>}
          </fieldset>
          <br />
          <fieldset>
          <legend htmlFor="property_type">
            Property Type:</legend>
            {focused["property_type"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
           options={{"dataLabels":{"enabled":false}}} name="suggested words" height={350} series={[{"data":dist["property_type"]?dist["property_type"]:null}]} type="bar" /></div>}
          <Select
            options={property_options}
            id="property_type"
            onChange={(option)=>handleInputChange({"target":{"name":"property_type","value":option.label}})}
            onBlur={()=>{handleFieldFocus({"name":"property_type","focus":false})}}
            onFocus={()=>handleFieldFocus({"name":"property_type","focus":true})}
          />
          </fieldset>
          <br />
          <fieldset>
          <legend htmlFor="room_type">
            Room Type:</legend>
            {focused["room_type"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
           options={{"dataLabels":{"enabled":false}}}  height={350} name="suggested words" series={[{"data":dist["room_type"]?dist["room_type"]:null}]} type="area" /></div>}
          <Select
          id="room_type"
          options={room_options}
          onChange={(option)=>handleInputChange({"target":{"name":"room_type","value":option.label}})}
          onBlur={()=>{handleFieldFocus({"name":"room_type","focus":false})}}
          onFocus={()=>handleFieldFocus({"name":"room_type","focus":true})}
          />
          </fieldset>
          <br />
          <fieldset>
            <legend htmlFor="bed_type">
            Bed Type:</legend>
          {focused["bed_type"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
           options={{"dataLabels":{"enabled":false}}}  height={350} name="suggested words" series={[{"data":dist["bed_type"]?dist["bed_type"]:null}]} type="area" /></div>}
            <Select
            options={bed_options}
            id="bed_type"
            onChange={(option)=>handleInputChange({"target":{"name":"bed_type","value":option.label}})}
            onBlur={()=>{handleFieldFocus({"name":"bed_type","focus":false})}}
            onFocus={()=>handleFieldFocus({"name":"bed_type","focus":true})}
          />
          </fieldset>
          <br />
          <fieldset>
          <legend htmlFor="minimum_nights">
            Minimum nights:</legend>
          <input
              type= "number"
              id="minimum_nights"
              name="minimum_nights"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"minimum_nights","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"minimum_nights","focus":true})}
              />
              {focused["minimum_nights"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
           options={{"dataLabels":{"enabled":false}}}  height={350} name="suggestion" series={[{"data":dist["minimum_nights"]?dist["minimum_nights"]:null}]} type="area" /></div>}
          </fieldset>
          <br />
          <fieldset>
          <legend htmlFor="maximum_nights">
            Maximum nights:</legend>
          <input
              type= "number"
              id="maximum_nights"
              name="maximum_nights"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"maximum_nights","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"maximum_nights","focus":true})}
              />
              {focused["maximum_nights"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
           options={{"dataLabels":{"enabled":false}}}  height={350} name="suggestion" series={[{"data":dist["maximum_nights"]?dist["maximum_nights"]:null}]} type="area" /></div>}
          </fieldset>
          <br />
          <fieldset>
          <legend htmlFor="cancellation_policy">
            Cancellation policy:</legend>
            {focused["cancellation_policy"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
           options={{"dataLabels":{"enabled":false}}}  height={350}  name="suggestion" series={[{"data":dist["cancellation_policy"]?dist["cancellation_policy"]:null}]} type="area" /></div>}
          <Select
            options={cancellation_options}
            id="cancellation_policy"
            onChange={(option)=>handleInputChange({"target":{"name":"cancellation_policy","value":option.label}})}
            onBlur={()=>{handleFieldFocus({"name":"cancellation_policy","focus":false})}}
            onFocus={()=>handleFieldFocus({"name":"cancellation_policy","focus":true})}
          />
          </fieldset>
          <br />
          <fieldset>
          <legend htmlFor="accommodates">
           Accommodates:</legend>
          <input
              type= "number"
              id="accommodates"
              name="accommodates"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"accommodates","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"accommodates","focus":true})}
              />
              {focused["accommodates"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
           options={{"dataLabels":{"enabled":false}}}  height={350} name="suggestion" series={[{"data":dist["accommodates"]?dist["accommodates"]:null}]} type="area" /></div>}
          </fieldset>
          <br />
          <fieldset>
          <legend htmlFor="bedrooms">
            Bedrooms:</legend>
          <input
              type= "number"
              id="bedrooms"
              name="bedrooms"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"bedrooms","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"bedrooms","focus":true})}
              />
              {focused["bedrooms"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
           options={{"dataLabels":{"enabled":false}}}  height={350} name="suggestion" series={[{"data":dist["bedrooms"]?dist["bedrooms"]:null}]} type="area" /></div>}
          </fieldset>
          <br />
          <fieldset>
          <legend htmlFor="Beds">
            Beds:</legend>
          <input
              type= "number"
              id="beds"
              name="beds"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"beds","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"beds","focus":true})}
              />
              {focused["beds"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
           options={{"dataLabels":{"enabled":false}}}  height={350} name="beds" series={[{"data":dist["beds"]?dist["beds"]:null}]} type="area" /></div>}
          </fieldset>
          <br />
          <fieldset>
          <legend htmlFor="bathrooms">
            Bathrooms:</legend>
          <input
              type= "number"
              id="bathrooms"
              name="bathrooms"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"bathrooms","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"bathrooms","focus":true})}
              />
              {focused["bathrooms"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
           options={{"dataLabels":{"enabled":false}}}  height={350} name="bathrooms" series={[{"data":dist["bathrooms"]?dist["bathrooms"]:null}]} type="area" /></div>}
          </fieldset>
          <br />
          <fieldset>
          <legend htmlFor="amenities">
           Amenities:</legend>
           {focused["amenities"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
           options={{"dataLabels":{"enabled":false}}}  height={350} name="amenities" series={[{"data":dist["amenities"]?dist["amenities"]:null}]} type="bar" /></div>}
          <Select options={amenities_options}
            isMulti
            getOptionValue={(option)=>{return option.label}}
            id="amenities"
            isSearchable={true}
            onChange={(option)=>handleInputChange({"target":{"name":"amenities","value":option.map(x=>x.label)}})}
            onBlur={()=>{handleFieldFocus({"name":"amenities","focus":false})}}
            onFocus={()=>handleFieldFocus({"name":"amenities","focus":true})}
          />
          </fieldset>
          <br />
          <fieldset>
          <legend htmlFor="price">
            Price:</legend>
          <input
              type= "number"
              id="price"
              name="price"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"price","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"price","focus":true})}
              />
              {focused["price"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
           options={{"dataLabels":{"enabled":false}}}  height={350} name="price" series={[{"data":dist["price"]?dist["price"]:null}]} type="area" /></div>}
          </fieldset>
          <br />
          <fieldset>
          <legend htmlFor="weekly_price">
          Weekly price:</legend>
          <input
              type= "number"
              id="weekly_price"
              name="weekly_price"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"weekly_price","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"weekly_price","focus":true})}
              />
              {focused["weekly_price"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
           options={{"dataLabels":{"enabled":false}}}  height={350} name="weekly_price" series={[{"data":dist["weekly_price"]?dist["weekly_price"]:null}]} type="area" /></div>}
          </fieldset>
          <br />
          <fieldset>
          <legend htmlFor="monthly_price">
           Monthly price:</legend>
          <input
              type= "number"
              id="monthly_price"
              name="monthly_price"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"monthly_price","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"monthly_price","focus":true})}
              />
              {focused["monthly_price"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
           options={{"dataLabels":{"enabled":false}}}  height={350} name="monthly_price" series={[{"data":dist["monthly_price"]?dist["monthly_price"]:null}]} type="area" /></div>}
          </fieldset>
          <br />
          <fieldset>
          <legend htmlFor="cleaning_fee">
           Cleaning fee:</legend>
          <input
              type= "number"
              id="cleaning_fee"
              name="cleaning_fee"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"cleaning_fee","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"cleaning_fee","focus":true})}
              />
              {focused["cleaning_fee"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
           options={{"dataLabels":{"enabled":false}}}  height={350} name="cleaning_fee" series={[{"data":dist["cleaning_fee"]?dist["cleaning_fee"]:null}]} type="area" /></div>}
          </fieldset>
          <br />
          <fieldset>
          <legend htmlFor="extra_people">
           Extra people:</legend>
          <input
              type= "number"
              id="extra_people"
              name="extra_people"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"extra_people","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"extra_people","focus":true})}
              />
              {focused["extra_people"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
           options={{"dataLabels":{"enabled":false}}}  height={350} name="extra_people" series={[{"data":dist["extra_people"]?dist["extra_people"]:null}]} type="area" /></div>}
          </fieldset>
          <br />
          <fieldset>
          <legend htmlFor="guests_included">
           Guests included:</legend>
          <input
              type= "number"
              id="guests_included"
              name="guests_included"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"guests_included","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"guests_included","focus":true})}
              />
              {focused["guests_included"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
           options={{"dataLabels":{"enabled":false}}} height={350} name="guests_included" series={[{"data":dist["guests_included"]?dist["guests_included"]:null}]} type="area" /></div>}
          </fieldset>
          <br />
          <fieldset>
          <legend htmlFor="country">
           Country:</legend>
           {focused["country"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
           options={{"dataLabels":{"enabled":false}}}  height={350} name="country" series={[{"data":dist["country"]?dist["country"]:null}]} type="area" /></div>}
          <Select
            options={country_options}
            id="country"
            onChange={(option)=>handleInputChange({"target":{"name":"country","value":option.label}})}
            onBlur={()=>{handleFieldFocus({"name":"country","focus":false})}}
            onFocus={()=>handleFieldFocus({"name":"country","focus":true})}
          />
          </fieldset>
          <br />
          <fieldset>
          <legend htmlFor="government_area">
            Goverment Area:</legend>
          <input
              type="text"
              id="government_area"
              name="government_area"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"government_area","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"government_area","focus":true})}
              />
              {focused["government_area"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
           options={{"dataLabels":{"enabled":false}}} height={350} name="government_area" series={[{"data":dist["government_area"]?dist["government_area"]:null}]} type="area" /></div>}
          </fieldset>
          <br />
          <fieldset>
          <legend htmlFor="street">
            Street:</legend>
          <input
              type="text"
              id="street"
              name="street"
              onBlur={(e)=>{handleInputChange(e);handleFieldFocus({"name":"street","focus":false})}}
              onFocus={()=>handleFieldFocus({"name":"street","focus":true})}
              />
              {focused["street"]&&<div style={{height:350,overflow:"scroll",margin:"auto"}}><Chart
           options={{"dataLabels":{"enabled":false}}}  height={350} name="street" series={[{"data":dist["street"]?dist["street"]:null}]} type="area" /></div>}
          </fieldset>
          <br />
          <input type="submit" />
        </form></div>
    );
}
