import React, { useState, useEffect } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useStyles } from "./AmenitiesCss";
import { getData } from "../Api/ServerServices";
import { serverURL } from "../Api/ServerServices";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import VendorNavigation from "../MyComponents/VendorNavigation";
import PrevNext from "../MyComponents/PrevNext";

const theme = createTheme();

export default function VendorAmenities(props) {
  var location = useLocation();
  var dispatch = useDispatch();
  var navigate = useNavigate();
  var vendorData = useSelector((state) => state.vendor);
  var vendor = Object.values(vendorData)[0];

  var vendorDBData = useSelector((state) => state.vendorDBData);
  var vendorDB = Object.values(vendorDBData)[0];
  var amenitiesValues = {};
  if (vendorDB.amenities != null) {
    amenitiesValues = JSON.parse(vendorDB.amenities);
  }

  var amenitiesData = useSelector((state) => state.amenities);
  var amenitiesDatas = Object.values(amenitiesData)[0];
  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXX", amenitiesDatas);

  try {
    if(JSON.stringify(amenitiesData)!="{}"){
      amenitiesValues = amenitiesDatas;
    }
  } catch (e) {}

  const [selectedAmenities, setSelectedAmenities] = useState(amenitiesValues);
  const [amenitiesoptions, setAmenitiesoptions] = useState([]);

  const classes = useStyles();
  // alert(JSON.stringify(result.data))

  const fetchAllAmenitiesoptions = async () => {
    const result = await getData("amenities/displayallamenities_vendor");
    setAmenitiesoptions(result.data);
  };

  const displayVendorAmenitiesOptions = () =>
    amenitiesoptions.map((item) => {
      return (
        <div style={{ padding: 10 }}>
          <div style={{ fontSize: 18, fontWeight: 400, marginBottom: 10 }}>
            {item.an}
          </div>
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {displayOptions(JSON.parse("[" + item.optionlist + "]"))}
          </div>
        </div>
      );
    });

  const handleAmenitiesClick = (item) => {
    var options = selectedAmenities;

    if (options[item.optionid] == undefined) {
      options[item.optionid] = item;
      setSelectedAmenities({ ...options });
    } else {
      delete options[item.optionid];
      setSelectedAmenities({ ...options });
    }

    dispatch({ type: "ADD_AMENITIES", payload: [vendor.mobileno, options] });
  };

  const setClass = (item) => {
    try {
      var values = Object.values(selectedAmenities);

      if (values.length > 0) {
        var result = false;
        for (var i = 0; i < values.length; i++) {
          //alert(JSON.stringify(selectedAmenities[i])+","+JSON.stringify(item))

          if (values[i].optionid == item.optionid) {
            result = true;
            break;
          }
        }

        return result;
      } else {
        return false;
      }
    } catch (e) {
      alert("error");
      return false;
    }
  };

  const displayOptions = (list) => {
    return list.map((item) => {
      return (
        <div>
          <div
            className={
              setClass(item)
                ? classes.displaySelectedContent
                : classes.displayContent
            }
            onClick={() => handleAmenitiesClick(item)}
          >
            <span className={classes.spanStyle}>
              <img
                src={`${serverURL}/Images/${item.icon}`}
                style={{ width: 60, borderRadius: 5 }}
              />
            </span>
            <span className={classes.spanOne}>{item.optionname}</span>
          </div>
        </div>
      );
    });
  };

  useEffect(function () {
    fetchAllAmenitiesoptions();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.gradient}>
        <p>
          Let guest's know what <br />
          your place has to offer
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}>
        <VendorNavigation
          data={{
            amenities: JSON.stringify(amenitiesValues),
            mobileno: vendor.mobileno,
            opr: "ADD_VENDOR_AMENITIES",
          }}
          vendorName={vendor.firstname + " " + vendor.lastname}
          myurl="/addproperties"
        />
        <div className={classes.content}>{displayVendorAmenitiesOptions()}</div>
        <div style={{ margin: 10 }}>
          <PrevNext
            data={{
              amenities: JSON.stringify(amenitiesValues),
              mobileno: vendor.mobileno,
              opr: "ADD_VENDOR_AMENITIES",
            }}
            nextUrl="/uploadvendorpicture"
            backUrl="/guest"
          />
        </div>
      </div>
    </div>
  );
}
