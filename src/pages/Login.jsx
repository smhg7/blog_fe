import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://web-production-8d9c.up.railway.app/login', {
        name,
        password
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.message.token); // Store the token
        setSuccess('Login successful!');
        const expirationTime = new Date().getTime() + 4 * 60 * 60 * 1000;
        localStorage.setItem('tokenExpiration', expirationTime);
        navigate('/addblog'); // Redirect to add blog page
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh', 
          backgroundColor: '#f4f4f4' 
        }}>
        <Paper elevation={3} sx={{ padding: '40px', borderRadius: '10px', width: '300px' }}>
          <Typography variant="h4" align="center" gutterBottom color="#81A3C1">
            Admin Login
          </Typography>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
          {error && <Typography color="error" align="center">{error}</Typography>}
          {success && <Typography color="success" align="center">{success}</Typography>}
          <Button 
            variant="contained" 
            onClick={handleLogin} 
            fullWidth
            sx={{ marginTop: '20px', backgroundColor: '#81A3C1' }}
          >
            Login
          </Button>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
