import React,{useState} from "react"
import { TextField,Grid,Button } from "@mui/material"
import {useStyles} from "./StateCss"
import { postData } from "../../Api/ServerServices"
import Swal from "sweetalert2"

export default function States(props){
    const classes=useStyles()
    const[stateName,setStateName]=useState('')

    const handleClear=()=>{
       setStateName('')
    
    }

    const handleClick=async()=>{
       var body={statename:stateName}
       var response=await postData('states/addnewstates',body)
       if(response.status)
        {
 
            Swal.fire({
               
                icon: 'success',
                title: 'States has been saved',
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
                                States Register
                            </div>
                     </Grid>
                     <Grid item xs={12}>
                        <TextField value={stateName} onChange={(event)=>setStateName(event.target.value)} label="State Name" variant="outlined" fullWidth />
                     </Grid>

                     <Grid item xs={12}>
                        <Button onClick={()=>handleClick()} variant="contained" fullWidth >Add New State</Button>
                     </Grid>


                  </Grid>

            </div>
        </div>
    )
}