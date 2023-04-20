import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Grid } from '@mui/material'

export default function StickyFooter() {
  return (
   
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="body1">
            


          </Typography>
          <Grid container>
           
            <Grid item xs={3} style={{fontSize:'16px'}}>
              <b>Support</b><br />
              Help Centre<br />
              AirCover<br />
              Safety information<br />
              Supporting people with disabilities<br />
              Cancellation options<br />
              Our COVID-19 Response<br />
              Report a neighbourhood concern<br />
            </Grid>
            <Grid item xs={3} style={{fontSize:'16px',fontStyle:'unset'}}>
              <b>Community</b><br />
              Abode.org: disaster relief housing<br />
              Support Afghan refugees<br />
              Combating discrimination<br />
            </Grid>
            <Grid item xs={3} style={{fontSize:'16px'}}>
              <b>Hosting</b><br />
              Try hosting<br />
              AirCover for Hosts<br />
              Explore hosting resources<br />
              Visit our community forum<br />
              How to host responsibly<br />
            </Grid>
            <Grid item xs={3} style={{fontSize:'16px'}}>
              <b>Abode</b><br />
              Newsroom<br />
              Learn about new features<br />
              Letter from our founders<br />
              Careers<br />
              Investors<br />
              Footer section<br />
            </Grid>
            <hr></hr>
          </Grid>
        </Container>
      </Box>
  

  );
}