import React, { useState, useEffect } from 'react';
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
import api from "../api";

const RequestItem = () => {

  const [requests, setRequests] = useState([]);
  const [category, setCategory] = useState("");
  const [item_name, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [purpose, setPurpose] = useState("");
  const [RF_number, setRFNumber] = useState("");

  useEffect(() => {
    getRequests();
  }, [])

  const getRequests = () => {
    api
      .get("/api/requests/")
      .then((res) => res.data)
      .then((data) => {setRequests(data); console.log(data)})
      .catch((err) => alert(err));
  }

  const createRequest = (e) => {
    e.preventDefault();
    api
      .post("api/requests/", { category, item_name, quantity, unit, RF_number, status:"Approved" })
      .then((res) => {
        if (res.status === 201) alert("Request Created!")
        else alert("Failed to create note")
      })
      .catch((err) => alert(err))
    getRequests();
  }

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom align="center">
        Request Item
      </Typography>
      <form onSubmit={createRequest}>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="item-category-label">Item Category</InputLabel>
              <Select
                labelId="item-category-label"
                id="category"
                name="category"
                value={category}
                onChange={(e)  => setCategory(e.target.value)}
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
              id="item_name"
              name="item_name"
              value={item_name}
              onChange={(e)  => setItemName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
         
          <Grid item xs={12} sm={6}>
            <TextField
              label="Quantity"
              id="quantity"
              name="quantity"
              type="number"
              value={quantity}
              onChange={(e)  => setQuantity(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Unit"
              id="unit"
              name="unit"
              value={unit}
              onChange={(e)  => setUnit(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Purpose"
              id="purpose"
              name="purpose"
              value={purpose}
              onChange={(e)  => setPurpose(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="RF Number"
              id="RF_number"
              name="RF_number"
              value={RF_number}
              onChange={(e)  => setRFNumber(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" value="Submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RequestItem;
