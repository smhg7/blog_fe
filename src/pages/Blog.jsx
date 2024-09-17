import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import './style.css';

const Blog = () => {

  const [blog, setBlog] = useState(null); 
  const [error, setError] = useState(null);
  const { blog_id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.post(
          'https://web-production-8d9c.up.railway.app/oneblog',
          {
            "blog_id": blog_id
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        setBlog(response.data); // Set the single blog object
      } catch (err) {
        setError('Failed to fetch blog');
      }
    };

    fetchBlog();
  }, [blog_id]);

  return (
    <div>
      {error && <p>{error}</p>}
      <Container sx={{ height: "100vh" }}>
      {blog ? (
        <div sx={{}}>
          <h2>{blog.Title}</h2>
          <p><strong>Author:</strong> {blog.author}</p>
          <p><strong>Date:</strong> {blog.date}</p>
          <p><strong>Subtitle:</strong> {blog['sub title']}</p>
          <div dangerouslySetInnerHTML={{ __html: blog.html }} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
      </Container>
    </div>
  );
};

export default Blog;
