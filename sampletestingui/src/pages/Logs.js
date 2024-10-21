import React from 'react';
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
} from '@mui/material';

const Logs = () => {
  // Sample data for logs: includes both request details and approval status
  const logs = [
    {
      itemName: 'Laptop',
      requestNumber: 'REQ-001',
      dateRequested: '2024-10-10',
      status: 'Approved',
      requestedBy: 'User1',
      approvedBy: 'Admin1',
    },
    {
      itemName: 'Mouse',
      requestNumber: 'REQ-002',
      dateRequested: '2024-10-11',
      status: 'Denied',
      requestedBy: 'User2',
      approvedBy: 'Admin2',
    },
    {
      itemName: 'Printer',
      requestNumber: 'REQ-003',
      dateRequested: '2024-10-12',
      status: 'Approved',
      requestedBy: 'User3',
      approvedBy: 'Admin3',
    },
    {
      itemName: 'Broom',
      requestNumber: 'REQ-004',
      dateRequested: '2024-10-13',
      status: 'Pending',
      requestedBy: 'User4',
      approvedBy: 'Admin4',
    },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f0f4f4', minHeight: '100vh', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Request Logs
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Request Number</TableCell>
              <TableCell>Date Requested</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Requested By</TableCell>
              <TableCell>Approved/Denied By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.requestNumber}>
                <TableCell>{log.itemName}</TableCell>
                <TableCell>{log.requestNumber}</TableCell>
                <TableCell>{log.dateRequested}</TableCell>
                <TableCell>{log.status}</TableCell>
                <TableCell>{log.requestedBy}</TableCell>
                <TableCell>{log.approvedBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Logs;
