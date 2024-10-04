import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [date, setDate] = useState('');
  const [html, setHtml] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isTokenValid = () => {
    const expirationTime = localStorage.getItem('tokenExpiration');
    return expirationTime && new Date().getTime() < expirationTime;
  };

  const handleAddBlog = async () => {
    const token = localStorage.getItem('token');

    if (!token || !isTokenValid()) {
      alert('Your session has expired. Please log in again.');
      return;
    }

    try {
      const response = await axios.post('https://web-production-8d9c.up.railway.app/addblog', {
        date,
        Title: title,
        'sub title': subTitle,
        html,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Authorization header
        }
      });

      if (response.data.success) {
        setSuccess('Blog added successfully!');
        setTitle('');
        setSubTitle('');
        setDate('');
        setHtml('');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Your session has expired. Please log in again.');
      } else {
        setError('Failed to add blog. Please try again.');
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ width: '600px', margin: '40px auto', padding: '30px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: '20px', color: 'black' }}>
        Add Blog
      </Typography>
      <TextField
        label="Title"
        fullWidth
        margin="normal"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Subtitle"
        fullWidth
        margin="normal"
        variant="outlined"
        value={subTitle}
        onChange={(e) => setSubTitle(e.target.value)}
      />
      <TextField
        label="Date"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <TextField
        label="HTML Content"
        fullWidth
        margin="normal"
        variant="outlined"
        multiline
        rows={6}
        value={html}
        onChange={(e) => setHtml(e.target.value)}
      />
      {error && <Typography color="error" sx={{ marginTop: '10px' }}>{error}</Typography>}
      {success && <Typography color="success" sx={{ marginTop: '10px' }}>{success}</Typography>}
      <Button 
        variant="contained" 
        sx={{ marginTop: '20px', backgroundColor: 'black', color: '#fff', '&:hover': { backgroundColor: '#689DA8' } }} 
        onClick={handleAddBlog}
      >
        Add Blog
      </Button>
    </Paper>
  );
};

export default AddBlog;
