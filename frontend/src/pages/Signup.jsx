import Form from "../components/Form";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

function Signup() {
    return <Form route = "/api/user/register/" method = "signup" />
}

export default Signup;