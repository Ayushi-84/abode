import React,{useState,useEffect} from "react";
import { getData } from "../../Api/ServerServices";
import MaterialTable from "@material-table/core";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStyles } from "./DisplayAllCitiesCss";
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
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

export default function DisplayAllCities(props){

  const classes=useStyles()
  
  const[states,setStates]=useState([])
  const[city,setCity]=useState([])
  const[open,setOpen]=useState(false)
  const[cityName,setCityName]=useState('')
  const[cityId,setCityId]=useState('')
  const[cityPicture,setCityPicture]=useState({bytes:'',filename:''})
  const[stateId,setStateId]=useState('')
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
        var body={cityid:rowData.cityid}
    var response=await postData('city/deletecity',body)
    if(response.status)
       { Swal.fire('City Deleted Successfully', '', 'success')
      fetchAllCities()}
       else
       { Swal.fire('Server Error', '', 'error') }
      } else if (result.isDenied) {
        Swal.fire('Your Record is Safe', '', 'info')
      }
    })

 }

  const handleEditData=async()=>{
    var body={stateid:stateId,cityid:cityId,cityname:cityName}
    var response=await postData('city/updatecity',body)
    setOpen(false)
    if(response.status)
    {     

        Swal.fire({
           
            icon: 'success',
            title: 'City has been Edited',
            showConfirmButton: false,
            timer: 2000
          })

          fetchAllCities()
    }
    else{

        Swal.fire({
           
            icon: 'error',
            title: 'Failed to edit the city',
            showConfirmButton: false,
            timer: 2000
          })
    }
 }

 
 const editCityPicture=async()=>{
  var formData=new FormData()
  formData.append("cityid",cityId)
  formData.append("picture",cityPicture.bytes)
  formData.append("oldpicture",tempPicture.filename.substring(tempPicture.filename.lastIndexOf("/")+1))
  var response=await postData('city/updatecitypicture',formData)
  setOpen(false)
  if(response.status)
  {     

      Swal.fire({
         
          icon: 'success',
          title: 'Picture has been updated',
          showConfirmButton: false,
          timer: 2000
        })
        fetchAllCities()
      setShowBtn(false)
  }
  else{

      Swal.fire({
         
          icon: 'error',
          title: 'Failed to edit the picture',
          showConfirmButton: false,
          timer: 2000
        })
  }
}

  const handleClose=()=>{
     
    setOpen(false)
  }

 const cancelCityPicture=()=>{
    setCityPicture({bytes:'',filename:tempPicture.filename})
    setShowBtn(false)
  }

  const handleOpenDialog=(rowData)=>{
    fetchAllStates()
    setCityId(rowData.cityid)
    setCityName(rowData.cityname)
    setCityPicture({bytes:'',filename:`${serverURL}/images/${rowData.picture}`})
    setStateId(rowData.stateid)
    setTempPicture({bytes:'',filename:`${serverURL}/images/${rowData.picture}`})
    setOpen(true)
  }

  const editView=()=>{
    
    return(
      <div className={classes.editRoot}>
          <div className={classes.editSubdiv}>

                <Grid container spacing={2}>

                   <Grid item xs={12}>
                          <div className={classes.heading}>
                              City Register
                          </div>
                   </Grid>
                   <Grid item xs={12}>
                        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={stateId}
          label="State"
          onChange={(event)=>handleStatesChange(event)}
        >
         {fillState()}
        </Select>
      </FormControl>
                        </Grid>
                   <Grid item xs={12}>
                      <TextField value={cityName} onChange={(event)=>setCityName(event.target.value)} label="City Name" variant="outlined" fullWidth />
                   </Grid>

                     <Grid item xs={12}>
                      <Button onClick={()=>handleEditData()} variant="contained" fullWidth >Edit City</Button>
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
                        src={cityPicture.filename}
                        variant="rounded"
                       />
                      {showBtn?<><Button onClick={editCityPicture}>Save</Button><Button onClick={cancelCityPicture}>Cancel</Button></>:<></>}
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
    setCityPicture({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
    setShowBtn(true)
}


  function displayTable() {
    return (
      <MaterialTable
      title={"City List"}
        data={city}
        columns={[  
          {
            title: "State Id",
            field: "stateid",
          },
          {
            title: "State Name",
            field: "statename",
          },
          {
            title: "City Id",
            field: "cityid",
          },
          {
            title: "City Name",
            field: "cityname",
          },
            
          {
            title: "Picture",
            field: "picture",
            render: (rowData) => {
              return (
                <img src={`${serverURL}/images/${rowData.picture}`} style={{ width: 60, borderRadius: "20" }} alt="" />
              );
            }
          },

        ]}
        actions={[
          {
            icon: () => <EditIcon />,
            tooltip: "Edit City",
            onClick: (event, rowData) => {
             handleOpenDialog(rowData)
            },
          },
          {
            icon: () => <DeleteIcon />,
            tooltip: "Delete City",
            onClick: (event, rowData) => {
              handleDelete(rowData)
            },
          },
        ]}
      />
    );
  }



  const fetchAllCities=async()=>{
    const result=await getData('city/displayallcities')
    setCity(result.data)
  }
  const fetchAllStates=async()=>{
    const result=await getData('states/displayallstates')
    setStates(result.data)
  }

  const fillState=()=>{
      
    return states.map((item)=>{
        return(
            <MenuItem value={item.stateid}>{item.statename}</MenuItem>
        )
    })

  }

  const handleStatesChange=(event)=>{
    setStateId(event.target.value)
}



    useEffect(function(){
        fetchAllStates()
        fetchAllCities()
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