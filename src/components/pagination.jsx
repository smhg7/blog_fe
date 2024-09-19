import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination({onChange,count}) {
  return (
    <Stack spacing={2}>
      <Pagination count={count} onChange={onChange}/>
    </Stack>
  );
}