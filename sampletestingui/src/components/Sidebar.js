import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';

const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Analytics', icon: <ShoppingCartIcon /> },
    { text: 'E-Commerce', icon: <PeopleIcon /> },
    // Add other items here
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: 240, 
          boxSizing: 'border-box', 
          backgroundColor: '#222E3C', 
          color: 'white',
        },
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => setActivePage(item.text)}
            sx={{
              background: activePage === item.text 
                ? 'linear-gradient(to right, rgba(25, 118, 210, .5), rgba(34, 46, 60, 1))' // Softer gradient
                : 'transparent',
              color: activePage === item.text ? 'white' : 'inherit',
              '&:hover': { backgroundColor: '#1565C0' },
              transition: 'background 0.3s ease',
            }}
          >
            <ListItemIcon sx={{ color: activePage === item.text ? 'white' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} primaryTypographyProps={{ style: { color: activePage === item.text ? 'white' : 'inherit' } }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
