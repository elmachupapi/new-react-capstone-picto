import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => (
  <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.appBar, backgroundColor: 'white' }}>
    <Toolbar>
      <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
        AdminKit
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 1, p: 0.5 }}>
        <SearchIcon />
        <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
      </Box>
      {/* Additional icons and profile picture */}
    </Toolbar>
  </AppBar>
);

export default Header;
