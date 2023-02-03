import React, { useState, useEffect } from "react";
import Select from 'react-select'
import axios from "axios";


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

export default function Listings(){
    const [inputs, setInputs] = useState({})

    const handleInputChange= (event)=> {
      const value = event.target.value;
      const name = event.target.name;
      console.log(name);

      setInputs(values=>({...values, [name]:value}))
    }

    const handleSubmit= (event)=>{
      event.preventDefault();
      console.log(inputs)
      alert(inputs)
    }

    return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Name:</label>
          <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}/>
          <br />
          <label htmlFor="description">
            Description:</label>
          <input
              type="text"
              id="description"
              name="description"
              onChange={handleInputChange}/>
          <br />
          <label htmlFor="neighborhood_overview">
            Neighborhood Overview:</label>
          <input
              type="text"
              id="neighborhood_overview"
              name="neighborhood_overview"
              onChange={handleInputChange}/>
          <br />
          <label htmlFor="transit">
            Transit:</label>
          <input
              type="text"
              id="transit"
              name="transit"
              onChange={handleInputChange}/>
          <br />
          <label htmlFor="property_type">
            Property Type:</label>
          <select id="property_type" name="property_type" onChange={handleInputChange}>
            {property_options.map((property_options) => (
              <option name="property_type" value={property_options.label}>{property_options.label}</option>
            ))}</select>
          <br />
          <label htmlFor="room_type">
            Room Type:</label>
          <select id="room_type" name="room_type" onChange={handleInputChange}>
            {room_options.map((room_options) => (
              <option name="room_type" value={room_options.label}>{room_options.label}</option>
            ))}</select>
          <br />
          <label htmlFor="bed_type">
            Bed Type:</label>
          <select id="bed_type" name="bed_type" onChange={handleInputChange}>
            {bed_options.map((bed_options) => (
              <option name="bed_type" value={bed_options.label}>{bed_options.label}</option>
            ))}</select>
          <br /> 
          <label htmlFor="minimum_nights">
            Minimum nights:</label>
          <input
              type= "int"
              id="minimum_nights"
              name="minimum_nights"
              onChange={handleInputChange}/>
          <br />
          <label htmlFor="maximum_nights">
            Maximum nights:</label>
          <input
              type= "int"
              id="maximum_nights"
              name="maximum_nights"
              onChange={handleInputChange}/>
          <br />
          <label htmlFor="cancellation_policy">
            Cancellation policy:</label>
          <select id="cancellation_policy" name="cancellation_policy" onChange={handleInputChange}>
            {cancelation_options.map((cancelation_options) => (
              <option name="cancellation_policy" value={cancelation_options.label}>{cancelation_options.label}</option>
            ))}</select>
          <br />
          <label htmlFor="accommodates">
           Accommodates:</label>
          <input
              type= "int"
              id="accommodates"
              name="accommodates"
              onChange={handleInputChange}/>
          <br />
          <label htmlFor="bedrooms">
            Bedrooms:</label>
          <input
              type= "int"
              id="bedrooms"
              name="bedrooms"
              onChange={handleInputChange}/>
          <br />
          <label htmlFor="Beds">
            Beds:</label>
          <input
              type= "int"
              id="Beds"
              name="Beds"
              onChange={handleInputChange}/>
          <br />
          <label htmlFor="bathrooms">
            Bathrooms:</label>
          <input
              type= "float"
              id="bathrooms"
              name="bathrooms"
              onChange={handleInputChange}/>
          <br />
          <label htmlFor="amenities">
           Amenities:</label>
          <select id="amenities" name="amenities" onChange={handleInputChange} multiple>
            {amenities_options.map((amenities_options) => (
              <option name="amenities" value={amenities_options.label}>{amenities_options.label}</option>
            ))}</select>
          <br />
          <label htmlFor="price">
            Price:</label>
          <input
              type= "float"
              id="price"
              name="price"
              onChange={handleInputChange}/>
          <br />
          <label htmlFor="weekly_price">
          Weekly price:</label>
          <input
              type= "float"
              id="weekly_price"
              name="weekly_price"
              onChange={handleInputChange}/>
          <br />
          <label htmlFor="monthly_price">
           Monthly price:</label>
          <input
              type= "float"
              id="monthly_price"
              name="monthly_price"
              onChange={handleInputChange}/>
          <br />
          <label htmlFor="cleaning_fee">
           Cleaning fee:</label>
          <input
              type= "float"
              id="cleaning_fee"
              name="cleaning_fee"
              onChange={handleInputChange}/>
          <br />
          <label htmlFor="extra_people">
           Extra people:</label>
          <input
              type= "float"
              id="extra_people"
              name="extra_people"
              onChange={handleInputChange}/>
          <br />
          <label htmlFor="guests_included">
           Guests included:</label>
          <input
              type= "float"
              id="guests_included"
              name="eguests_included"
              onChange={handleInputChange}/>
          <br />
          <label htmlFor="country">
           Country:</label>
          <select id="country" name="country" onChange={handleInputChange}>
            {country_options.map((country_options) => (
              <option name="country" value={country_options.label}>{country_options.label}</option>
            ))}</select>
          <br />
          <label htmlFor="goverment_area">
            Goverment Area:</label>
          <input
              type="text"
              id="goverment_area"
              name="goverment_area"
              onChange={handleInputChange}/>
          <br />
          <label htmlFor="street">
            Street:</label>
          <input
              type="text"
              id="street"
              name="street"
              onChange={handleInputChange}/>
          <br />
          <input type="submit" />
        </form>
    );
}
