import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box, Typography, Link, Container } from '@mui/material';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    department: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add form submit logic here (e.g., API call to register user)
  };

  return (
    <Container maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={formData.name}
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
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <TextField
          label="Department"
          select
          variant="outlined"
          fullWidth
          margin="normal"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="administrator">Administrator</MenuItem>
        </TextField>
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
        
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link href="/login" variant="body2">
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;
