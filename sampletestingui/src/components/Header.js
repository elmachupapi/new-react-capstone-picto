import React from "react";
import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";

const Header = ({ drawerWidth }) => {
  // Sample username
  const username = "Mark Kim"; // You can customize this as needed

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

        {/* User Avatar */}
        <Avatar sx={{ ml: 2 }}>MK</Avatar>
        <Typography variant="body1" sx={{ ml: 1, color: 'white' }}>
          {username}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
