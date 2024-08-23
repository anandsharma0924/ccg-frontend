import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import axios from 'axios';
import {
  Button,
  TextField,
  Paper,
  Box,
  CircularProgress,
  Backdrop,
  Typography,
} from '@mui/material';

const Login = ({ role }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    let apiUrl = '';
    switch (role) {
      case 'Admin':
        apiUrl = 'http://localhost:5000/api/admin/login';
        break;
      case 'Student':
        apiUrl = 'http://localhost:5000/api/student/login';
        break;
      case 'Teacher':
        apiUrl = 'http://localhost:5000/api/teachers/login';
        break;
      default:
        setLoader(false);
        setErrorMessage('Invalid role');
        return;
    }

    try {
      const response = await axios.post(apiUrl, { email, password });
      console.log(response, 'response');

      // Check if the request was successful and the token is present
      if (response.status === 200 && response.data.token) {
        console.log("Logged in successfully");
        navigate(`/${role}/dashboard`);
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Network error. Please try again later.');
    } finally {
      setLoader(false);
    }
  };


  return (
    <LoginContainer>
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom>
          {role} Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <StyledTextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMessage && (
            <Typography color="error" variant="body2">
              {errorMessage}
            </Typography>
          )}
          <Box mt={2}>
            <StyledButton type="submit" variant="contained" color="primary" fullWidth>
              Login
            </StyledButton>
          </Box>
        </form>
      </StyledPaper>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #411d70, #19118b);
`;

const StyledPaper = styled(Paper)`
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  width: 100%;
  background-color: #1f1f38;
  color: rgba(255, 255, 255, 0.87);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
`;

const StyledTextField = styled(TextField)`
  & label {
    color: rgba(255, 255, 255, 0.6);
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: rgba(255, 255, 255, 0.6);
    }
    &:hover fieldset {
      border-color: white;
    }
  }
  & input {
    color: white;
  }
`;

const StyledButton = styled(Button)`
  background-color: #5c67b5;
  &:hover {
    background-color: #3b45a5;
  }
`;
