import React from "react";
import { Box, Card, CardContent, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import CableIcon from '@mui/icons-material/Cable';
import ComputerIcon from '@mui/icons-material/Computer';
import CreateIcon from "@mui/icons-material/Create";
import PrintIcon from '@mui/icons-material/Print';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const requestCards = [
    {
      title: "Request Item",
      value: "$60,000",
      icon: <CreateIcon sx={{ fontSize: "7rem", color: "gray", position: "absolute", top: "10px", right: "10px" }} />,
      link: "/request-item",
    },
    {
      title: "Request List",
      value: "650",
      icon: <ListIcon sx={{ fontSize: "7rem", color: "gray", position: "absolute", top: "10px", right: "10px" }} />,
      link: "/request-list",
    },
    {
      title: ["List of Requests", "from Users"],
      value: "300",
      icon: <ChecklistRtlIcon sx={{ fontSize: "7rem", color: "gray", position: "absolute", top: "10px", right: "10px" }} />,
      link: "/user-requests",
    },
  ];

  const itemCards = [
    {
      title: "Electronics",
      value: "200",
      icon: <CableIcon sx={{ fontSize: "7rem", color: "gray", position: "absolute", top: "10px", right: "10px"}} />,
      link: "/electronics-list",
    },
    {
      title: "IT Supplies",
      value: "350",
      icon: <ComputerIcon sx={{ fontSize: "7rem", color: "gray", position: "absolute", top: "10px", right: "10px" }} />,
      link: "/IT-supplies-list",
    },
    {
      title: "Office Supplies",
      value: "500",
      icon: <PrintIcon sx={{ fontSize: "7rem", color: "gray", position: "absolute", top: "10px", right: "10px" }} />,
      link: "/office-list",
    },
    {
      title: "Janitorial Supplies",
      value: "1000",
      icon: <CleaningServicesIcon sx={{ fontSize: "7rem", color: "gray", position: "absolute", top: "10px", right: "10px" }} />,
      link: "/janitorial-list",
    },
  ];

  const requestsList = [
    { name: "Laptop", number: "REQ-001", date: "2024-10-10" },
    { name: "Mouse", number: "REQ-002", date: "2024-10-11" },
    { name: "Printer", number: "REQ-003", date: "2024-10-12" },
    { name: "Broom", number: "REQ-004", date: "2024-10-13" },
  ];

  // Low quantity items data
  const lowQuantityItems = [
    { name: "Keyboard", quantity: 5 },
    { name: "Stapler", quantity: 2 },
    { name: "Notebook", quantity: 1 },
  ];

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Request List
      </Typography>
      <Grid container spacing={2}>
        {requestCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Link to={card.link} style={{ textDecoration: "none" }}>
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
                      {Array.isArray(card.title) ? (
                        card.title.map((line, i) => (
                          <Typography key={i} variant="subtitle1" sx={{ fontSize: "1.7rem", lineHeight: "1.2" }}>
                            {line}
                          </Typography>
                        ))
                      ) : (
                        <Typography variant="subtitle1" sx={{ fontSize: "1.7rem", lineHeight: "1.2" }}>
                          {card.title}
                        </Typography>
                      )}
                    </Box>
                    {card.icon}
                  </Box>
                  <Typography variant="h4" sx={{ fontSize: "1rem" }}>{card.value}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mt: 4 }}>
        Item List
      </Typography>
      <Grid container spacing={2} sx={{ mt: .5 }}>
        {itemCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Link to={card.link || "#"} style={{ textDecoration: "none" }}>
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
                          fontSize: (
                            card.title === "Electronics" || card.title === "IT Supplies"
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
            </Link>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mt: 4 }}>
        Request Lists
      </Typography>
      <TableContainer component={Box} sx={{ mt: 2, borderRadius: "8px", overflow: "hidden" }}>
        <Table sx={{ borderRadius: "8px" }}>
          <TableHead sx={{ backgroundColor: "#474647" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Item Name</TableCell>
              <TableCell sx={{ color: "white" }}>Request Number</TableCell>
              <TableCell sx={{ color: "white" }}>Date Requested</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requestsList.map((request) => (
              <TableRow key={request.number}>
                <TableCell>{request.name}</TableCell>
                <TableCell>{request.number}</TableCell>
                <TableCell>{request.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Low Quantity Items Section */}
      <Typography variant="h5" sx={{ mt: 4 }}>
        Low Quantity Items
      </Typography>
      <TableContainer component={Box} sx={{ mt: 2, borderRadius: "8px", overflow: "hidden" }}>
        <Table sx={{ borderRadius: "8px" }}>
          <TableHead sx={{ backgroundColor: "#e9b90b" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Item Name</TableCell>
              <TableCell sx={{ color: "white" }}>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lowQuantityItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Out of stock Items Section */}
      <Typography variant="h5" sx={{ mt: 4 }}>
        Out of Stock Items
      </Typography>
      <TableContainer component={Box} sx={{ mt: 2, borderRadius: "8px", overflow: "hidden" }}>
        <Table sx={{ borderRadius: "8px" }}>
          <TableHead sx={{ backgroundColor: "#DC4C64" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Item Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lowQuantityItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;
