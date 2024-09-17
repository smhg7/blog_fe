// src/AddBlog.js
import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [html, setHtml] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddBlog = async () => {
    const token = localStorage.getItem('token'); // Get the token from local storage

    try {
      const response = await axios.post('https://web-production-8d9c.up.railway.app/addblog', {
        token,
        date,
        Title: title,
        'sub title': subTitle,
        description,
        author,
        html,
        img_src: imgSrc
      });

      if (response.data.success) {
        setSuccess('Blog added successfully!');
        // Clear form fields
        setTitle('');
        setSubTitle('');
        setDate('');
        setDescription('');
        setAuthor('');
        setHtml('');
        setImgSrc('');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Failed to add blog. Please try again.');
    }
  };

  return (
    <Box sx={{ width: '600px', margin: 'auto', padding: '20px' }}>
      <Typography variant="h4">Add Blog</Typography>
      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Subtitle"
        fullWidth
        margin="normal"
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
        label="Description"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Author"
        fullWidth
        margin="normal"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <TextField
        label="HTML Content"
        fullWidth
        margin="normal"
        multiline
        rows={6}
        value={html}
        onChange={(e) => setHtml(e.target.value)}
      />
      <TextField
        label="Image Source"
        fullWidth
        margin="normal"
        value={imgSrc}
        onChange={(e) => setImgSrc(e.target.value)}
      />
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="success">{success}</Typography>}
      <Button variant="contained" color="primary" onClick={handleAddBlog}>
        Add Blog
      </Button>
    </Box>
  );
};

export default AddBlog;
