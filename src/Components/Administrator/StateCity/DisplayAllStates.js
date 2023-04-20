import React,{useState,useEffect} from "react";
import { getData } from "../../Api/ServerServices";
import MaterialTable from "@material-table/core";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStyles } from "./DisplayAllStatesCss";

import {Button,Grid,TextField} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { postData } from "../../Api/ServerServices";

export default function DisplayAllStates(props){

  const classes=useStyles()
  
  const [states,setStates]=useState([])
  const [open,setOpen]=useState(false)
  const[stateName,setStateName]=useState('')
  const[stateId,setStateId]=useState('')

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
        var body={stateid:rowData.stateid}
    var response=await postData('states/deletestate',body)
    if(response.status)
       { Swal.fire('State Deleted Successfully', '', 'success')
      fetchAllStates()}
       else
       { Swal.fire('Server Error', '', 'error') }
      } else if (result.isDenied) {
        Swal.fire('Your Record is Safe', '', 'info')
      }
    })
 }

  const handleEdit=async()=>{
    var body={stateid:stateId,statename:stateName}
    var response=await postData('states/updatestate',body)
    setOpen(false)
    if(response.status)
    {     

        Swal.fire({
           
            icon: 'success',
            title: 'States has been Edited',
            showConfirmButton: false,
            timer: 2000
          })

          fetchAllStates()
    }
    else{

        Swal.fire({
           
            icon: 'error',
            title: 'Failed to edit the state',
            showConfirmButton: false,
            timer: 2000
          })
    }
 }

  const handleClose=()=>{
     
    setOpen(false)
  }

  const handleOpenDialog=(rowData)=>{
    setStateId(rowData.stateid)
    setStateName(rowData.statename)
    setOpen(true)
  }

  const editView=()=>{
    
    return(
      <div className={classes.editRoot}>
          <div className={classes.editSubdiv}>

                <Grid container spacing={2}>

                   <Grid item xs={12}>
                          <div className={classes.heading}>
                              States Register
                          </div>
                   </Grid>
                   <Grid item xs={12}>
                      <TextField value={stateName} onChange={(event)=>setStateName(event.target.value)} label="State Name" variant="outlined" fullWidth />
                   </Grid>

                   <Grid item xs={12}>
                      <Button onClick={()=>handleEdit()} variant="contained" fullWidth >Edit State</Button>
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
      title={"State List"}
        data={states}
        columns={[  
          {
            title: "State Id",
            field: "stateid",
          },
          {
            title: "State Name",
            field: "statename",
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



  const fetchAllStates=async()=>{
    const result=await getData('states/displayallstates')
    setStates(result.data)
  }


    useEffect(function(){
        fetchAllStates()
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