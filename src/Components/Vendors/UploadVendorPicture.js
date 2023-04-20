import React, { useEffect, useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { useStyles } from "./UploadVendorPictureCss";
import { Button, stepButtonClasses } from "@mui/material";
import { Delete } from "@mui/icons-material";
import PrevNext from "../MyComponents/PrevNext";
import { useSelector, useDispatch } from "react-redux";
import { postData, serverURL } from "../Api/ServerServices";
import VendorNavigation from "../MyComponents/VendorNavigation";
export default function UploadVendorPicture(props) {
  const [tempPicture, setTempPicture] = useState({});
  const [count, setCount] = useState(0);

  const classes = useStyles();

  var vendorDBData = useSelector((state) => state.vendorDBData);
  var vendorDB = Object.values(vendorDBData)[0];
  var pictures = {};
  const setPictures = () => {
    if (vendorDB.pictures != null) {
      pictures = JSON.parse(vendorDB.pictures);
      setCount(Object.keys(pictures).length);
      setTempPicture({ ...pictures });
    }
  };
  useEffect(function () {
    setPictures();
  }, []);
  var vendorData = useSelector((state) => state.vendor);
  var vendor = Object.values(vendorData)[0];
  const handleDelete = (index) => {
    var P = tempPicture;
    delete P[index];
    setCount(Object.keys(P).length);
    setTempPicture({ ...P });
  };

  const showPictures = () => {
    return Object.values(tempPicture).map((item, index) => {
      return (
        <>
          <div
            style={{
              position: "relative",
              display: "flex",
              padding: 5,
              justifyContent: "center",
              border: "1px solid #000",
              borderRadius: 10,
              margin: 5,
              width: 110,
            }}
          >
            <Delete
              onClick={() => handleDelete(index)}
              style={{ position: "absolute", zIndex: 2, top: 0, left: 10 }}
            />
            <img
              style={{ borderRadius: 15 }}
              src={`${serverURL}/images/${item}`}
              width="100"
            />
          </div>
        </>
      );
    });
  };
  var dispatch = useDispatch();
  const [getFiles, setFiles] = useState([]);
  const handleSaveFiles = async () => {
    var formData = new FormData();
    formData.append("mobileno", vendor.mobileno);
    formData.append("oldpicture", JSON.stringify(tempPicture));
    getFiles.map((item, index) => {
      formData.append("picture" + index, item);
    });
    var result = await postData(
      "vendor/update_vendor_properties_picture",
      formData,
      true
    );
    alert(result.status);
  };

  const handleFiles = (files) => {
    console.log("FILES:", files);
    
    setFiles(files);
  };

  return (
    <div className={classes.container}>
      <div className={classes.gradient}>
        <p>
          Next,Lets add some photos
          <br />
          of your place
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: 10,
          width: "48vw",
        }}
      >
        <VendorNavigation
          vendorName={vendor.firstname + " " + vendor.lastname}
          myurl="/addproperties"
        />
        <div className={classes.content}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {showPictures()}
          </div>

          <DropzoneArea
            onChange={handleFiles}
            acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
            showPreviews={false}
            maxFileSize={5000000}
            filesLimit={5 - count}
            showFileNames={true}
          />
        </div>

        <input
          type="button"
          value="Click Here"
          onClick={() => handleSaveFiles()}
        />
        <PrevNext
          data={{
            pictures: {
              oldpicture: JSON.stringify(tempPicture),
              files:getFiles,
            },
            mobileno: vendor.mobileno,
            opr: "ADD_VENDOR_PICTURES",
          }}
          nextUrl="/vendorextradetails"
          backUrl="/vendoramenities"
        />
      </div>
    </div>
  );
}
