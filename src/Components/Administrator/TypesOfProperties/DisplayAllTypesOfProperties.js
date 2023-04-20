import React,{useState,useEffect} from "react";
import { getData } from "../../Api/ServerServices";
import MaterialTable from "@material-table/core";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStyles } from "./DisplayAllTypesOfPropertiesCss";
import {Button,Grid,TextField} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { postData,serverURL } from "../../Api/ServerServices";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

export default function DisplayAllTypesOfProperties(props){

  const classes=useStyles()
  
  const[property,setProperty]=useState([])
  const[open,setOpen]=useState(false)
  const[propertyType,setPropertyType]=useState('')
  const[propertyId,setPropertyId]=useState('')
  const[propertyIcon,setPropertyIcon]=useState({bytes:'',filename:''})
  const[showBtn,setShowBtn]=useState(false)
  const[tempPicture,setTempPicture]=useState({bytes:'',filename:''})

  const Input = styled('input')({
    display: 'none',
  });

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
        var body={propertyid:rowData.propertyid}
    var response=await postData('typesofproperties/deletepropertytype',body)
    if(response.status)
       { Swal.fire('Property Type Deleted Successfully', '', 'success')
      fetchAllProperties()}
       else
       { Swal.fire('Server Error', '', 'error') }
      } else if (result.isDenied) {
        Swal.fire('Your Record is Safe', '', 'info')
      }
    })

 }

  const handleEditData=async()=>{
    var body={propertyid:propertyId,propertytype:propertyType}
    var response=await postData('typesofproperties/updatepropertytype',body)
    setOpen(false)
    if(response.status)
    {     

        Swal.fire({
           
            icon: 'success',
            title: 'PropertyType has been Edited',
            showConfirmButton: false,
            timer: 2000
          })

          fetchAllProperties()
    }
    else{

        Swal.fire({
           
            icon: 'error',
            title: 'Failed to edit the PropertyTypes',
            showConfirmButton: false,
            timer: 2000
          })
    }
 }

 
 const editPropertyIcon=async()=>{
  var formData=new FormData()
  formData.append("propertyid",propertyId)
  formData.append("propertyicon",propertyIcon.bytes)
  formData.append("oldpicture",tempPicture.filename.substring(tempPicture.filename.lastIndexOf("/")+1))
  var response=await postData('typesofproperties/updatepropertyicon',formData)
  setOpen(false)
  if(response.status)
  {     

      Swal.fire({
         
          icon: 'success',
          title: 'Property Icon has been updated',
          showConfirmButton: false,
          timer: 2000
        })
        fetchAllProperties()
      setShowBtn(false)
  }
  else{

      Swal.fire({
         
          icon: 'error',
          title: 'Failed to edit the property icon',
          showConfirmButton: false,
          timer: 2000
        })
  }
}

  const handleClose=()=>{
     
    setOpen(false)
  }

 const cancelPropertyIcon=()=>{
    setPropertyIcon({bytes:'',filename:tempPicture.filename})
    setShowBtn(false)
  }

  const handleOpenDialog=(rowData)=>{
    setPropertyId(rowData.propertyid)
    setPropertyType(rowData.propertytype)
    setPropertyIcon({bytes:'',filename:`${serverURL}/images/${rowData.propertyicon}`})
    setTempPicture({bytes:'',filename:`${serverURL}/images/${rowData.propertyicon}`})
    setOpen(true)
  }

  const editView=()=>{
    
    return(
      <div className={classes.editRoot}>
          <div className={classes.editSubdiv}>

                <Grid container spacing={2}>

                   <Grid item xs={12}>
                          <div className={classes.heading}>
                              Property Types Register
                          </div>
                   </Grid>
                   <Grid item xs={12}>
                      <TextField value={propertyType} onChange={(event)=>setPropertyType(event.target.value)} label="City Name" variant="outlined" fullWidth />
                   </Grid>

                     <Grid item xs={12}>
                      <Button onClick={()=>handleEditData()} variant="contained" fullWidth >Edit Property Type</Button>
                   </Grid>

                   <Grid item xs={6} className={classes.centerStyle}>
                     <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file"  onChange={handleChangeImage}  />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
                     </Grid>

                     <Grid item xs={6} className={classes.centerStyle}>
                      <div className={classes.buttonStyle}>
                     <Avatar
                        alt="Remy Sharp"
                        src={propertyIcon.filename}
                        variant="rounded"
                       />
                      {showBtn?<><Button onClick={editPropertyIcon}>Save</Button><Button onClick={cancelPropertyIcon}>Cancel</Button></>:<></>}
                       </div>
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

  
  const handleChangeImage=(event)=>{
    setPropertyIcon({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
    setShowBtn(true)
}


  function displayTable() {
    return (
      <MaterialTable
      title={"Property Type List"}
        data={property}
        columns={[  

            {
                title: "Property Id",
                field: "propertyid",
              },
          {
            title: "Property Type",
            field: "propertytype",
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

        ]}
        actions={[
          {
            icon: () => <EditIcon />,
            tooltip: "Edit Property Type",
            onClick: (event, rowData) => {
             handleOpenDialog(rowData)
            },
          },
          {
            icon: () => <DeleteIcon />,
            tooltip: "Delete Property Type",
            onClick: (event, rowData) => {
              handleDelete(rowData)
            },
          },
        ]}
      />
    );
  }



  const fetchAllProperties=async()=>{
    const result=await getData('typesofproperties/displayallpropertytype')
    setProperty(result.data)
  }



    useEffect(function(){
        fetchAllProperties()
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