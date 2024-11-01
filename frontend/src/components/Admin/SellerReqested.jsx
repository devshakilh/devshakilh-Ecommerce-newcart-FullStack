import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const SellerRequestsTable = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/v1/admin/users');
        setRequests(response.data.users.filter(user => user.role === 'seller' && !user.approved));
      } catch (error) {
        console.error('Error fetching seller requests', error);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`/api/v1/admin/user/${id}/approveseller`);
      setRequests(requests.filter(request => request._id !== id));
    } catch (error) {
      console.error('Error approving seller', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`/api/v1/admin/user/${id}/rejectseller`);
      setRequests(requests.filter(request => request._id !== id));
    } catch (error) {
      console.error('Error rejecting seller', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request._id}>
              <TableCell>{request.name}</TableCell>
              <TableCell>{request.email}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  className="mr-2"
                  onClick={() => handleApprove(request._id)}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleReject(request._id)}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SellerRequestsTable;
