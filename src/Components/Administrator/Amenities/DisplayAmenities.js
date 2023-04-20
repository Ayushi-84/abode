import { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { getData, postData } from "../../Api/ServerServices";
import useStyles from "./DisplayAmenitiesCss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Grid, TextField } from "@mui/material";
import Swal from "sweetalert2";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AddAction from "../../MyComponents/AddAction";

export default function DisplayAmenities() {
  const classes = useStyles();
  const [amenities, setAmenities] = useState([]);
  const [amenityName, setAmenityName] = useState("");
  const [amenityId, setAmenityId] = useState("");
  const [message, setMessage] = useState("");

  const [open, setOpen] = useState(false);

  const handleClickOpen = (rowData) => {
    setMessage("");
    setOpen(true);
    setAmenityName(rowData.amenities);
    setAmenityId(rowData.amenitiesid);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const fetchAmenities = async () => {
    var response = await getData("amenities/displayamenities");
    setAmenities(response.data);
  };
  const handleEdit = async () => {
    var body = { amenitiesid: amenityId, amenities: amenityName };
    var response = await postData("amenities/updateamenities", body);
    if (response.status == true) {
      setMessage("Amenities edited successfully");
      fetchAmenities();
    } else {
      setMessage("Server error");
    }
  };
  const handleDelete = (rowData) => {
    Swal.fire({
      title: "Do you want to Delete this record?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var body = { amenitiesid: rowData.amenitiesid };
        var response = await postData("amenities/deleteamenities", body);
        if (response.status == true) {
          Swal.fire("amenity has been deleted", "", "success");
          fetchAmenities();
        } else {
          Swal.fire("SErver error", "", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("Your record is safe", "", "info");
      }
    });
  };
  function openDialog() {
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
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  function editView() {
    return (
      <div className={classes.editroot}>
        <div className={classes.editsubdiv}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className={classes.heading}>Edit Amenities</div>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", alignItems: "flex-end" }}>
              <HomeWorkIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />

              <TextField
                value={amenityName}
                onChange={(event) => setAmenityName(event.target.value)}
                label="Enter Amenity Name"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleEdit} variant="contained" fullWidth>
                Edit Amenities
              </Button>
            </Grid>
          </Grid>
          <Grid className={classes.messageStyle}>{message}</Grid>

          {/* <p style={{fontWeight:"bold",color:"blue"}}>{message}</p> */}
        </div>
      </div>
    );
  }

  function DisplayTable() {
    return (
      <MaterialTable
        title={
          <AddAction
            title="Amenities List"
            url={"/amenities"}
            tooltip="Add Amenities"
          />
        }
        data={amenities}
        columns={[
          {
            title: "Amenity Id",
            field: "amenitiesid",
          },
          {
            title: "Amenity Name",
            field: "amenities",
          },
        ]}
        actions={[
          {
            icon: () => <EditIcon />,
            tooltip: "Edit Amenity",
            onClick: (event, rowData) => {
              handleClickOpen(rowData);
            },
          },
          {
            icon: () => <DeleteIcon />,
            tooltip: "Delete Amenity",
            onClick: (event, rowData) => {
              handleDelete(rowData);
            },
          },
        ]}
      />
    );
  }

  useEffect(function () {
    fetchAmenities();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <DisplayTable />
        {openDialog()}
      </div>
    </div>
  );
}
