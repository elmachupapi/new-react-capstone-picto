import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import CableIcon from "@mui/icons-material/Cable";
import ComputerIcon from "@mui/icons-material/Computer";
import CreateIcon from "@mui/icons-material/Create";
import PrintIcon from "@mui/icons-material/Print";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import { Link } from "react-router-dom";
import api from "../api";

const Dashboard = () => {
  const requestCards = [
    {
      title: "Request Item",
      icon: <CreateIcon sx={{ fontSize: "6.5rem", color: "gray", position: "absolute", top: "20px", right: "10px", opacity: 0.6 }} />,
      link: "/request",
    },
    {
      title: "Request List",
      icon: <ListIcon sx={{ fontSize: "6.5rem", color: "gray", position: "absolute", top: "20px", right: "10px", opacity: 0.6 }} />,
      link: "/request/list",
    },
  ];

  const adminRequestCards = [
    {
      title: ["List of Requests", "from Users"],
      icon: <ChecklistRtlIcon sx={{ fontSize: "6.5rem", color: "gray", position: "absolute", top: "20px", right: "10px", opacity: 0.6 }} />,
      link: "/request/approvals",
    },
  ];

  const itemCards = [
    {
      title: "Electronics",
      icon: <CableIcon sx={{ fontSize: "6.5rem", color: "gray", position: "absolute", top: "20px", right: "10px", opacity: 0.6 }} />,
      link: "item/electronics",
    },
    {
      title: "IT Supplies",
      icon: <ComputerIcon sx={{ fontSize: "6.5rem", color: "gray", position: "absolute", top: "20px", right: "10px", opacity: 0.6 }} />,
      link: "item/itsupplies",
    },
    {
      title: "Office Supplies",
      icon: <PrintIcon sx={{ fontSize: "6.5rem", color: "gray", position: "absolute", top: "20px", right: "10px", opacity: 0.6 }} />,
      link: "/item/office",
    },
    {
      title: "Janitorial Supplies",
      icon: <CleaningServicesIcon sx={{ fontSize: "6.5rem", color: "gray", position: "absolute", top: "20px", right: "10px", opacity: 0.6 }} />,
      link: "/item/janitorial",
    },
  ];

  const [requests, setRequests] = useState([]);
  const [lowQuantityItems, setLowQuantityItems] = useState([]);
  const [outOfStockItems, setOutOfStockItems] = useState([]);
  const [userRole, setUserRole] = useState("viewer"); // Default role

  useEffect(() => {
    const role = localStorage.getItem("role") || "viewer";
    setUserRole(role);
    fetchRequests();
    fetchLowQuantityItems();
    fetchOutOfStockItems();
  }, []);

  const fetchRequests = () => {
    api
      .get("/api/requests/")
      .then((res) => res.data)
      .then((data) => setRequests(data))
      .catch((err) => alert(err));
  };

  const fetchLowQuantityItems = () => {
    api
      .get("api/item/dashboard/lowquantity/")
      .then((res) => res.data)
      .then((data) => setLowQuantityItems(data))
      .catch((err) => alert(err));
  };

  const fetchOutOfStockItems = () => {
    api
      .get("api/item/dashboard/zeroquantity/")
      .then((res) => res.data)
      .then((data) => setOutOfStockItems(data))
      .catch((err) => alert(err));
  };

  const formatDate = (dateString) => new Date(dateString).toISOString().split("T")[0];

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Request List
      </Typography>

      {/* Request Cards */}
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
                    <Typography variant="subtitle1" sx={{ fontSize: "1.7rem", lineHeight: "1.2" }}>
                      {card.title}
                    </Typography>
                    {card.icon}
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}

        {/* Admin-Specific Request Cards */}
        {userRole !== "viewer" && adminRequestCards.map((card, index) => (
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
                    {card.icon}
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Item Cards */}
      {userRole !== "viewer" && (
        <>
          <Typography variant="h5" sx={{ mt: 4 }}>
            Item List
          </Typography>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
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
                        <Typography
                          variant="subtitle1"
                          sx={{ fontSize: "1.7rem", lineHeight: "1.2" }}
                        >
                          {card.title}
                        </Typography>
                        {card.icon}
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Request Lists Section */}
      <Typography variant="h5" sx={{ mt: 4 }}>
        Request Lists
      </Typography>
      <TableContainer
        component={Box}
        sx={{
          mt: 2,
          borderRadius: "8px",
          overflow: "auto",
          maxHeight: "320px",
          backgroundColor: "white",
        }}
      >
        <Table sx={{ borderRadius: "8px" }}>
          <TableHead sx={{ backgroundColor: "#474647" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Item Description</TableCell>
              <TableCell sx={{ color: "white" }}>RF Number</TableCell>
              <TableCell sx={{ color: "white" }}>Date Requested</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.item_name}</TableCell>
                <TableCell>{request.RF_number}</TableCell>
                <TableCell>{formatDate(request.date_created)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Low Quantity Items */}
      {userRole !== "viewer" && (
        <>
          <Typography variant="h5" sx={{ mt: 4 }}>
            Low Quantity Items
          </Typography>
          <TableContainer
            component={Box}
            sx={{
              mt: 2,
              borderRadius: "8px",
              overflow: "auto",
              maxHeight: "320px",
              backgroundColor: "white",
            }}
          >
            <Table sx={{ borderRadius: "8px" }}>
              <TableHead sx={{ backgroundColor: "#e9b90b" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Item Description</TableCell>
                  <TableCell sx={{ color: "white" }}>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lowQuantityItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.item_name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Out of Stock Items */}
      {userRole !== "viewer" && (
        <>
          <Typography variant="h5" sx={{ mt: 4 }}>
            Out of Stock Items
          </Typography>
          <TableContainer
            component={Box}
            sx={{
              mt: 2,
              borderRadius: "8px",
              overflow: "auto",
              maxHeight: "320px",
              backgroundColor: "white",
            }}
          >
            <Table sx={{ borderRadius: "8px" }}>
              <TableHead sx={{ backgroundColor: "#DC4C64" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Item Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {outOfStockItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.item_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
