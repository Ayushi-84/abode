import { Grid, TextField, Button } from "@mui/material";
import useStyles from "./AmenitiesCss";
import { useState } from "react";
import { postData } from "../../Api/ServerServices";
import Swal from "sweetalert2";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ChaletIcon from "@mui/icons-material/Chalet";

export default function Amenities() {
  const [amenityname, setAmenityName] = useState("");
  var classes = useStyles();
  const handleClick = async () => {
    var body = { amenities: amenityname };
    var response = await postData("amenities/addamenities", body);
    if (response.status == true) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Amenities has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Fail to Save The Record",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.heading}>Amenities Register</div>
          </Grid>

          <Grid item xs={12} sx={{ display: "flex", alignItems: "flex-end" }}>
            <ChaletIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              onChange={(event) => setAmenityName(event.target.value)}
              label="Enter Amenity Name"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleClick} variant="contained" fullWidth>
              Add New Amenities
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
