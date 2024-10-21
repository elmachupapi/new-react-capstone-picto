import React from "react";
import { Box, CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import RequestItem from "./pages/RequestItem"; 
import RequestList from "./pages/RequestList"; 
import UserRequest from "./pages/UserRequest";
import ElectronicsList from "./pages/ElectronicsList";
import ITSuppliesList from "./pages/ITSuppliesList";
import OfficeList from "./pages/OfficeList";
import JanitorialList from "./pages/JanitorialList";
import SignUp from "./pages/SignUp";
import Login from "./LogIn";
import Logs from "./pages/Logs";




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
        <Box sx={{ display: "flex", margin: 0 }}>
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
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/request-item" element={<RequestItem />} /> 
                <Route path="/request-list" element={<RequestList />} /> 
                <Route path="/user-requests" element={<UserRequest />} /> 
                <Route path="/electronics-list" element={<ElectronicsList />} /> 
                <Route path="/IT-supplies-list" element={<ITSuppliesList />} /> 
                <Route path="/office-list" element={<OfficeList />} /> 
                <Route path="/janitorial-list" element={<JanitorialList />} />
                <Route path="/signup" element={<SignUp />} /> 
                <Route path="/login" element={<Login />} /> 
                <Route path="/logs" element={<Logs />} /> 

              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
