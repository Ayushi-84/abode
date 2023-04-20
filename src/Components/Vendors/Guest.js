import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useStyles } from "./GuestCss";
import { Button } from "@mui/material";
import PrevNext from "../MyComponents/PrevNext";
import { useSelector, useDispatch } from "react-redux";
import VendorNavigation from "../MyComponents/VendorNavigation";
import PlusMinus from "../MyComponents/PlusMinus";
import { HandymanOutlined } from "@mui/icons-material";
export default function Guest() {
  const guestJson = [
    { id: 1, option: "Guests", value: 1 },
    { id: 2, option: "Beds", value: 1 },
    { id: 3, option: "Bedrooms", value: 1 },
    { id: 4, option: "Bathrooms", value: 1 },
  ];

  const classes = useStyles();
  const [refresh, setRefresh] = useState(false);

  var vendorData = useSelector((state) => state.vendor);
  var vendor = Object.values(vendorData)[0];

  var vendorDBData = useSelector((state) => state.vendorDBData);
  var vendorDB = Object.values(vendorDBData)[0];
  var guest = [];
  if (vendorDB.placeoffer != null) {
    guest = JSON.parse(vendorDB.placeoffer);
  }
  console.log(guest);

  var guestData = useSelector((state) => state.guest);
  console.log(guestData);
  if (JSON.stringify(guestData) != "{}") {
    guest = Object.values(guestData)[0];
  }

  useEffect(() => {
    if (guest.length == 0) {
      dispatch({ type: "ADD_GUEST", payload: [vendor.mobileno, guestJson] });
    } else {
      dispatch({ type: "ADD_GUEST", payload: [vendor.mobileno, guest] });
    }
    setRefresh(!refresh);
  }, []);

  console.log(guest);

  //alert("Properties:"+JSON.stringify(vendorDB))

  var dispatch = useDispatch();
  const handleGuest = (index, value) => {
    guest[index].value = value;
    dispatch({ type: "ADD_GUEST", payload: [vendor.mobileno, guest] });
    setRefresh(!refresh);
  };

  const showOptions = () => {
    return guestJson.map((item, index) => {
      return (
        <div variant="secondary" className={classes.box}>
          <div>{item.option}</div>
          <div>
            <PlusMinus
              value={guest[index]?.value}
              onChange={(value) => handleGuest(index, value)}
            />
          </div>
        </div>
      );
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.gradient}>
        <p>
          Let guests know what
          <br />
          your place has to offer
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}>
        <VendorNavigation
          data={{
            placeoffer: JSON.stringify(guest),
            mobileno: vendor.mobileno,
            opr: "ADD_VENDOR_PLACEOFFER",
          }}
          vendorName={vendor.firstname + " " + vendor.lastname}
          myurl="/addproperties"
        />
        <div className={classes.content}>{showOptions()}</div>

        <PrevNext
          data={{
            placeoffer: JSON.stringify(guest),
            mobileno: vendor.mobileno,
            opr: "ADD_VENDOR_PLACEOFFER",
          }}
          nextUrl="/vendoramenities"
          backUrl="/vendoraddress"
        />
      </div>
    </div>
  );
}
