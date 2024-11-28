import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Box,
  ListItemIcon,
  Collapse,
  Badge,
} from "@mui/material";
import { Link } from "react-router-dom";
import SpeedIcon from "@mui/icons-material/Speed";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import InventoryIcon from "@mui/icons-material/Inventory";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HistoryIcon from "@mui/icons-material/History";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import InsertChartIcon from "@mui/icons-material/InsertChart";  // Import for Reports icon
import logo from "./PGC logo.png";
import api from "../api";

const Sidebar = ({ drawerWidth }) => {
  const [openSection, setOpenSection] = useState(null);
  const [role, setRole] = useState(null); // Store the user's role
  const [pendingCount, setPendingCount] = useState(0); // Store the pending requests count

  useEffect(() => {
    // Retrieve the role from localStorage
    const userRole = localStorage.getItem("role");
    setRole(userRole);

    // Fetch the number of pending requests
    fetchPendingCount();
  }, []);

  const fetchPendingCount = async () => {
    try {
      const response = await api.get("/api/requests/list/pending/");
      setPendingCount(response.data.length); // Update the count based on the array length
    } catch (error) {
      console.error("Error fetching pending requests:", error);
    }
  };

  const handleToggle = (section) => {
    setOpenSection((prevOpenSection) =>
      prevOpenSection === section ? null : section
    );
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          overflow: "hidden",
          boxShadow: "none",
          borderRight: "none", // Remove any right border
        },
      }}
    >
      {/* Sidebar Title */}
      <Box
        sx={{
          width: drawerWidth,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          backgroundColor: "#3975B6",
          height: "64px",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: "54px", height: "54px", marginRight: "8px" }}
        />
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: 800,
            fontSize: "22px",
            fontFamily: "Poppins",
            lineHeight: "1.1",
          }}
        >
          PICTO Inventory
        </Typography>
      </Box>

      <Divider />

      {/* Sidebar List */}
      <List>
        {/* Always show Dashboard */}
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <SpeedIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ ml: -2, color: "gray" }} />
        </ListItem>

        {/* Show Requests Section */}
        <ListItem button onClick={() => handleToggle("requests")}>
          <ListItemIcon>
            <RequestPageIcon />
          </ListItemIcon>
          <ListItemText primary="Requests" sx={{ ml: -2, color: "gray" }} />
          {openSection === "requests" ? (
            <ExpandLessIcon sx={{ color: "gray" }} />
          ) : (
            <ExpandMoreIcon sx={{ color: "gray" }} />
          )}
        </ListItem>
        <Collapse
          in={openSection === "requests"}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/request" sx={{ pl: 7 }}>
              <ListItemText primary="Request Item" sx={{ color: "gray" }} />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/request/list"
              sx={{ pl: 7 }}
            >
              <ListItemText primary="Request List" sx={{ color: "gray" }} />
            </ListItem>
            {role !== "viewer" && (
              <ListItem
                button
                component={Link}
                to="/request/approvals"
                sx={{ pl: 7 }}
              >
                <Badge
                  badgeContent={pendingCount}
                  color="error"
                  sx={{ "& .MuiBadge-badge": { right: -75, top: 13 } }} // Adjust badge position
                >
                  <ListItemText
                    primary="Approvals"
                    sx={{ color: "gray" }}
                  />
                </Badge>
              </ListItem>
            )}
          </List>
        </Collapse>

        {/* Show Items Section */}
        {role !== "viewer" && (
          <>
            <ListItem button onClick={() => handleToggle("items")}>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Items" sx={{ ml: -2, color: "gray" }} />
              {openSection === "items" ? (
                <ExpandLessIcon sx={{ color: "gray" }} />
              ) : (
                <ExpandMoreIcon sx={{ color: "gray" }} />
              )}
            </ListItem>
            <Collapse
              in={openSection === "items"}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItem
                  component={Link}
                  to="/item/electronics"
                  sx={{ pl: 7 }}
                >
                  <ListItemText primary="Electronics" sx={{ color: "gray" }} />
                </ListItem>
                <ListItem
                  component={Link}
                  to="/item/itsupplies"
                  sx={{ pl: 7 }}
                >
                  <ListItemText primary="IT Supplies" sx={{ color: "gray" }} />
                </ListItem>
                <ListItem
                  component={Link}
                  to="/item/office"
                  sx={{ pl: 7 }}
                >
                  <ListItemText primary="Office Supplies" sx={{ color: "gray" }} />
                </ListItem>
                <ListItem
                  component={Link}
                  to="/item/janitorial"
                  sx={{ pl: 7 }}
                >
                  <ListItemText
                    primary="Janitorial Supplies"
                    sx={{ color: "gray" }}
                  />
                </ListItem>
              </List>
            </Collapse>
          </>
        )}

        {/* Show Logs Section */}
        {role !== "viewer" && (
          <>
            <ListItem button onClick={() => handleToggle("logs")}>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary="Logs" sx={{ ml: -2, color: "gray" }} />
              {openSection === "logs" ? (
                <ExpandLessIcon sx={{ color: "gray" }} />
              ) : (
                <ExpandMoreIcon sx={{ color: "gray" }} />
              )}
            </ListItem>
            <Collapse in={openSection === "logs"} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  component={Link}
                  to="/logs/request"
                  sx={{ pl: 7 }}
                >
                  <ListItemText
                    primary="Request Log"
                    sx={{ color: "gray" }}
                  />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/logs/item"
                  sx={{ pl: 7 }}
                >
                  <ListItemText primary="Item Log" sx={{ color: "gray" }} />
                </ListItem>
              </List>
            </Collapse>
          </>
        )}

        {/* Show Accounts Section */}
        {role === "superadmin" && (
          <ListItem button component={Link} to="/accounts">
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Accounts" sx={{ ml: -2, color: "gray" }} />
          </ListItem>
        )}

        {/* Show Reports Section */}
        {role !== "viewer" && (
          <ListItem button component={Link} to="/report/inventorycomparison">
            <ListItemIcon>
              <InsertChartIcon />  {/* Icon for Reports */}
            </ListItemIcon>
            <ListItemText primary="Reports" sx={{ ml: -2, color: "gray" }} />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
