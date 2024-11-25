import React, { useState, useEffect } from "react";
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
import api from "../api";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);

  // Fetch accounts from the backend
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get("/api/accounts/");
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
        alert("Failed to load accounts.");
      }
    };

    fetchAccounts();
  }, []);

  // Handle role change
  const handleRoleChange = async (event, username) => {
    const newRole = event.target.value;

    // Optimistically update the UI
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.username === username ? { ...account, role: newRole } : account
      )
    );

    try {
      // Send the update to the backend
      const response = await api.patch(`/api/accounts/${username}/`, {
        role: newRole,
      });
      if (response.status === 200) {
        alert("Role updated successfully!");
      } else {
        alert("Failed to update role.");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      alert("An error occurred while updating the role.");
    }
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
                  <Select
                    value={account.role}
                    onChange={(event) => handleRoleChange(event, account.username)}
                    displayEmpty
                    sx={{ width: "150px" }}
                    disabled={account.role === "superadmin"} // Disable dropdown for superadmin
                  >
                    {/* Exclude the superadmin role from the dropdown options */}
                    {["admin", "viewer"].map((role) => (
                      <MenuItem key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </MenuItem>
                    ))}
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
