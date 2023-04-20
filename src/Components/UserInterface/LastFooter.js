import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { Grid } from "@mui/material";

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container maxWidth="xl">
        <hr></hr>
        <Typography variant="body1">
          <Grid container>
            <Grid item xs={4} style={{ fontSize: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{new Date().getFullYear()} Abode,Inc.</span>
                <span>·Privacy</span>
                <span>·Terms</span>
                <span>·Sitemap</span>
                <span>·Company details</span>
              </div>
            </Grid>
            <Grid item xs={5}></Grid>
            <Grid xs={3} style={{ fontSize: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>🌐 English(IN)</span>
                <span>₹ INR</span>
                <span>Support & resources</span>
              </div>
            </Grid>
          </Grid>
        </Typography>
      </Container>
    </Box>
  );
}
