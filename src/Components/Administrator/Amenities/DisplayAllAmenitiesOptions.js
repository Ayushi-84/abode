import MaterialTable from "@material-table/core";
import useStyles from "./DisplayAllAmenitiesOptionsCss";
import { useState, useEffect } from "react";
import { getData } from "../../Api/ServerServices";
import { serverURL } from "../../Api/ServerServices";
import { Grid, Button, TextField } from "@mui/material";

import LocationCityIcon from "@mui/icons-material/LocationCity";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BusinessIcon from "@mui/icons-material/Business";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { postData } from "../../Api/ServerServices";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import ListIcon from "@mui/icons-material/List";

import Swal from "sweetalert2";
import AddAction from "../../MyComponents/AddAction";
const Input = styled("input")({
  display: "none",
});

export default function DisplayAllAmenitiesOptions() {
  const classes = useStyles();
  const [amentiesoptions, setAmenitiesOptions] = useState([]);
  const [optionName, setOptionName] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [amenitiesId, setAmenitiesId] = useState("");
  const [amenitiesOptionsPicture, setAmenitiesOptionsPicture] = useState({
    bytes: "",
    filename: "",
  });
  const [optionsId, setOptionsId] = useState("");
  const [message, setMessage] = useState("");
  const [showBtn, setShowBtn] = useState(false);
  const [oldPicture, setOldPicture] = useState({ bytes: "", filename: "" });

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = (rowData) => {
    fetchAmenities();
    setAmenitiesId(rowData.amenitiesid);
    setOptionName(rowData.optionname);
    setAmenitiesOptionsPicture({
      bytes: "",
      filename: `${serverURL}/images/${rowData.icon}`,
    });
    setOldPicture({
      bytes: "",
      filename: `${serverURL}/images/${rowData.icon}`,
    });
    setOptionsId(rowData.optionsid);
    setMessage("");
    setOpen(true);
  };
  const fetchAmenities = async () => {
    var response = await getData("amenities/displayamenities");
    setAmenities(response.data);
  };
  const fillAmenities = () => {
    return amenities.map((item) => {
      return <MenuItem value={item.amenitiesid}>{item.amenities}</MenuItem>;
    });
  };

  const fetchAllOptions = async () => {
    var response = await getData("amenities/displayallamenitiesoptions");
    if (response.status) {
      setAmenitiesOptions(response.data);
    }
  };
  useEffect(function () {
    fetchAllOptions();
  }, []);
  const handleDelete = (rowData) => {
    Swal.fire({
      title: "Do you want delete the record?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var body = { optionsid: rowData.optionsid, oldpicture: rowData.icon };
        var response = await postData("amenities/deleteamenitiesoptions", body);
        if (response.status) {
          Swal.fire("Amenities Options has been deleted!", "", "success");
          fetchAllOptions();
        } else Swal.fire("Your Record is safe", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const handleEditData = async () => {
    var body = {
      amenitiesid: amenitiesId,
      optionname: optionName,
      optionsid: optionsId,
    };
    var response = await postData("amenities/updateamenitiesoptionsdata", body);
    if (response.status == true) {
      setMessage("Amenities Options edited successfully");

      fetchAllOptions();
    }
  };
  const handleChangeImage = (event) => {
    setAmenitiesOptionsPicture({
      bytes: event.target.files[0],
      filename: URL.createObjectURL(event.target.files[0]),
    });
    setShowBtn(true);
  };
  const editAmenitiesOptionsPicture = async () => {
    var formData = new FormData();
    formData.append("optionsid", optionsId);
    formData.append("icon", amenitiesOptionsPicture.bytes);
    formData.append(
      "oldpicture",
      oldPicture.filename.substring(oldPicture.filename.lastIndexOf("/") + 1)
    );
    var response = await postData(
      "amenities/updateamenitiesoptionspicture",
      formData,
      true
    );
    if (response.status == true) {
      setMessage("Picture Updated SuccessFully");
      setShowBtn(false);
      fetchAllOptions();
    } else {
      setMessage("Server Error");
    }
  };
  const handleCancel = () => {
    setAmenitiesOptionsPicture({
      bytes: oldPicture.bytes,
      filename: oldPicture.filename,
    });
    setShowBtn(false);
  };

  const editView = () => {
    return (
      <div className={classes.editRoot}>
        <div className={classes.editSubdiv}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className={classes.heading}>Edit Amenitis Options</div>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", alignItems: "flex-end" }}>
              <LocationCityIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <FormControl fullWidth variant="standard">
                <InputLabel id="demo-simple-select-label">Amenities</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={amenitiesId}
                  label="Amenities"
                  onChange={(event) => setAmenitiesId(event.target.value)}
                >
                  {fillAmenities()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", alignItems: "flex-end" }}>
              <ListIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                value={optionName}
                onChange={(event) => setOptionName(event.target.value)}
                label="Enter Amenities Options"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleEditData} variant="contained" fullWidth>
                Edit Amenities Options
              </Button>
            </Grid>
            <Grid item xs={6} className={classes.ButtonStyle}>
              <label htmlFor="icon-button-file">
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={handleChangeImage}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.ButtonStyle}>
                <Avatar
                  alt="Remy Sharp"
                  src={amenitiesOptionsPicture.filename}
                  sx={{ width: 70, height: 70 }}
                />

                {showBtn ? (
                  <>
                    <Button onClick={editAmenitiesOptionsPicture}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </Grid>
          </Grid>
          <Grid className={classes.messageStyle}>{message}</Grid>
        </div>
      </div>
    );
  };

  const openDialog = () => {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>{editView()}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  function displayTable() {
    return (
      <MaterialTable
        title={
          <AddAction
            title="Amenities Options List"
            url={"/amenitiesoptions"}
            tooltip="Add Amenities Options"
          />
        }
        data={amentiesoptions}
        columns={[
          {
            title: "Amenities Id",
            field: "amenitiesid",
          },
          {
            title: "Amenities Name",
            field: "an",
          },
          {
            title: "Amenities Option Id",
            field: "optionsid",
          },

          {
            title: "Amenities Options Name",
            field: "optionname",
          },
          {
            title: "Name",
            field: "icon",
            render: (rowData) => {
              return (
                <img
                  src={`${serverURL}/images/${rowData.icon}`}
                  style={{ width: 50, borderRadius: "20%" }}
                />
              );
            },
          },
        ]}
        actions={[
          {
            icon: () => <EditIcon />,
            tooltip: "Save User",
            onClick: (event, rowData) => {
              handleClickOpen(rowData);
            },
          },
          {
            icon: () => <DeleteIcon />,
            tooltip: "Save User",
            onClick: (event, rowData) => {
              {
                handleDelete(rowData);
              }
            },
          },
        ]}
      />
    );
  }
  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>{displayTable()}</div>
      {openDialog()}
    </div>
  );
}
