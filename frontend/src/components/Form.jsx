import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Box, Button, Container, Grid, TextField, Typography, Link } from "@mui/material";
import image1 from "../components/PGC logo.png"; // Replace with your actual file name
import image2 from "../components/PGC HD LOGO.png";
import image3 from "../components/PGC Text.png";

function Form() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Only for signup
  const [firstName, setFirstName] = useState(""); // For signup
  const [lastName, setLastName] = useState(""); // For signup
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin); // Toggle between login and signup
    setUsername("");
    setPassword("");
    setEmail("");
    setFirstName("");
    setLastName("");
  };

  const fetchAndSaveRole = async () => {
    try {
      const response = await api.get("api/profile/"); // Endpoint to fetch profile data
      const { role } = response.data;
      localStorage.setItem("role", role); // Save the role to localStorage
    } catch (error) {
      console.error("Error fetching user role:", error);
      alert("Failed to retrieve user role. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      if (isLogin) {
        // Login logic
        const res = await api.post("/api/token/", { username, password });
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        localStorage.setItem("username", username);

        await fetchAndSaveRole(); // Fetch and save the role after login

        navigate("/");
      } else {
        // Signup logic
        const payload = {
          username,
          password,
          email,
          first_name: firstName, // Send first name
          last_name: lastName, // Send last name
        };
        await api.post("/api/register/", payload);
        alert("Signup successful! Please log in.");
        setIsLogin(true); // Switch to login after successful signup
      }
    } catch (error) {
      alert(error.response?.data?.detail || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container sx={{ minHeight: "90vh" }}>
      {/* Left Section */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          color: "dark gray",
          position: "relative", // Make the grid relative for positioning
          p: 4,
        }}
      >
        {/* Top-left Images */}
        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <img
            src={image1}
            alt="Image 1"
            style={{ width: "85px", height: "85px", objectFit: "cover" }}
          />
          <img
            src={image2}
            alt="Image 2"
            style={{ width: "200px", height: "80px", objectFit: "cover", marginTop: "5px" }}
          />
          <img
            src={image3}
            alt="Image 3"
            style={{ width: "330px", height: "50px", objectFit: "cover", marginTop: "17px" }}
          />
        </Box>

        {/* Centered Text Content */}
        <Box
          sx={{
            position: "absolute",
            top: "50%", // Center vertically
            left: "50%", // Center horizontally
            transform: "translate(-50%, -50%)", // Adjust for perfect centering
            textAlign: "center", // Center text alignment
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: "bold", fontSize: "5rem", mb: -1 }}>
            PICTO
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: "semibold", fontSize: "5rem", mb: -1 }}>
            INVENTORY
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: "semibold", fontSize: "5rem" }}>
            SYSTEM
          </Typography>
        </Box>
      </Grid>

      {/* Right Section */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        <Container maxWidth="xs">
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
              {isLogin ? "Login" : "Signup"}
            </Typography>

            {!isLogin && (
              <>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </>
            )}

            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            {!isLogin && (
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            )}

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading} // Disable button during loading
            >
              {isLogin ? "Login" : "Signup"}
            </Button>

            <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <Link component="button" onClick={handleToggle} sx={{ fontWeight: "bold" }}>
                {isLogin ? "Signup" : "Login"}
              </Link>
            </Typography>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Form;
