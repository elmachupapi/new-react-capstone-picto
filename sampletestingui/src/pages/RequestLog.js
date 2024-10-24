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

const RequestLog = () => {
  // Sample data for request logs
  const logs = [
    {
      requestor: 'User1',
      requestNumber: 'REQ-001',
      date: '2024-10-10',
      action: 'Request Created',
      admin: 'Admin1',
    },
    {
      requestor: 'User2',
      requestNumber: 'REQ-002',
      date: '2024-10-11',
      action: 'Request Approved',
      admin: 'Admin2',
    },
    {
      requestor: 'User3',
      requestNumber: 'REQ-003',
      date: '2024-10-12',
      action: 'Request Denied',
      admin: 'Admin3',
    },
    {
      requestor: 'User4',
      requestNumber: 'REQ-004',
      date: '2024-10-13',
      action: 'Request Created',
      admin: 'Admin4',
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
              <TableCell>Requestor</TableCell>
              <TableCell>Request Number</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.requestNumber}>
                <TableCell>{log.requestor}</TableCell>
                <TableCell>{log.requestNumber}</TableCell>
                <TableCell>{log.date}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.admin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RequestLog;
