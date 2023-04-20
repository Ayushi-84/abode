import React,{useState,useEffect} from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useStyles } from "./TopBarCss"; 
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';

export default function TopBar(props)
{
    const classes=useStyles()
return(
<div>
<AppBar position="static" color="inherit">
        <Toolbar>
       
          <div className={classes.logoStyle} >
            Abode
          </div>
          
  
          <div className={classes.avatarStyle}>
          <Avatar alt="Remy Sharp" src="/2.jpg" />
          <div className={classes.userNameStyle}>Peter Kumar</div>
          </div>
        </Toolbar>
      </AppBar>
   
</div>

)

}