import React,{useEffect, useState} from "react"
import { TextField,Grid,Button } from "@mui/material"
import {useStyles} from "./PropertySubtypeCss"
import { postData,getData } from "../../Api/ServerServices"
import Swal from "sweetalert2"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function PropertySubtype(props){
    const classes=useStyles()
    const[propertyId,setPropertyId]=useState('')
    const[subPropertyName,setSubPropertyName]=useState('')
    const[description,setDescription]=useState('')
    const [propertyTypes,setPropertyTypes]=useState([])

     const handleClick=async()=>{
     
        var body={propertyid:propertyId,subpropertyname:subPropertyName,description:description}
        var response=await postData('propertysubtype/addnewpropertysubtype',body)
        if(response.status)
        {
 
            Swal.fire({
               
                icon: 'success',
                title: 'Subproperty has been saved',
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
        },[])

    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>

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
                        <Button onClick={()=>handleClick()} variant="contained" fullWidth >Add New Subproperty</Button>
                     </Grid>


                  </Grid>

            </div>
        </div>
    )
}