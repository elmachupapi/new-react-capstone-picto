import React from "react"; // Capitalized 'React'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { Box, CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const drawerWidth = 240;

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function SignupAndLogout() {
  localStorage.clear();
  return <Signup />;
}

// Main App component
function App() {
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
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/signup" element={<SignupAndLogout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// AppWrapper component
function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;