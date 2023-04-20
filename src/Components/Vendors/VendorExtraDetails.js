import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import { Grid, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useStyles from "./VendorExtraDetailsCss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrevNext from "../MyComponents/PrevNext";
import VendorNavigation from "../MyComponents/VendorNavigation";
import { useSelector, useDispatch } from "react-redux";
import { TextField, InputAdornment } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const theme = createTheme();

export default function VendorExtraDetails() {
  var classes = useStyles();
  const [placeDescription, setPlaceDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  var navigate = useNavigate();
  var dispatch = useDispatch();
  var vendorDBData = useSelector((state) => state.vendorDBData);

  var vendorData = useSelector((state) => state.vendor);
  var vendor = Object.values(vendorData)[0];
  var vendorDetails = useSelector((state) => state.vendorExtraDetails);
  const showDetails = () => {
    if (JSON.stringify(vendorDetails) != "{}") {
      var vendorDetailsData = Object.values(vendorDetails)[0];
      setPlaceDescription(vendorDetailsData.placeDescription);
      setTitle(vendorDetailsData.title);
      setPrice(vendorDetailsData.price);
      setOfferPrice(vendorDetailsData.offerPrice);
    } else if (JSON.stringify(vendorDBData) != "{}") {
      var vendorDB = Object.values(vendorDBData)[0];
      if (vendorDB.placedescription != null) {
        setPlaceDescription(vendorDB.placedescription);
      }
      if (vendorDB.title != null) {
        setTitle(vendorDB.title);
      }
      if (vendorDB.price != null) {
        setPrice(vendorDB.price);
      }
      if (vendorDB.offerprice != null) {
        setOfferPrice(vendorDB.offerprice);
      }
    }
  };

  useEffect(function () {
    showDetails();
  }, []);

  const handleSubmit = () => {
    let body = {
      placeDescription: placeDescription,
      title: title,
      price: price,
      offerPrice: offerPrice,
    };
    dispatch({
      type: "ADD_VENDOR_EXTRA_DETAILS",
      payload: [vendor.mobileno, body],
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <div className={classes.sideDiv}>
            <div className={classes.textHeadStyle}>
              Add Place description,Title,Price and offerPrice
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <VendorNavigation
            data={{
              placedescription: placeDescription,
              title,
              price,
              offerprice: offerPrice,
              mobileno: vendor.mobileno,
              opr: "ADD_VENDOR_EXTRA_DETAILS",
            }}
            vendorName={vendor.firstname + " " + vendor.lastname}
            myurl="/vendorsplashscreen"
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              height: "80vh",
              margin: "20px",
            }}
          >
            <div style={{ width: "70%" }}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <TextField
                    onChange={(event) =>
                      setPlaceDescription(event.target.value)
                    }
                    id="outlined-multiline-static"
                    label="Place description"
                    multiline
                    fullWidth
                    rows={4}
                    value={placeDescription}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <TextField
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    label="Title"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <TextField
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    label="Price "
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <TextField
                    value={offerPrice}
                    onChange={(event) => setOfferPrice(event.target.value)}
                    label="Offer price "
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </div>
            <div
              onClick={handleSubmit}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                style={{
                  textTransform: "capitalize",
                  backgroundColor: "#E31C5F",
                  color: "#fff",
                  padding: 10,
                  width: 100,
                  marginTop: "15px",
                }}
              >
                Submit
              </Button>
            </div>
          </div>

          <PrevNext
            data={{
              placedescription: placeDescription,
              title,
              price,
              offerprice: offerPrice,
              mobileno: vendor.mobileno,
              opr: "ADD_VENDOR_EXTRA_DETAILS",
            }}
            backUrl={"/uploadvendorpicture"}
            nextUrl={"/vendorsplashscreen"}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
