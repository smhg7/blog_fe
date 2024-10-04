import React from 'react';
import { Box } from '@mui/material';


const NewCard = ({ desc, title, date }) => { // Destructure props from an object
  const year = new Date(date).getFullYear(); 
  return (
    <>
      <Box sx={{ pb: 3 }}>
        <Box  dangerouslySetInnerHTML={{ __html: desc }} />
        <p style={{ margin: 0 }} >{title}, {year}</p>
      </Box>
    </>
  );
}

export default NewCard;
