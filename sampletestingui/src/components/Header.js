import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Avatar, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout'; 

const Header = ({ drawerWidth }) => {
  const username = "Mark Kim"; // Sample username

  // State for handling dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Handlers for opening and closing the dropdown menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Handle logout functionality here
    console.log("User logged out");
    handleMenuClose();
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
        borderBottom: "none",
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Box>

        {/* User section with Avatar and Dropdown */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleMenuOpen}>
          <Avatar sx={{ mr: 1 }}>MK</Avatar>
          <Typography variant="body1" sx={{ color: 'white' }}>
            {username}
          </Typography>
          <ArrowDropDownIcon sx={{ color: 'white', ml: 0.5 }} />
        </Box>

        {/* Dropdown Menu with increased width */}
        <Menu
  anchorEl={anchorEl}
  open={open}
  onClose={handleMenuClose}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
  sx={{
    '& .MuiPaper-root': {
      minWidth: '200px', // Set the minimum width for the dropdown
      marginTop: '12px', // Increase the margin to move the menu further from the username
    },
  }}
  disableScrollLock // Add this prop to prevent the scrollbar from disappearing
>
  <MenuItem onClick={handleLogout}>
    <LogoutIcon sx={{ mr: 1, color: "gray" }} /> {/* Add the Logout icon with margin */}
    Log Out
  </MenuItem>
</Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
