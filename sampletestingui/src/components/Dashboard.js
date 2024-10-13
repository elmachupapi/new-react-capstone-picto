import React from "react";
import { Box, Card, CardContent, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import CableIcon from '@mui/icons-material/Cable';
import ComputerIcon from '@mui/icons-material/Computer';
import CreateIcon from "@mui/icons-material/Create";
import PrintIcon from '@mui/icons-material/Print';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

const Dashboard = () => {
  // Array containing data for each card
  const requestCards = [
    {
      title: "Request Item",
      value: "$60,000",
      icon: <CreateIcon sx={{ fontSize: "7rem", color: "gray", position: "absolute", top: "10px", right: "10px" }} />,
    },
    {
      title: "Request List",
      value: "650",
      icon: <ListIcon sx={{ fontSize: "7rem", color: "gray", position: "absolute", top: "10px", right: "10px" }} />,
    },
  ];

  const itemCards = [
    { title: "Electronics", value: "200", icon: <CableIcon sx={{ fontSize: "7rem", color: "gray", position: "absolute", top: "10px", right: "10px" }} /> },
    { title: "IT Supplies", value: "350", icon: <ComputerIcon sx={{ fontSize: "7rem", color: "gray", position: "absolute", top: "10px", right: "10px" }} /> },
    { title: "Office Supplies", value: "500", icon: <PrintIcon sx={{ fontSize: "7rem", color: "gray", position: "absolute", top: "10px", right: "10px" }} /> },
    { title: "Janitorial Supplies", value: "1000", icon: <CleaningServicesIcon sx={{ fontSize: "7rem", color: "gray", position: "absolute", top: "10px", right: "10px" }} /> },
  ];

  // Sample data for Requests List
  const requestsList = [
    { category: "Electronics", description: "Laptop", serial: "12345ABC", quantity: 5 },
    { category: "IT Supplies", description: "Mouse", serial: "54321CBA", quantity: 10 },
    { category: "Office Supplies", description: "Printer", serial: "67890DEF", quantity: 2 },
    { category: "Janitorial Supplies", description: "Broom", serial: "09876XYZ", quantity: 20 },
  ];

  return (
    <Box sx={{ mt: 10 }}>
      {/* Request List Section */}
      <Typography variant="h5" gutterBottom>
        Request List
      </Typography>
      <Grid container spacing={2}>
        {requestCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: "150px",
                position: "relative",
                transition: "0.3s ease",
                "&:hover": {
                  boxShadow: 3,
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontSize: "1.7rem", lineHeight: "1.2" }}>
                      Request
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: "1.7rem", lineHeight: "1.2" }}>
                      Item
                    </Typography>
                  </Box>
                  {card.icon}
                </Box>
                <Typography variant="h4" sx={{ fontSize: "1rem" }}>{card.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Item List Section */}
      <Typography variant="h5" sx={{ mt: 4 }}>
        Item List
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {itemCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: "150px",
                position: "relative",
                transition: "0.3s ease",
                "&:hover": {
                  boxShadow: 3,
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  {card.title === "Office Supplies" || card.title === "Janitorial Supplies" ? (
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontSize: "1.7rem", lineHeight: "1.2" }}>
                        {card.title.split(" ")[0]}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontSize: "1.7rem", lineHeight: "1.2" }}>
                        {card.title.split(" ")[1]}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontSize:
                          (
                            card.title === "Electronics" ||
                            card.title === "IT Supplies"
                          ) ? "1.7rem" : "1rem"
                      }}
                    >
                      {card.title}
                    </Typography>
                  )}
                  {card.icon}
                </Box>
                <Typography variant="h4" sx={{ fontSize: "1rem" }}>{card.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Requests List Section */}
      <Typography variant="h5" sx={{ mt: 4 }}>
  Request Lists
</Typography>
<TableContainer component={Box} sx={{ mt: 2, borderRadius: "8px", overflow: "hidden" }}>
  <Table sx={{ borderRadius: "8px" }}>
    <TableHead sx={{ backgroundColor: "#474647" }}>
      <TableRow>
        <TableCell sx={{ color: "white" }}>Item Category</TableCell>
        <TableCell sx={{ color: "white" }}>Item Description</TableCell>
        <TableCell sx={{ color: "white" }}>Serial Number</TableCell>
        <TableCell sx={{ color: "white" }}>Quantity</TableCell>
      </TableRow>
    </TableHead>
    <TableBody sx={{ backgroundColor: "#fff" }}>
            {requestsList.map((request, index) => (
              <TableRow key={index}>
                <TableCell sx={{ border: "1px solid #ccc" }}>{request.category}</TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>{request.description}</TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}>{request.serial}</TableCell>
                <TableCell sx={{ border: "1px solid #ccc" }}> {request.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;