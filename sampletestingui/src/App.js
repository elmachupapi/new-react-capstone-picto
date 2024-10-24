import React from "react";
import { Box, CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom"; // Import useLocation
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
import Login from "./LogIn"; // Login page
import ItemLog from "./pages/ItemLog";
import RequestLog from "./pages/RequestLog";
import Accounts from "./pages/Accounts";

const drawerWidth = 240;

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

// Main App component
function App() {
  // Get current location to check the path
  const location = useLocation();

  // Check if the current route is either login or sign-up page
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", margin: 0 }}>
        <CssBaseline />

        {/* Conditionally render Sidebar and Header */}
        {!isAuthPage && <Sidebar drawerWidth={drawerWidth} />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundColor: "#f0f4f4",
            minHeight: "100vh",
          }}
        >
          {/* Conditionally render the Header */}
          {!isAuthPage && <Header drawerWidth={drawerWidth} />}
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
              <Route path="/login" element={<Login />} /> {/* Login route */}
              <Route path="/item-log" element={<ItemLog />} /> 
              <Route path="/request-log" element={<RequestLog />} /> 
              <Route path="/accounts" element={<Accounts />} /> 
            </Routes>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// Wrap the App component in a Router
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
