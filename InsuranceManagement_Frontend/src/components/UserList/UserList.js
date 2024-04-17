import './UserList.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { baseURL } from '../../Server';
import {
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';

export default function UserList() {

  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL + '/user/users');
        setUserList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleToggleActive = async (id) => {
    const updatedData = userList.map(item => {
      if (item.id === id) {
        const IsActiveStatus = !item.isActive;
        updateUserIsActive(id, IsActiveStatus);
        return {
          ...item,
          isActive: IsActiveStatus
        };
      }
      return item;
    });

    setUserList(updatedData);
  };

  const updateUserIsActive = async (id, isActiveStatus) => {
    try {
      const response = await axios.put(baseURL + '/user/is-active/' + id, {
        'userId': id,
        'isActive': isActiveStatus
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = event => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = userList.filter(user =>
    `${user.firstName} ${user.lastName} ${user.email} ${user.phoneNumber}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const claimants = filteredUsers.filter(user => user.roleName === "Claimant");
  const agents = filteredUsers.filter(user => user.roleName === "Agent");

  return (
    <Container>
      <TextField
        fullWidth
        label="Search users..."
        value={searchQuery}
        onChange={handleSearch}
        sx={{ marginBottom: 2 }}
      />

      <div>
        <Typography variant="h5">Claimants</Typography>
        {claimants.length > 0 ? (
          claimants.map(item => (
            <div key={item.id} style={{ margin: '10px auto' }}>
              <Typography>Name: {item.firstName} {item.lastName}</Typography>
              <Typography>Email: {item.email}</Typography>
              <Typography>Number: {item.phoneNumber}</Typography>
            </div>
          ))
        ) : (
          <Typography>No Users Found</Typography>
        )}
      </div>

      <div>
        <Typography variant="h5">Agents</Typography>
        {agents.length > 0 ? (
          agents.map(item => (
            <div key={item.id} style={{ margin: '10px auto' }}>
              <Typography>Name: {item.firstName} {item.lastName}</Typography>
              <Typography>Email: {item.email}</Typography>
              <Typography>Number: {item.phoneNumber}</Typography>
              <Button
                onClick={() => handleToggleActive(item.id)}
                variant="contained"
                color={item.isActive ? "error" : "success"}
                sx={{ marginTop: 1 }}
              >
                {item.isActive ? "Deactivate" : "Activate"}
              </Button>
            </div>
          ))
        ) : (
          <Typography>No Users Found</Typography>
        )}
      </div>
    </Container>
  );
}
