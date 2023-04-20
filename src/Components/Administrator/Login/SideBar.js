import React, { useState, useEffect } from "react";
import { useStyles } from "./SideBarCss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";
import { Link } from "react-router-dom";
export default function SideBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.rootDiv}>
      <div>
        <div sx={{ width: 250 }}>
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <DashboardIcon fontSize="small" className={classes.iconStyle} />
              </ListItemIcon>
              <ListItemText className={classes.dashboardTextStyle}>
                DashBoard
              </ListItemText>
            </MenuItem>

            <Link to="/dashboard/displayallstates" className={classes.link}>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add States</ListItemText>
              </MenuItem>
            </Link>

            <Link to="/dashboard/displayallcities" className={classes.link}>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add Cities</ListItemText>
              </MenuItem>
            </Link>

            <Link to="/dashboard/displayalltypesofproperties" className={classes.link}>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add Properties</ListItemText>
              </MenuItem>
            </Link>
            <Link to="/dashboard/displayallpropertysubtype" className={classes.link}>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add Sub Properties</ListItemText>
              </MenuItem>
            </Link>

            <Link to="/dashboard/displayamenities" className={classes.link}>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add Amenities</ListItemText>
              </MenuItem>
            </Link>

            <Link to="/dashboard/displayallamenitiesoptions" className={classes.link}>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add Amenities Options</ListItemText>
              </MenuItem>
            </Link>
          </MenuList>
        </div>
      </div>
    </div>
  );
}
