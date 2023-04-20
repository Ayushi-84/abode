import React,{useEffect, useState} from "react"
import { TextField,Grid,Button } from "@mui/material"
import {useStyles} from "./CityCss"
import { postData,getData } from "../../Api/ServerServices"
import Swal from "sweetalert2"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import cityimage from "../../assets/images/city.png"

export default function City(props){
    const classes=useStyles()
    const[stateId,setStateId]=useState('')
    const[cityName,setCityName]=useState('')
    const[cityPicture,setCityPicture]=useState({bytes:'',filename:cityimage})
    const [states,setStates]=useState([])

    const Input = styled('input')({
        display: 'none',
      });

     const handleClick=async()=>{
      var formData=new FormData()

        formData.append("stateid",stateId)
        formData.append("cityname",cityName)
        formData.append("picture",cityPicture.bytes)

        var response=await postData('city/addnewcity',formData,true)
        if(response.status)
        {
 
            Swal.fire({
               
                icon: 'success',
                title: 'City has been saved',
                showConfirmButton: false,
                timer: 1500
              })
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
    

      const handleChangeImage=(event)=>{
        setCityPicture({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
}


        useEffect(function(){
            fetchAllStates()
        },[])

    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>

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
                        src={cityPicture.filename}
                        variant="rounded"
                       
                        />
                     </Grid>

                     <Grid item xs={12}>
                        <Button onClick={()=>handleClick()} variant="contained" fullWidth >Add New City</Button>
                     </Grid>


                  </Grid>

            </div>
        </div>
    )
}