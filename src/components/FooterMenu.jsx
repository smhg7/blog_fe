import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{  py: 10 }}> {/* Increased vertical padding */}
      <Container maxWidth="lg">
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} THAT BUSINESS OF MEANING. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
