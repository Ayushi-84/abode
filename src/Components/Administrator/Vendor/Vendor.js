import React,{useState} from "react"
import { TextField,Grid,Button } from "@mui/material"
import {useStyles} from "./VendorCss"
import { postData } from "../../Api/ServerServices"
import Swal from "sweetalert2"
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function Vendor(props){
    const classes=useStyles()
    const[firstName,setFirstName]=useState('')
    const[lastName,setLastName]=useState('')
    const[emailId,setEmailId]=useState('')
    const[mobileNo,setMobileNo]=useState('')
    const[dob,setDob]=useState(new Date('01-01-2001'))
    

    const handleClear=()=>{
       setFirstName('')
       setLastName('')
       setEmailId('')
       setMobileNo('')
       setDob(new Date('01-01-2001'))
       }

     const handleClick=async()=>{
        var body={firstname:firstName,lastname:lastName,emailid:emailId,mobileno:mobileNo,dob:dob}
        var response=await postData('vendor/addnewvendor',body)
        if(response.status)
        {
 
            Swal.fire({
               
                icon: 'success',
                title: 'Vendor has been added',
                showConfirmButton: false,
                timer: 1500
              })
              handleClear()
        }
        else{
 
            Swal.fire({
               
                icon: 'error',
                title: 'Failed to save the Record',
                showConfirmButton: false,
                timer: 1500
              })
        }
     }

    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>

                  <Grid container spacing={2}>

                     <Grid item xs={12}>
                            <div className={classes.heading}>
                                Vendor Register
                            </div>
                     </Grid>
                   
                     <Grid item xs={6} className={classes.centerStyle}>
                     <TextField
        id="input-with-icon-textfield"
        label="First Name"
        fullWidth
        value={firstName}
        onChange={(event)=>setFirstName(event.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
                    </Grid>
                    <Grid item xs={6} className={classes.centerStyle}>
                    <TextField
        id="input-with-icon-textfield"
        label="Last Name"
        fullWidth
        value={lastName}
        onChange={(event)=>setLastName(event.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
                    </Grid>
                    <Grid item xs={6} className={classes.centerStyle}>
                    <TextField
        id="input-with-icon-textfield"
        label="Email Id"
        value={emailId}
        onChange={(event)=>setEmailId(event.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
                    </Grid>

                    <Grid item xs={6} className={classes.centerStyle}>
                    <TextField
        id="input-with-icon-textfield"
        label="Mobile Number"
        value={mobileNo}
        onChange={(event)=>setMobileNo(event.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CallIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
                    </Grid>
                    <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
          views={['day', 'month', 'year']}
          label="DOB"
          inputFormat="dd-MM-yyyy"
          value={dob}
          onChange={(newValue) => {
            setDob(newValue);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
            </LocalizationProvider>
                    </Grid>
                    

                     <Grid item xs={12}>
                        <Button onClick={()=>handleClick()} variant="contained" fullWidth >Add Vendor</Button>
                     </Grid>


                  </Grid>

            </div>
        </div>
    )
}