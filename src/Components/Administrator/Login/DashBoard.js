import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import States from "../StateCity/States";
import DisplayAllStates from "../StateCity/DisplayAllStates";
import DisplayAllCities from "../StateCity/DisplayAllCities";
import City from "../StateCity/City";
import TypesOfProperties from "../TypesOfProperties/TypesOfProperties";
import PropertySubtype from "../TypesOfProperties/PropertySubtype";
import DisplayAllTypesOfProperties from "../TypesOfProperties/DisplayAllTypesOfProperties";
import DisplayAllPropertySubtype from "../TypesOfProperties/DisplayAllPropertySubtype";
 
import DisplayAllVendors from "../Vendor/DisplayAllVendors";
import Amenities from "../Amenities/Amenities"
import DisplayAmenities from "../Amenities/DisplayAmenities"
import AmenitiesOptions from "../Amenities/AmenitiesOptions"
import DisplayAllAmenitiesOptions from "../Amenities/DisplayAllAmenitiesOptions"

import AdminLogin from "../Login/AdminLogin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function DashBoard(props) {
  return (
    <div>
      <TopBar />
      
        <div style={{ display: "flex", flexDirection: "row" }}>
          <SideBar />
          <Routes>
            <Route element={<States />} path="/states" />
            <Route element={<DisplayAllStates />} path="/displayallstates" />
            <Route element={<City />} path="/city" />
            <Route element={<DisplayAllCities />} path="/displayallcities" />
            <Route element={<TypesOfProperties />} path="/typesofproperties" />
            <Route element={<PropertySubtype />} path="/PropertySubtype" />
            <Route 
              element={<DisplayAllPropertySubtype />}
              path="/DisplayAllPropertySubtype"
            />
            <Route
              element={<DisplayAllTypesOfProperties />}
              path="/DisplayAllTypesOfProperties"
            />
            <Route element={<DisplayAllVendors />} path="/DisplayAllVendors" />
           
            <Route element={<Amenities />} path="/Amenities" />
            <Route element={<DisplayAmenities />} path="/DisplayAmenities" />
            <Route element={<AmenitiesOptions />} path="/AmenitiesOptions" />
            <Route element={<DisplayAllAmenitiesOptions />} path="/DisplayAllAmenitiesOptions" />

          
          </Routes>
        </div>

    </div>
  );
}
