import React from "react";
import { Box, CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

const drawerWidth = 240;

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: "flex", margin: 0  }}>
          <CssBaseline />
          <Sidebar drawerWidth={drawerWidth} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              backgroundColor: "#f0f4f4",
              minHeight: "100vh",
            }}
          >
            <Header drawerWidth={drawerWidth} />
            <Box sx={{ p: 3 }}>
              <Routes>
                <Route path="/" element={<Dashboard />} /> {/* Default Route */}
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Additional routes can go here */}
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
