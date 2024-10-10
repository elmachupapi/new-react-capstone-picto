import React, { useState } from 'react';
import { CssBaseline, Box, Typography, Container, Grid, Paper } from '@mui/material';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  
  const [activePage, setActivePage] = useState("Dashboard"); // Set initial active page
  
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f4f4fc' }}> {/* Set background color here */}
      <CssBaseline />
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, mt: 5 }} // Add top margin to push content below the header
      >
        <Header />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {/* Request List */}
          <Typography variant="h5" gutterBottom sx={{ fontSize: '2rem' }}> {/* Adjust the font size here */}
            Request List
          </Typography>
          <Grid container spacing={2}>
            {[1, 2, 3, 4].map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 2,
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  <Typography variant="h6">SALES</Typography>
                  <Typography variant="h4">650</Typography>
                  <Typography variant="body2" color="green">+12% Since last year</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Item List */}
          <Typography variant="h5" gutterBottom sx={{ fontSize: '2rem', mt: 4  }}> {/* Adjust the font size here */}
            Item List
          </Typography>
          <Grid container spacing={2}>
            {[1, 2, 3, 4].map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 2,
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  <Typography variant="h6">SALES</Typography>
                  <Typography variant="h4">650</Typography>
                  <Typography variant="body2" color="green">+12% Since last year</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Request Section */}
          <Paper sx={{ mt: 4, p: 2, backgroundColor: '#0D47A1', color: 'white' }}>
            <Typography variant="h6">Requests:</Typography>
          </Paper>
          {[1, 2, 3, 4].map((_, index) => (
            <Paper key={index} sx={{ p: 2, mt: 1 }}>
              List
            </Paper>
          ))}
        </Container>
      </Box>
    </Box>
  );
}

export default App;
