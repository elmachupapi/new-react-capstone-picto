import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
} from "@mui/material";

const Accounts = () => {
  // Sample data for accounts with roles
  const [accounts, setAccounts] = useState([
    { username: "jdoe", name: "John Doe", role: "User" },
    { username: "asmith", name: "Anna Smith", role: "Admin" },
    { username: "rjohnson", name: "Robert Johnson", role: "User" },
    { username: "kwhite", name: "Karen White", role: "Admin" },
  ]);

  // Handle role change for an account
  const handleRoleChange = (event, username) => {
    const newRole = event.target.value;
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.username === username ? { ...account, role: newRole } : account
      )
    );
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f0f4f4", minHeight: "100vh", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Accounts List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.username}>
                <TableCell>{account.username}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>
                  {/* Editable dropdown for role */}
                  <Select
                    value={account.role}
                    onChange={(event) => handleRoleChange(event, account.username)}
                    displayEmpty
                    sx={{ width: "150px" }}
                  >
                    <MenuItem value="User">User</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Accounts;
