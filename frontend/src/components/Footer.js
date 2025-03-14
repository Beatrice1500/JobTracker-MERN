import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#2d2d2d', 
        color: 'white', 
        p: 3, 
        mt: 'auto',
        textAlign: 'center'
      }}
    >
      <Typography variant="body1">
        © 2024 Job Tracker. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;