import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Skeleton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import './style.css';

const Blog = () => {
  const [blog, setBlog] = useState(null); 
  const [error, setError] = useState(null);
  const { blog_id } = useParams();
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.post(
          'https://web-production-8d9c.up.railway.app/oneblog',
          { "blog_id": blog_id },
          { headers: { 'Content-Type': 'application/json' } }
        );
        setBlog(response.data); // Set the single blog object
      } catch (err) {
        setError('Failed to fetch blog');
      }
    };
    
    window.scrollTo(0, 0);
    fetchBlog();
  }, [blog_id]);

  const handleDelete = async () => {
    try {
      await axios.post(
        'https://web-production-8d9c.up.railway.app/deleteblog',
        {
          "blog_id": blog_id,
          "token": token
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      // Optionally clear the blog state
      setBlog(null);
      navigate('/'); // Navigate to the home page after deletion
    } catch (err) {
      setError('Failed to delete blog');
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <Container sx={{ height: "100vh" }}>
        {blog ? (
          <div>
            <Typography variant="h1" component="h1" color='#5684AC'>{blog.Title}</Typography>
            <Typography variant="h6" component="h6">{blog['sub title']}</Typography>
            <p><strong>Date:</strong> {blog.date}</p>

            {/* Only render the delete button if the token is present */}
            {token && (
              <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDelete}>
                Delete
              </Button>
            )}

            <hr />
            <div dangerouslySetInnerHTML={{ __html: blog.html }} />
          </div>
        ) : (
          <Box>
            <Skeleton variant="text" height={40} width="80%" />
            <Skeleton variant="text" height={30} width="60%" />
            <Skeleton variant="rectangular" height={300} sx={{ marginTop: 2 }} />
            <Skeleton variant="text" height={20} width="50%" sx={{ marginTop: 2 }} />
            <Skeleton variant="text" height={20} width="50%" sx={{ marginTop: 2 }} />
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Blog;
