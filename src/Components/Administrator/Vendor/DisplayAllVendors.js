import React,{useState,useEffect} from "react";
import { getData } from "../../Api/ServerServices";
import MaterialTable from "@material-table/core";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStyles } from "./DisplayAllVendorsCss";
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {Button,Grid,TextField} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { postData } from "../../Api/ServerServices";

export default function DisplayAllVendors(props){

  const classes=useStyles()
  
  const [vendorData,setVendorData]=useState([])
  const [open,setOpen]=useState(false)
  const[firstName,setFirstName]=useState('')
    const[lastName,setLastName]=useState('')
    const[mobileNo,setMobileNo]=useState('')
    const[dob,setDob]=useState('')
    
    

  const handleDelete=async(rowData)=>{
    
    Swal.fire({
      title: 'Do you want to delete the selected record',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var body={mobileno:rowData.mobileno}
    var response=await postData('vendor/deletevendor',body)
    if(response.status)
       { Swal.fire('Vendor Deleted Successfully', '', 'success')
      fetchAllVendorData()}
       else
       { Swal.fire('Server Error', '', 'error') }
      } else if (result.isDenied) {
        Swal.fire('Your Record is Safe', '', 'info')
      }
    })
 }

  const handleEdit=async()=>{
    var body={firstname:firstName,lastname:lastName,dob:dob,mobileno:mobileNo}
    var response=await postData('vendor/updatevendor',body)
    setOpen(false)
    if(response.status)
    {     

        Swal.fire({
           
            icon: 'success',
            title: 'Vendor Data has been Edited',
            showConfirmButton: false,
            timer: 2000
          })

          fetchAllVendorData()
    }
    else{

        Swal.fire({
           
            icon: 'error',
            title: 'Failed to edit the vendor data',
            showConfirmButton: false,
            timer: 2000
          })
    }
 }

  const handleClose=()=>{
     
    setOpen(false)
  }

  const handleOpenDialog=(rowData)=>{
    setFirstName(rowData.firstname)
    setLastName(rowData.lastname)
    setDob(rowData.dob)
    setMobileNo(rowData.mobileno)
    setOpen(true)
  }

  const editView=()=>{
    
    return(
      <div className={classes.editRoot}>
          <div className={classes.editSubdiv}>

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
                  
                    <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
          views={['day','month','year']}
          label="DOB"
          inputFormat="dd-MM-yyyy"
          value={dob}
          onChange={(newValue) => {
          setDob(newValue)
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
            </LocalizationProvider>
                    </Grid>
                    

                     <Grid item xs={12}>
                        <Button onClick={()=>handleEdit()} variant="contained" fullWidth >Edit Vendor</Button>
                     </Grid>

                </Grid>

          </div>
      </div>
  )
  }

  const openDialog=()=>{
    return(
      <div>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {editView()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autofocus>Close</Button>
        </DialogActions>
      </Dialog>
      </div>
    )
  }

  function displayTable() {
    return (
      <MaterialTable
      title={"Vendor List"}
        data={vendorData}
        columns={[  
          {
            title: "First Name",
            field: "firstname",
          },
          {
            title: "Last Name",
            field: "lastname",
          },
          {
            title: "DOB",
            field: "dob",
          },
          {
            title: "Email Id",
            field: "emailid",
          },
          {
            title: "Mobile Number",
            field: "mobileno",
          },

        ]}
        actions={[
          {
            icon: () => <EditIcon />,
            tooltip: "Edit State",
            onClick: (event, rowData) => {
             handleOpenDialog(rowData)
            },
          },
          {
            icon: () => <DeleteIcon />,
            tooltip: "Delete State",
            onClick: (event, rowData) => {
              handleDelete(rowData)
            },
          },
        ]}
      />
    );
  }



  const fetchAllVendorData=async()=>{
    const result=await getData('vendor/displayallvendor')
    setVendorData(result.data)
  }


    useEffect(function(){
        fetchAllVendorData()
    },[])


    return(
        <div className={classes.root}>
          <div className={classes.subdiv}>
             {displayTable()}
        </div>
        {openDialog()}
        </div>
    )
}