import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import '../App.css';
import ActionAreaCard from '../components/Card';
import ColorToggleButton from '../components/Toggel';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [alignment, setAlignment] = useState(false); 
  const [page, setPage] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 20;
  const navigate = useNavigate();

  const fetchBlogs = async (pageNum, latest, searchTerm) => {
    try {
      const response = await axios.post(
        'https://web-production-8d9c.up.railway.app/blogs',
        {
          limit: pageSize + pageNum * pageSize,
          skip: pageNum * pageSize,
          latest: latest,
          words: searchTerm
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.data.length === 0) {
        setIsDisabled(true);
      } else if (response.data.length < pageSize) {
        setIsDisabled(true);
        setBlogs(response.data);
      } else {
        setBlogs(response.data);
        if (isDisabled === true) {
          setIsDisabled(false);
        }
      }
    } catch (err) {
      setError('Failed to fetch blogs');
    }
  };

  useEffect(() => {
    fetchBlogs(page, alignment, searchTerm);
  }, [page, alignment, searchTerm]);

  const handleToggleChange = (newValue) => {
    setAlignment(newValue);
    setIsDisabled(false);
    setPage(0);
  };

  const nextButton = () => {
    setPage(prevPage => prevPage + 1);
  };

  const prevButton = () => {
    setPage(prevPage => Math.max(prevPage - 1, 0));
  };

  const handleCardClick = (blog_id) => {
    navigate(`/blog/${blog_id}`); 
  };

  return (
    <div>
      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-image">
              <img src="https://substackcdn.com/image/fetch/w_1360,c_limit,f_webp,q_auto:best,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc6c8bc6f-62eb-4e68-8186-152b6e8a7e32_500x500.png" alt="Hero" /> 
            </div>
            <div className="hero-text">
              <h1>THAT BUSINESS OF MEANING</h1>
              <a href="tel:1234567890" className="call-now">Call Now</a>
            </div>
          </div>
        </section>
      </main>

      {error && <p>{error}</p>}
      
      <Container sx={{ height: "100vh" }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2, // Padding around the container
            flexWrap: 'wrap'
          }}
        >
          <TextField
            variant="outlined"
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              flex: '1 1 auto', // Allows the TextField to grow and shrink
              // Prevents the TextField from stretching too much
              marginBottom: 0,
              paddingRight:'10px'
            }}
          />
          <ColorToggleButton alignment={alignment} onToggleChange={handleToggleChange} />
        </Box>
        
        <ul className="no-bullets">
          {blogs.map(blog => (
            <li key={blog.blog_id} onClick={() => handleCardClick(blog.blog_id)}>
              <ActionAreaCard
                title={blog.Title} 
                description={blog.description} 
                image={blog.img_src} 
                date={blog.date} 
              />
            </li>
          ))}
        </ul>
        <Button 
          disabled={page === 0} // Disable when on the first page
          variant="outlined" 
          onClick={prevButton} 
          startIcon={<KeyboardDoubleArrowLeftIcon />}
        >
          Prev
        </Button>
        <Button 
          disabled={isDisabled} 
          variant="outlined" 
          onClick={nextButton} 
          startIcon={<KeyboardDoubleArrowRightIcon />}
        >
          Next
        </Button>
      </Container>
    </div>
  );
};

export default Blogs;
