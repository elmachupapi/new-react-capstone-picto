import Form from "../components/Form";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

function Login() {
    return <Form route = "/api/token/" method = "login" />
}

export default Login;