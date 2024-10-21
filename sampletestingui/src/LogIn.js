import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link, Container } from '@mui/material';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
    // Add logic for form submission (e.g., API call to login)
  };

  return (
    <Container maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Log In
        </Typography>
        
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          name="username"
          value={loginData.username}
          onChange={handleChange}
          required
        />
        
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Log In
        </Button>
        
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link href="/signup" variant="body2">
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
