import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useStyles } from "./ThirdPageCss";
import { Button } from "@mui/material";
import PrevNext from "../MyComponents/PrevNext";
import { useSelector, useDispatch } from "react-redux";
import VendorNavigation from "../MyComponents/VendorNavigation";
export default function ThirdPage() {
  const description = [
    { id: 1, description: "An entire place" },
    { id: 2, description: "A private room" },
    { id: 3, description: "A shared room" },
  ];

  const classes = useStyles();

  var vendorData = useSelector((state) => state.vendor);
  var vendor = Object.values(vendorData)[0];

  var descriptionData = useSelector((state) => state.description);
  var _description = Object.values(descriptionData)[0];

  var vendorDBData = useSelector((state) => state.vendorDBData);
  var vendorDB = Object.values(vendorDBData)[0];
  
  //alert("Properties:"+JSON.stringify(vendorDB))
  var id = "";
  if (vendorDB.propertystatus != null) {
    id = vendorDB.propertystatus;
  }
  try {
    id = _description.id;
  } catch (e) {}
  const [selectedDescriptionId, setSelectedDescriptionId] = useState(id);

  var dispatch = useDispatch();

  const handleShadow = (item) => {
    setSelectedDescriptionId(item.id);
    dispatch({
      type: "ADD_PROPERTY_DESCRIPTION",
      payload: [vendor.mobileno, item],
    });
  };
  const showDescription = () => {
    return description.map((item) => {
      return (
        <div
          variant="secondary"
          onClick={() => handleShadow(item)}
          className={
            item.id == selectedDescriptionId ? classes.boxShade : classes.box
          }
        >
          <div style={{ fontSize: "14px", fontWeight: "200" }}>
            {item.description}
          </div>
        </div>
      );
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.gradient}>
        <p>
          What kind of space will
          <br />
          guest have?
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}>
        <VendorNavigation
          data={{
            propertystatus: id,
            mobileno: vendor.mobileno,
            opr: "ADD_VENDOR_PROPERTY_STATUS",
          }}
          vendorName={vendor.firstname + " " + vendor.lastname}
          myurl="/addproperties"
        />
        <div className={classes.content}>{showDescription()}</div>

        <PrevNext
          data={{
            propertystatus: id,
            mobileno: vendor.mobileno,
            opr: "ADD_VENDOR_PROPERTY_STATUS",
          }}
          nextUrl="/vendoraddress"
          backUrl="/vendorsubproperties"
        />
      </div>
    </div>
  );
}
