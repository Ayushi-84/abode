import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Button, Divider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import useStyles from "./VendorSplashscreenCss";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

import FormControl from "@mui/material/FormControl";
import OtpComponent from "../MyComponents/OtpComponent";
import OtpGenerator from "../MyComponents/OtpGenerator";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import { postData } from "../Api/ServerServices";
import Swal from "sweetalert2";
import PhoneIcon from "@mui/icons-material/Phone";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function VendorSplashScreen(props) {
  var classes = useStyles();
  var navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const [openVendor, setOpenVendor] = useState(false);
  const [otp, setOtp] = useState();
  const [userotp, setUserOtp] = useState();
  const [mobileno, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");
  const [messageVendor, setVendorMessage] = useState("");
  const [emailId, setEmailId] = useState("");
  const [dob, setDob] = useState("");

  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  var dispatch = useDispatch();

  const handleSubmit = async () => {
    var body = {
      emailid: emailId,
      mobileno: mobileno,
      firstname: firstName,
      lastname: LastName,
      dob: dob,
    };
    var response = await postData("vendor/addvendors", body);
    // alert(body)
    if (response.status) {
      setOpenVendor(false);
      dispatch({ type: "ADD_VENDOR", payload: [mobileno, body] });
      var vp = await postData("vendor/search_vendor_property", {
        mobileno: mobileno,
      });
      if (vp.status) {
       // alert("SPLASH" + JSON.stringify(vp.data));
        dispatch({ type: "ADD_DB_VENDORPROP", payload: [mobileno, vp.data] });
        navigate("/vendorproperties");
      }
    } else {
      setVendorMessage("Pls fill the correct values");
    }
  };

  const handleClickContinue = () => {
    setOpen(false);
    setOpenOtp(true);
    var otpval = OtpGenerator();
    alert(otpval);
    setOtp(otpval);
  };
  const chkOtp = async (value) => {
    if (otp == value) {
      setOpenOtp(false);
      var result = await postData("vendor/search_vendor_mobileno", {
        mobileno: mobileno,
      });
      if (result.status) {
        //navigate('/vendorproperties',{state:{vendor:result.data}})

        dispatch({ type: "ADD_VENDOR", payload: [mobileno, result.data] });

      
       
        var vp = await postData("vendor/search_vendor_property", {
          mobileno: mobileno,
        });

        console.log(vp)
        
        if (vp.status) {
         // alert("SPLASH" + JSON.stringify(vp.data));
          dispatch({ type: "ADD_DB_VENDORPROP", payload: [mobileno, vp.data] });
          navigate("/vendorproperties");
        }
       else
       {
        alert("Fail to search vendor properties")
       }  



       
      } else {
        setOpenVendor(true);
      }
    } else {
      setMessage("Invalid Otp");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleVendorOpen = () => {
    setOpenVendor(true);
  };

  const handleVendorClose = () => {
    setOpenVendor(false);
  };

  const handleOpenOtp = () => {
    setOpenOtp(true);
  };

  const handleCloseOtp = () => {
    setOpenOtp(false);
  };

  const dialogMobile = () => {
    return (
      <div>
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            <div className={classes.dialogTitle}>Login or sign up</div>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <div className={classes.dialogWelcomeTitle}>Welcome to Abode</div>
            </DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Mobile Number
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    onChange={(event) => setMobileNumber(event.target.value)}
                    startAdornment={
                      <InputAdornment position="start">+91</InputAdornment>
                    }
                    label="Mobile Number"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.dialogText}>
                  We'll call or text you to confirm your number. Standard
                  message and data rates apply.
                </div>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  style={{
                    fontWeight: 700,
                    textTransform: "capitalize",
                    backgroundColor: "#E31C5F",
                    color: "#fff",
                    padding: 10,
                    borderRadius: 8,
                  }}
                  onClick={handleClickContinue}
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const dialogOtp = () => {
    return (
      <div>
        <Dialog
          open={openOtp}
          keepMounted
          onClose={handleCloseOtp}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            <div className={classes.dialogTitle}>Confirm your number</div>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <div>Enter the code we have sent via SMS to +91{mobileno}</div>
            </DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <OtpComponent value="" onChange={(value) => chkOtp(value)} />
              </Grid>
              <Grid item xs={12}>
                <div className={classes.dialogText}>
                  Haven't recieved a code?More Options
                </div>
              </Grid>

              <Grid item xs={12}>
                <div className={classes.otpErrorMessage}>{message}</div>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const dialogVendor = () => {
    return (
      <div>
        <Dialog
          open={openVendor}
          keepMounted
          onClose={handleVendorClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            <div className={classes.dialogTitle}>Finish signing up</div>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="input-with-icon-textfield"
                  label="First Name"
                  fullWidth
                  onChange={(event) => setFirstName(event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="input-with-icon-textfield"
                  label="Last Name"
                  fullWidth
                  onChange={(event) => setLastName(event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
                <div className={classes.vendorText}>
                  Make sure it matches the name on your government ID.
                </div>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="input-with-icon-textfield"
                  label="Email ID"
                  fullWidth
                  onChange={(event) => setEmailId(event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />

                <div className={classes.vendorText}>
                  We'll email you trip confirmations and receipts.
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="input-with-icon-textfield"
                  label="Mobile No"
                  fullWidth
                  value={"+91" + mobileno}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="date"
                  label="D.O.B"
                  onChange={(event) => setDob(event.target.value)}
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <div className={classes.vendorText}>
                  To sign up, you need to be at least 18. Your birthday won’t be
                  shared with other people who use Abode.
                </div>
                <div className={classes.vendorText}>
                  By selecting <b>Agree and continue</b>, I agree to Airbnb’s{" "}
                  <span className={classes.vendorTextColor}>
                    Terms of Service
                  </span>
                  ,{" "}
                  <span className={classes.vendorTextColor}>
                    Payments Terms of Service
                  </span>
                  , and{" "}
                  <span className={classes.vendorTextColor}>
                    Nondiscrimination Policy
                  </span>{" "}
                  and acknowledge the{" "}
                  <span className={classes.vendorTextColor}>
                    Privacy Policy
                  </span>
                  .
                </div>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  style={{
                    fontWeight: 700,
                    textTransform: "capitalize",
                    backgroundColor: "#E31C5F",
                    color: "#fff",
                    padding: 10,
                    borderRadius: 8,
                  }}
                  onClick={handleSubmit}
                >
                  Agree and continue
                </Button>
              </Grid>

              <Grid item xs={12}>
                <div className={classes.otpErrorMessage}>{messageVendor}</div>
                <div className={classes.vendorText}>
                  Abode will send you members-only deals, inspiration, marketing
                  emails, and push notifications. You can opt out of receiving
                  these at any time in your account settings or directly from
                  the marketing notification.
                </div>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <div className={classes.sideDiv}>
            <div className={classes.textHeadStyle}>Try hosting on Abode</div>

            <div className={classes.textSubStyle}>
              Join us. We’ll help you every step of the way.
            </div>
            <div>
              <Button
                variant="contained"
                style={{
                  fontWeight: 700,
                  textTransform: "capitalize",
                  backgroundColor: "#E31C5F",
                  color: "#fff",
                  padding: 10,
                  width: 110,
                  borderRadius: 8,
                }}
                onClick={handleClickOpen}
              >
                Let's go!
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      {dialogMobile()}
      {dialogOtp()}
      {dialogVendor()}
    </ThemeProvider>
  );
}
