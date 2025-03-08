import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width:'100vw',
        minHeight: '100vh',
        backgroundColor: '#0f172a',
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            backgroundColor: '#1e293b',
            padding: { xs: 3, sm: 6 },
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '6rem', sm: '10rem' },
              fontWeight: 700,
              color: '#94a3b8',
              marginBottom: 2,
            }}
          >
            404
          </Typography>
          
          <Typography
            variant="h4"
            component="h2"
            sx={{
              color: '#e2e8f0',
              marginBottom: 3,
              fontWeight: 500,
            }}
          >
            Page Not Found
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: '#cbd5e1',
              marginBottom: 4,
              fontSize: '1.1rem',
            }}
          >
            The page you are looking for doesn't exist or has been moved.
          </Typography>
          
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={handleGoHome}
            sx={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '10px 24px',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: '#2563eb',
              },
            }}
          >
            Back to Home
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFoundPage;