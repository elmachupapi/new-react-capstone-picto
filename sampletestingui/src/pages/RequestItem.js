import React, { useState } from 'react';
import {
  TextField,
  MenuItem,
  Button,
  Grid,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

const RequestItem = () => {
  const [formData, setFormData] = useState({
    itemCategory: '',
    itemDescription: '',
    serialNumber: '',
    quantity: '',
    unit: '',
    date: '',
    purpose: '',
    rfNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle quantity validation
    if (name === 'quantity') {
      // Only update quantity if the value is a non-negative number
      if (value < 0) {
        return; // Prevent negative values
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, e.g., send data to an API
    console.log(formData);
  };

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom align="center">
        Request Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="item-category-label">Item Category</InputLabel>
              <Select
                labelId="item-category-label"
                name="itemCategory"
                value={formData.itemCategory}
                onChange={handleChange}
                required
              >
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="it supplies">IT Supplies</MenuItem>
                <MenuItem value="office supplies">Office Supplies</MenuItem>
                <MenuItem value="janitorial supplies">Janitorial Supplies</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Item Description"
              name="itemDescription"
              value={formData.itemDescription}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Serial Number"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="RF Number"
              name="rfNumber"
              value={formData.rfNumber}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RequestItem;
