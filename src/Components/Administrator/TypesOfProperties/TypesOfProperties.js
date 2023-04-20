import React,{useState} from "react"
import { TextField,Grid,Button } from "@mui/material"
import {useStyles} from "./TypesOfPropertiesCss"
import { postData } from "../../Api/ServerServices"
import Swal from "sweetalert2"
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import cityimage from "../../assets/images/city.png"

export default function TypesOfProperties(props){
    const classes=useStyles()
    const[propertyType,setPropertyType]=useState('')
    const[propertyIcon,setPropertyIcon]=useState({bytes:'',filename:cityimage})
   
    const Input = styled('input')({
        display: 'none',
      });


    const handleClear=()=>{
       setPropertyType('')
       setPropertyIcon({bytes:'',filename:cityimage})
       }

     const handleClick=async()=>{
      var formData=new FormData()

      formData.append("propertytype",propertyType)
      formData.append("propertyicon",propertyIcon.bytes)
        var response=await postData('typesofproperties/addnewproperty',formData,true)
        if(response.status)
        {
 
            Swal.fire({
               
                icon: 'success',
                title: 'Property has been saved',
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

     
     const handleChangeImage=(event)=>{
        setPropertyIcon({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
}

    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>

                  <Grid container spacing={2}>

                     <Grid item xs={12}>
                            <div className={classes.heading}>
                                Types Of Property Register
                            </div>
                     </Grid>
                     <Grid item xs={12}>
                        <TextField value={propertyType} onChange={(event)=>setPropertyType(event.target.value)} label="Property Type" variant="outlined" fullWidth />
                     </Grid>

                     
                     <Grid item xs={6} className={classes.centerStyle}>
                     <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" onChange={handleChangeImage} />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
                     </Grid>
                     <Grid item xs={6} className={classes.centerStyle}>
                     <Avatar
                        alt="Remy Sharp"
                        src={propertyIcon.filename}
                        variant="rounded"
                       
                        />
                     </Grid>

                     <Grid item xs={12}>
                        <Button onClick={()=>handleClick()} variant="contained" fullWidth >Add New Property Type</Button>
                     </Grid>


                  </Grid>

            </div>
        </div>
    )
}