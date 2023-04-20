import React,{useState,useEffect} from "react";
import { getData } from "../../Api/ServerServices";
import MaterialTable from "@material-table/core";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStyles } from "./DisplayAllPropertySubtypeCss";
import MenuItem from '@mui/material/MenuItem';
import {Button,Grid,TextField} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { postData,serverURL } from "../../Api/ServerServices";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export default function DisplayAllPropertySubtype(props){

  const classes=useStyles()
  const[propertyId,setPropertyId]=useState('')
  const[subPropertyId,setSubPropertyId]=useState('')
  const[subPropertyName,setSubPropertyName]=useState('')
  const[description,setDescription]=useState('')
  const [propertyTypes,setPropertyTypes]=useState([])
  const[subProperty,setSubProperty]=useState([])
  const[open,setOpen]=useState(false)

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
        var body={subpropertyid:rowData.subpropertyid}
    var response=await postData('propertysubtype/deletepropertysubtype',body)
    if(response.status)
       { Swal.fire('City Deleted Successfully', '', 'success')
      fetchAllPropertySubtype()}
       else
       { Swal.fire('Server Error', '', 'error') }
      } else if (result.isDenied) {
        Swal.fire('Your Record is Safe', '', 'info')
      }
    })

 }

  const handleEditData=async()=>{
    var body={propertyid:propertyId,subpropertyid:subPropertyId,subpropertyname:subPropertyName,description:description}
    var response=await postData('propertysubtype/updatepropertysubtype',body)
    setOpen(false)
    if(response.status)
    {     

        Swal.fire({
           
            icon: 'success',
            title: 'Subproperty has been Edited',
            showConfirmButton: false,
            timer: 2000
          })

          fetchAllPropertySubtype()
    }
    else{

        Swal.fire({
           
            icon: 'error',
            title: 'Failed to edit the subproperty',
            showConfirmButton: false,
            timer: 2000
          })
    }
 }

 

  const handleClose=()=>{
     
    setOpen(false)
  }

  const handleOpenDialog=(rowData)=>{
    fetchAllPropertyTypes()
    setSubPropertyId(rowData.subpropertyid)
    setSubPropertyName(rowData.subpropertyname)
    setPropertyId(rowData.propertyid)
    setDescription(rowData.description)
    setOpen(true)
  }

  const editView=()=>{
    
    return(
        <div className={classes.editRoot}>
        <div className={classes.editSubdiv}>

              <Grid container spacing={2}>

                 <Grid item xs={12}>
                        <div className={classes.heading}>
                            Subtype Property Register
                        </div>
                 </Grid>

                    <Grid item xs={12}>
                    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Property</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={propertyId}
      label="Property"
      onChange={(event)=>handleStatesChange(event)}
    >
     {fillPropertyTypes()}
    </Select>
  </FormControl>
                    </Grid>

                 <Grid item xs={12}>
                    <TextField value={subPropertyName} onChange={(event)=>setSubPropertyName(event.target.value)} label="Subproperty Name" variant="outlined" fullWidth />
                 </Grid>

                 <Grid item xs={12}>
                    <TextField value={description} onChange={(event)=>setDescription(event.target.value)} label="Description" variant="outlined" fullWidth />
                 </Grid>

                 <Grid item xs={12}>
                    <Button onClick={()=>handleEditData()} variant="contained" fullWidth >Edit Subproperty</Button>
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
    title={"Subproperty List"}
      data={subProperty}
      columns={[  

          {
              title: "Property Id",
              field: "propertyid",
            },
            {
                title: "Property Icon",
                field: "propertyicon",
                render: (rowData) => {
                  return (
                    <img src={`${serverURL}/images/${rowData.propertyicon}`} style={{ width: 60, borderRadius: "20" }} alt="" />
                  );
                }
              },
        {
          title: "Property Type",
          field: "propertytype",
        },
        {
            title: "Subproperty Id",
            field: "subpropertyid",
          },
      {
        title: "Subproperty Name",
        field: "subpropertyname",
      },
      {
        title: "Description",
        field: "description",
      },
          

      ]}
      actions={[
        {
          icon: () => <EditIcon />,
          tooltip: "Edit Subproperty Type",
          onClick: (event, rowData) => {
           handleOpenDialog(rowData)
          },
        },
        {
          icon: () => <DeleteIcon />,
          tooltip: "Delete Subproperty Type",
          onClick: (event, rowData) => {
            handleDelete(rowData)
          },
        },
      ]}
    />
  );
}



  const fetchAllPropertySubtype=async()=>{
    const result=await getData('propertysubtype/displayallpropertysubtype')
    setSubProperty(result.data)
  }
  const fetchAllPropertyTypes=async()=>{
    const result=await getData('typesofproperties/displayallpropertytype')
    setPropertyTypes(result.data)
  }

  const fillPropertyTypes=()=>{
      
    return propertyTypes.map((item)=>{
        return(
            <MenuItem value={item.propertyid}>{item.propertytype}</MenuItem>
        )
    })

  }

  const handleStatesChange=(event)=>{
    setPropertyId(event.target.value)
}




useEffect(function(){
    fetchAllPropertyTypes()
    fetchAllPropertySubtype()
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