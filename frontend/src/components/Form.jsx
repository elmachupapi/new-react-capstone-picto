import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

function Form ({ route, method }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Signup"

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
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

                await fetchAndSaveRole(); // Fetch and save the role after login

                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <Container maxWidth="xs">
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    {name}
                </Typography>

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
                >
                    {name}
                </Button>
            </Box>
        </Container>
    );
}

export default Form;
