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
            {options.map((option) => (
              <option name="property_type" value={option.label}>{option.label}</option>
            ))}
          </select>
          <br />
          <label>
            Number of guests:
            <input
              name="numberOfGuests"
              type="number"
              value={inputs.numberOfGuests || ""}
              onChange={handleInputChange} />
          </label>
          <br/>
          <input type="submit" />
        </form>
    );
}
