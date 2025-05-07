// Description: Signup page for the chat application. It includes a form for users to create an account with username, email, and password. It also provides options to sign up with Google or Facebook.
// The page is styled using Material-UI and includes error handling for form validation. The form submission is handled using React Hook Form and Axios for API requests. The page is responsive and adapts to different screen sizes.

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Link,
  Grid,
  Paper,
  Divider,
  CircularProgress,
  InputAdornment,
  IconButton,
  useTheme,
  // useMediaQuery
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

// Icons
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', data);
      localStorage.setItem('token', res.data.token);
      navigate('/chat');
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.primary.light}15, ${theme.palette.secondary.light}20)`,
        padding: { xs: 2, md: 4 }
      }}
    >
      <Grid 
        container 
        justifyContent="center" 
        alignItems="center" 
        sx={{ 
          maxWidth: "1200px", 
          margin: "0 auto" 
        }}
      >
        

        {/* Right side - Signup Form */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card 
              elevation={8}
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                maxWidth: { xs: '100%', md: '450px' },
                mx: 'auto',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="700" gutterBottom align="left">
                  Create Account
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom align="left" mb={3}>
                  Fill in your details to get started
                </Typography>

                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <Alert 
                      severity="error"
                      sx={{ 
                        mb: 3, 
                        borderRadius: 2,
                        '& .MuiAlert-icon': {
                          alignItems: 'center'
                        }
                      }}
                    >
                      {errorMsg}
                    </Alert>
                  </motion.div>
                )}

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                  <TextField
                    fullWidth
                    label="Username"
                    margin="normal"
                    {...register('username', { required: 'Username is required' })}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlineIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    margin="normal"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    margin="normal"
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 600,
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={24} sx={{ mr: 1, color: 'white' }} />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowForwardIcon sx={{ ml: 1, fontSize: 20 }} />
                      </>
                    )}
                  </Button>

                  <Divider sx={{ my: 3, color: 'text.secondary', fontSize: '0.875rem' }}>
                    Or sign up with
                  </Divider>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        sx={{
                          py: 1.2,
                          borderRadius: 2,
                          textTransform: 'none',
                          borderColor: 'rgba(0, 0, 0, 0.12)',
                          color: 'text.secondary',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            borderColor: 'rgba(0, 0, 0, 0.2)',
                          }
                        }}
                      >
                        Google
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<FacebookIcon />}
                        sx={{
                          py: 1.2,
                          borderRadius: 2,
                          textTransform: 'none',
                          borderColor: 'rgba(0, 0, 0, 0.12)',
                          color: 'text.secondary',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            borderColor: 'rgba(0, 0, 0, 0.2)',
                          }
                        }}
                      >
                        Facebook
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
              <Box 
                sx={{ 
                  bgcolor: 'rgba(0, 0, 0, 0.02)', 
                  p: 2.5, 
                  textAlign: 'center',
                  borderTop: '1px solid rgba(0, 0, 0, 0.05)' 
                }}
              >
                <Typography variant="body2">
                  Already have an account?{" "}
                  <Link 
                    href="/login" 
                    underline="hover"
                    sx={{ 
                      color: theme.palette.primary.main,
                      fontWeight: 600
                    }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Box>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signup;