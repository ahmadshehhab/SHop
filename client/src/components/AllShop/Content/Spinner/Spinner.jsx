import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './Spinner.css'
export default function CircularIndeterminate() {
  return (
    <Box className='spinner' sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}
