import { getData, serverURL } from "../Api/ServerServices";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";
export default function StateHeader() {
  const [states, setStates] = useState([]);
  const fetchAllStates = async () => {
    const result = await getData("users/displayallstates");
    if (result.status) {
      setStates(result.data);
    }
  };
  useEffect(function () {
    fetchAllStates();
  }, []);
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="inherit">
          <Toolbar>
            {states.map((item, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100px",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 5,
                    cursor: "pointer",
                  }}
                >
                  <Avatar
                    variant="square"
                    src={`${serverURL}/images/${item.icon}`}
                  />
                  <div style={{ fontSize: 12 }}>{item.statename}</div>
                </div>
              );
            })}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
