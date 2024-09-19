import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Typography, TextField, Button, Skeleton } from "@mui/material";
import '../App.css';
import ColorToggleButton from '../components/Toggel';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import BasicPagination from '../components/pagination';
import { useNavigate } from 'react-router-dom';
import HorizontalCard from '../components/HorizontalCard';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [alignment, setAlignment] = useState(true); 
  const [page, setPage] = useState(0);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [BlogCount, setBlogCount] = useState(""); // State for date input
  const [loading, setLoading] = useState(true); // State for loading indicator
  const pageSize = 18;
  const navigate = useNavigate();

  const fetchBlogs = async (pageNum, latest, searchTerm) => {
    
    try {
      setLoading(true); // Set loading to true when fetching data
      const response = await axios.post(
        'https://web-production-8d9c.up.railway.app/blogs',
        {
          limit: pageSize,
          skip: pageNum * pageSize,
          latest: latest,
          words: searchTerm,
          
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.data['blogs'].length === 0) {
        setBlogs([]);
        setBlogCount(response.data['count']);
      
      } else{
        
        setBlogs(response.data['blogs']);
        setBlogCount(response.data['count']);
      }
      setLoading(false); // Set loading to false after data is fetched
    } catch (err) {
      setError('Failed to fetch blogs');
      setLoading(false); // Ensure loading is false even if there's an error
    }
  };

  useEffect(() => {
    fetchBlogs(page, alignment, searchTerm); // Include date in fetch
  }, [page, alignment, searchTerm]);

  const handleToggleChange = (newValue) => {
    setAlignment(newValue);
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
      {/* <main>
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
      </main> */}
      

      {error && <p>{error}</p>}
      
      <Container sx={{ height: "100vh", paddingBottom:"10px" ,justifyContent:"center"}}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src="https://substackcdn.com/image/fetch/w_1360,c_limit,f_webp,q_auto:best,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc6c8bc6f-62eb-4e68-8186-152b6e8a7e32_500x500.png" alt="Hero"
        style={{ 
          width: '30%', 
          height: 'auto', 
          // maxWidth: '150px', // Set maximum width for the image
          // maxHeight: '50px' // Set maximum height for the image
        }} />
        {/* <h1>THAT BUSINESS OF MEANING</h1> */}
      </Box>

      <Box sx={{ display: 'flex',alignItems: 'center', justifyContent:"center"}}>
      {/* <img src="https://substackcdn.com/image/fetch/w_1360,c_limit,f_webp,q_auto:best,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc6c8bc6f-62eb-4e68-8186-152b6e8a7e32_500x500.png" alt="Hero" />  */}
      
      <Typography variant='h3' color="#5F8BB0">THAT BUSINESS OF MEANING</Typography>
      </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            flexWrap: 'wrap'
          }}
        >
          <TextField
            variant="outlined"
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              flex: '1 1 auto', 
              marginBottom: 0,
              paddingRight:'10px'
            }}
          />
          <Typography gutterBottom sx={{marginRight:1}}>DATE</Typography>
          <ColorToggleButton alignment={alignment} onToggleChange={handleToggleChange} />
        </Box>
        
        <ul className="no-bullets">
          {loading ? (
            // Display skeletons while loading
            Array.from(new Array(pageSize)).map((_, index) => (
              <li key={index}>
                <Skeleton variant="rectangular" height={100} sx={{ marginBottom: 2 }} />
              </li>
            ))
          ) : (
            // Display actual blog cards once loading is done
            blogs.map(blog => (
              <li key={blog.blog_id} onClick={() => handleCardClick(blog.blog_id)}>
                <HorizontalCard 
                  title={blog.Title} 
                  description={blog.description} 
                  image={blog.img_src} 
                  date={blog.date} 
                />
              </li>
            ))
          )}
        </ul>
        
      
        <Box sx={{display:"flex", alignContent:"center", justifyContent:"center", paddingTop:"10px"}}>
        <BasicPagination 
          count={Math.ceil(BlogCount/pageSize)} 
          page={page + 1} 
          onChange={(_, newPage) => {
            console.log(page)
            if (newPage !== null) {
              setPage(newPage - 1); 
            }
          }}
        />  
        </Box>
      </Container>
    </div>
  );
};

export default Blogs;
