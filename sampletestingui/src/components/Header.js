import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Avatar, IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Header = ({ drawerWidth }) => {
  // Placeholder state for notifications count
  const [notificationsCount, setNotificationsCount] = useState(5); // Update with backend data in the future

  // Function to handle notification icon click
  const handleNotificationsClick = () => {
    // Placeholder function for opening notifications menu
    console.log("Notifications clicked");
  };

  return (
    <AppBar
  position="fixed"
  sx={{
    zIndex: (theme) => theme.zIndex.drawer + 1,
    backgroundColor: "#578FCB",
    marginLeft: `${drawerWidth}px`,
    width: `calc(100% - ${drawerWidth}px)`,
    boxShadow: "none",
    borderBottom: "none", // Ensure no bottom border
  }}
>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Box>

        {/* Notifications Icon with Badge */}
        <IconButton color="inherit" onClick={handleNotificationsClick}>
          <Badge badgeContent={notificationsCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* User Avatar */}
        <Avatar sx={{ ml: 2 }}>MK</Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
