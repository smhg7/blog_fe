import React, { useState } from 'react'
import HorizontalCard from '../components/HorizontalCard'

import { Box, Container, Typography, TextField, Button } from "@mui/material";



const Test = () => {
    
  return (
    <>
        <Container sx={{ height: "100vh" }}>
            <Typography variant='h3'sx={{marginTop:"50px"}}>About Us</Typography>
            <hr></hr>
            <Box>
                <Typography variant='h6'>A weekly newsletter & conversation series from Peter Spear on human understanding...</Typography>
            </Box>
            <hr></hr>
            <Box sx={{ display: 'flex',  justifyContent: 'flex-start' }}>
                <img 
                    src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F606c408d-84e0-47cf-99b1-d263a408706f_619x619.jpeg" 
                    width="291" 
                    height="291" 
                    alt="Descriptive Alt Text"
                    style={{ marginRight: '16px' }} // Add margin for spacing
                />
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}> 
                <Typography variant='h3'>
                    Peter
                </Typography>
                <Typography variant='h6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quas libero illum atque perspiciatis quae recusandae ducimus? Animi ratione recusandae debitis, deleniti, eos dolorum iste et cupiditate pariatur impedit asperiores.</Typography>
                </Box>
                
            </Box>
        </Container>

    </>
    
  )
}

export default Test