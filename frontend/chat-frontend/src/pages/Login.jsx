// Login.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { saveToken } from "../utils/auth";

// MUI Components
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  Link,
  Grid,
  Paper,
  Divider,
  Alert,
  CircularProgress,
  useTheme,
  // useMediaQuery
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      saveToken(res.data.token);

      setTimeout(() => {
        navigate("/chat");
      }, 500);
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
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
        {/* Left side - Branding/Image (hidden on mobile) */}
        {/* {!isMobile && (
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Paper 
                elevation={0}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: '100%',
                  backgroundColor: 'transparent',
                  padding: 4,
                  textAlign: 'center'
                }}
              >
                <Box 
                  
                  sx={{ maxWidth: '80%', mx: 'auto', mb: 4 }}
                />
                <Typography 
                  variant="h4" 
                  color="primary.main" 
                  fontWeight="700" 
                  gutterBottom
                >
                  familYchaT
                </Typography>
                {/* <Typography variant="body1" color="text.secondary">
                  Continue your journey with us. Access your personalized experience and all your saved preferences.
                </Typography> */}
              {/* </Paper>
            </motion.div>
          </Grid>
        )} */} */

        {/* Right side - Login Form */}
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
                  Sign In
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom align="left" mb={3}>
                  Enter your credentials to access your account
                </Typography>

                {errorMessage && (
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
                      {errorMessage}
                    </Alert>
                  </motion.div>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
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
                    margin="normal"
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
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
                      mb: 1,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />

                  <Box display="flex" justifyContent="flex-end" mb={3}>
                    <Link 
                      href="/forgot-password" 
                      variant="body2" 
                      underline="hover"
                      sx={{ 
                        color: theme.palette.primary.main,
                        fontWeight: 500,
                        fontSize: '0.875rem'
                      }}
                    >
                      Forgot password?
                    </Link>
                  </Box>

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
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in 
                        <ArrowForwardIcon sx={{ ml: 1, fontSize: 20 }} />
                      </>
                    )}
                  </Button>

                  <Divider sx={{ my: 3, color: 'text.secondary', fontSize: '0.875rem' }}>
                    Or continue with
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
                  Don&apos;t have an account?{" "}
                  <Link 
                    href="/signup" 
                    underline="hover"
                    sx={{ 
                      color: theme.palette.primary.main,
                      fontWeight: 600
                    }}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}