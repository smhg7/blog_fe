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
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import NewCard from '../components/NewCard';


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

  const words = [
    'brand',
    'identity',
    'imagination',
    'business',
    'ethnography',
    'future',
    'civic',
    'technology',
    'philosophy',
    'qual',
  ];
  useEffect(() => {
    setTags(words);
  }, []);

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
        // setTags(response.data['top_tags'])
        
      
      } else{
        
        setBlogs(response.data['blogs']);
        setBlogCount(response.data['count']);
        // setTags(response.data['top_tags'])
      }
      // console.log("tag=",tag)
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

  const darkenColor = (color, amount) => {
    let col = color.substring(1); // remove the '#' character
    let num = parseInt(col, 16); // convert to integer
    let r = (num >> 16) - amount; // extract red
    let g = (num >> 8 & 0x00FF) - amount; // extract green
    let b = (num & 0x0000FF) - amount; // extract blue
  
    // Ensure values are within the RGB range
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
  
    return `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)}`; // convert back to hex
  };

  return (
    <div>
     

      {error && <p>{error}</p>}
      {/* hero section */}
      <Container sx={{ height: "100vh", paddingBottom:"10px" ,justifyContent:"center"}}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src="https://substackcdn.com/image/fetch/w_1360,c_limit,f_webp,q_auto:best,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc6c8bc6f-62eb-4e68-8186-152b6e8a7e32_500x500.png" alt="Hero"
        style={{ 
          width: '20%', 
          height: 'auto', 
          padding: '15px'
         
        }} />
      </Box>

      <Box sx={{ display: 'flex',alignItems: 'center', justifyContent:"center", paddingBottom: 2 }}>
      
        <Typography variant='h4' color="black" sx={{textAlign:'center'}}>THAT BUSINESS OF MEANING</Typography>
      </Box>
        {/* search + sort */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pl: 2,
            paddingBottom: 2,
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
          
          <ColorToggleButton alignment={alignment} onToggleChange={handleToggleChange} />
        </Box>
        {/* date */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 , pl:2, paddingBottom: 2, flex:1}}>
            <Box sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, width: '100%'}}>
              <CalendarTodayOutlinedIcon />
              <BasicSelect items={yearList} name="Year" onChange={(selectedYear) => setYear(selectedYear)} sx={{ flex: 1 }}/>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, width: '100%'}}>
              <CalendarMonthOutlinedIcon />
              <BasicSelect items={monthList} name="Month" onChange={(selectedMonth) => setMonths(selectedMonth)} />
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, width: '100%'}}>
              <TodayOutlinedIcon />
              <BasicSelect items={weekList} name="Week" onChange={(selectedWeek) => setWeeks(selectedWeek)} />
            </Box>
            
        </Box>

        {/* tags */}
        <Box sx={{ pl: 2 }}>
          <Box sx={{ backgroundColor: '#f8fbfb', borderRadius: '8px', padding: "20px 16px", pl: 1 }}>
            <Typography variant='h6' color="black" sx={{ pl: 1,fontWeight: 'bold' }}>Popular Tags</Typography>
            {Array.isArray(tag) && tag.length > 0 ? (
              tag.map((prompt, index) => {
                // Define an array of pastel colors
                const pastelColors = ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFB3', '#c0cff0', '#e0ceec'];
                // Get a random pastel color
                const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
                // Get a darker shade of the pastel color for the text
                const textColor = darkenColor(randomColor, 70); // Adjust the amount to control darkness

                return (
                  <Button
                    key={index}
                    variant="contained"
                    onClick={() => {
                      setSearchTerm(prompt);
                      localStorage.setItem('searchTerm', prompt);
                    }}
                    sx={{
                      margin: '5px',
                      boxShadow: 'none',
                      borderRadius: '25px', // Round the corners for pill shape
                      backgroundColor: randomColor, // Set random pastel color
                      color: textColor, // Set text color to the darker shade
                      fontWeight: 'bold', 
                      '&:hover': {
                        backgroundColor: randomColor, // Keep the same color on hover
                        color: textColor, // Maintain text color on hover
                      },
                    }}
                  >
                    {prompt}
                  </Button>
                );
              })
            ) : (
              <Box sx={{ display: 'flex' }}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <Skeleton key={index} variant="rectangular" width={100} height={40} sx={{ margin: '5px', borderRadius: '8px' }} />
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
              color="black" 
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
              color="black" 
              sx={{ 
                pt: { xs: 1, md: 2 }, 
                mb: { xs: 2, md: 0 }, 
                width: '100%', 
                pl: { xs: 1, md: 3 } 
              }}
            >
              Search to get started
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
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FilterAltOffIcon sx={{ fontSize: 100 }} />
              </Box>
              <Typography variant="h6" align="center" color="textSecondary" pb={1}>
                No blogs available for this filter.
              </Typography>
            </li>
          ) : (
            blogs.map(blog => (
              <div key={blog.blog_id}>
                {blog.description.map((desc, index) => (
                  <li key={index}>
                  {/* <li key={index} onClick={() => handleCardClick(blog.blog_id)}></li> */}
                    <NewCard 
                      title={blog.Title} // Ensure this matches your blog data
                      desc={desc} // Pass the individual description
                      date={blog.date}
                    />
                  </li>
                ))}
              </div>
            ))
          )}
        </ul>
        
         
        
      
        <Box sx={{display:"flex", alignContent:"center", justifyContent:"center", paddingTop:"10px"}}>
        {searchTerm && (
          <BasicPagination 
            count={Math.ceil(BlogCount / pageSize)} 
            page={page + 1} 
            onChange={(_, newPage) => {
              console.log(newPage); // Log the new page
              if (newPage !== null) {
                setPage(newPage - 1); 
                window.scrollTo(0, 500);
              }
            }}
          />  
        )}


        
        </Box>
        {isTokenValid() && ( // Only render if the token is present
          <Fab 
            color="primary" 
            aria-label="add" 
            sx={{ position: 'fixed', bottom: 16, right:{ xs: 16,sm: 16, md: 200 }, backgroundColor: 'black'}}
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
