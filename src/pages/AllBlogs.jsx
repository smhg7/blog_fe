import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Typography, TextField, Button, Skeleton, Fab } from "@mui/material";
import '../App.css';
import ColorToggleButton from '../components/Toggel';
import BasicPagination from '../components/pagination';
import { useNavigate } from 'react-router-dom';
import HorizontalCard from '../components/HorizontalCard';
import BasicSelect from '../components/yeardropdown';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import Footer from '../components/FooterMenu';
import AddIcon from '@mui/icons-material/Add';


const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [alignment, setAlignment] = useState(true); 
  const [page, setPage] = useState(0);
  const [Year, setYear] =useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [BlogCount, setBlogCount] = useState(""); // State for date input
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [month,setMonths] =useState(null);
  const [week,setWeeks] = useState(null)
  const [tag,setTags] = useState(null)
  const pageSize = 18;
  const navigate = useNavigate();

  const yearList = [
    { value: null, label: 'All Years' },
    { value: 2019, label: 'Year 2019' },
    { value: 2020, label: 'Year 2020' },
    { value: 2021, label: 'Year 2021' },
    { value: 2022, label: 'Year 2022' },
    { value: 2023, label: 'Year 2023' },
    { value: 2024, label: 'Year 2024' },
    { value: 2025, label: 'Year 2025' },
    { value: 2026, label: 'Year 2026' },
    // Add more items as needed
  ];

  const monthList = [
    { value: null, label: 'All Months' },
    { value: "01", label: 'January' },
    { value: "02", label: 'February' },
    { value: "03", label: 'March' },
    { value: "04", label: 'April' },
    { value: "05", label: 'May' },
    { value: "06", label: 'June' },
    { value: "07", label: 'July' },
    { value: "08", label: 'August' },
    { value: "09", label: 'September' },
    { value: "10", label: 'October' },
    { value: "11", label: 'November' },
    { value: "12", label: 'December' },
  ];
  
  const weekList = [
    { value: null, label: 'All Week' },
    { value: 1, label: 'Week 1' },
    { value: 2, label: 'Week 2' },
    { value: 3, label: 'Week 3' },
    { value: 4, label: 'Week 4' },
  ];
  const prompts= tag

  const isTokenValid = () => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('tokenExpiration');

    if (!token || !expirationTime) return false;

    return Date.now() < parseInt(expirationTime, 10);
  };

  const fetchBlogs = async (pageNum, latest, searchTerm, Year, month, week) => {
    
    try {
      setLoading(true); // Set loading to true when fetching data
      const response = await axios.post(
        'https://web-production-8d9c.up.railway.app/blogs',
        {
          limit: pageSize,
          skip: pageNum * pageSize,
          latest: latest,
          words: searchTerm,
          week: week ,
          month:month ,
          year:Year
          
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response.data)
      if (response.data['blogs'].length === 0) {
        setBlogs([]);
        setBlogCount(response.data['count']);
        setTags(response.data['top_tags'])
        
      
      } else{
        
        setBlogs(response.data['blogs']);
        setBlogCount(response.data['count']);
        setTags(response.data['top_tags'])
      }
      console.log("tag=",tag)
      setLoading(false); // Set loading to false after data is fetched
    } catch (err) {
      setError('Failed to fetch blogs');
      setLoading(false); // Ensure loading is false even if there's an error
      console.log(err)
    }
  };

  useEffect(() => {
    fetchBlogs(page, alignment, searchTerm, Year, month, week); // Include date in fetch
  }, [page, alignment, searchTerm, Year, month, week]);

  useEffect(() => {
    const storedTerm = localStorage.getItem('searchTerm') || '';
    setSearchTerm(storedTerm);
  }, []);

  const handleToggleChange = (newValue) => {
    setAlignment(newValue);
    setPage(0);
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
      {/* hero section */}
      <Container sx={{ height: "100vh", paddingBottom:"10px" ,justifyContent:"center"}}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src="https://substackcdn.com/image/fetch/w_1360,c_limit,f_webp,q_auto:best,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc6c8bc6f-62eb-4e68-8186-152b6e8a7e32_500x500.png" alt="Hero"
        style={{ 
          width: '20%', 
          height: 'auto', 
          // maxWidth: '150px', // Set maximum width for the image
          // maxHeight: '50px' // Set maximum height for the image
        }} />
      </Box>

      <Box sx={{ display: 'flex',alignItems: 'center', justifyContent:"center"}}>
      
        <Typography variant='h4' color="#5F8BB0" sx={{textAlign:'center'}}>THAT BUSINESS OF MEANING</Typography>
      </Box>
        {/* search + sort */}
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
            onChange={(e) => {
                setSearchTerm(e.target.value);
                localStorage.setItem('searchTerm', e.target.value);
              }}
            sx={{
              flex: '1 1 auto', 
              marginBottom: 0,
              paddingRight:'10px'
            }}
          />
          
          {/* <Typography gutterBottom sx={{marginRight:1}}>DATE</Typography> */}
          <ColorToggleButton alignment={alignment} onToggleChange={handleToggleChange} />
        </Box>

        {/* tags */}
        <Box sx={{pl:2}}>
        <Box sx={{backgroundColor:'#e8eff4', borderRadius: '8px', padding: "20px 16px", pl:1}}>
          <Typography variant='h6' color="#5F8BB0" sx ={{pl:1}}>Popular Tags</Typography>
            {Array.isArray(tag) && tag.length > 0 ? (
            tag.map((prompt, index) => (
              <Button
                key={index}
                variant="outlined"
                onClick={() => {
                  setSearchTerm(prompt);
                  localStorage.setItem('searchTerm', prompt);
                }}
                sx={{ margin: '5px' }} // Add margin for spacing between buttons
              >
                {prompt}
              </Button>
            ))
            ) : (
              <Box sx={{display:'flex'}}>
              {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} variant="rectangular" width={100} height={40} sx={{ margin: '5px', borderRadius: '8px'  }} />
      ))}
              </Box>
              
          )}
        </Box>
        </Box>

        {/* date sort */}
        {/* search results */}
        <Box
          sx={{
            pt:"15px",
            display: 'flex',
            flexDirection: { xs: 'column-reverse', md: 'row' }, // Reverse order on mobile
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          {searchTerm ? (
            <Typography 
              variant='h5' 
              color="#5F8BB0" 
              sx={{ 
                pt: { xs: 1, md: 2 }, 
                mb: { xs: 2, md: 0 }, 
                width: '100%', 
                pl: { xs: 1, md: 3 } 
              }}
            >
              Search Results: {searchTerm}
            </Typography>
          ) : (
            <Typography 
              variant='h5' 
              color="#5F8BB0" 
              sx={{ 
                pt: { xs: 1, md: 2 }, 
                mb: { xs: 2, md: 0 }, 
                width: '100%', 
                pl: { xs: 1, md: 3 } 
              }}
            >
              Recent Blogs
            </Typography>
          )}

          {/* Date sort - now on top on mobile */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: { xs: 1, md: 0.5 },
              justifyContent: { xs: 'flex-start', md: 'flex-end' }, // Align to start on mobile, end on larger screens
              width: '100%', // Full width on mobile
            }}
          >
            <BasicSelect items={yearList} name="Year" onChange={(selectedYear) => setYear(selectedYear)} />
            <BasicSelect items={monthList} name="Month" onChange={(selectedMonth) => setMonths(selectedMonth)} />
            <BasicSelect items={weekList} name="Week" onChange={(selectedWeek) => setWeeks(selectedWeek)} />
          </Box>
        </Box>

        
        
        <ul className="no-bullets">
            {loading ? (
              // Display skeletons while loading
              Array.from(new Array(pageSize)).map((_, index) => (
                <li key={index}>
                  <Skeleton variant="rectangular" height={100} sx={{ marginBottom: 2 }} />
                </li>
              ))
            ) : blogs.length === 0 ? (
              // Display a message when there are no blogs
              <li>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',  // Center horizontally
                    alignItems: 'center',      // Center vertically
                    // height: '100vh',           // Full viewport height (or adjust as needed)
                  }}
                >
                  <FilterAltOffIcon sx={{ fontSize: 100 }} /> {/* Adjust fontSize to enlarge */}
                </Box>
                <Typography variant="h6" align="center" color="textSecondary" pb={1}>
                  No blogs available for this filter.
                </Typography>
              </li>
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
              window.scrollTo(0, 0);
            }
          }}
        />  
        </Box>
        {isTokenValid() && ( // Only render if the token is present
          <Fab 
            color="primary" 
            aria-label="add" 
            sx={{ position: 'fixed', bottom: 16, right:{ xs: 16,sm: 16, md: 200 }}}
            onClick={() => navigate('/addblog')}
          >
            <AddIcon />
          </Fab>
        )}
        <Footer />
      </Container>
      
    </div>
  );
};

export default Blogs;
