// src/components/Dashboard.js
import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Users
            </Typography>
            <Typography variant="h2" color="text.secondary">
              1,024
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Sales
            </Typography>
            <Typography variant="h2" color="text.secondary">
              $56,789
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Orders
            </Typography>
            <Typography variant="h2" color="text.secondary">
              3,450
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Revenue
            </Typography>
            <Typography variant="h2" color="text.secondary">
              $120,000
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
