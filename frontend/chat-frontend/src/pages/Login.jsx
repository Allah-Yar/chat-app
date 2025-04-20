import {
    Box, Button, TextField, Typography, Container, Link
  } from "@mui/material";
  import { useForm } from "react-hook-form";
  import { useNavigate } from "react-router-dom";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import { useState } from "react";
  import axios from "axios";
  import Spinner from "../components/Spinner";
  import { saveToken } from "../utils/auth";
  
  const schema = yup.object().shape({
    email: yup.string().required("email is required"),
    password: yup.string().min(6).required("Password is required"),
  });
  
  export default function Login() {
    const {
      register, handleSubmit, formState: { errors }
    } = useForm({ resolver: yupResolver(schema) });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const onSubmit = async (data) => {
      setLoading(true);
      try {
        const res = await axios.post("http://localhost:3000/api/auth/login", data);
        saveToken(res.data.token);
        navigate("/chat");
      } catch (err) {
        alert(err.response?.data?.message || "Login failed");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>Sign In</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth label="email" margin="normal"
              {...register("email")} error={!!errors.email}
              helperText={errors.username?.message}
            />
            <TextField
              fullWidth label="Password" type="password" margin="normal"
              {...register("password")} error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
          <Box mt={2}>
            <Link href="/signup" underline="hover">Don't have an account? Sign Up</Link>
          </Box>
          {loading && <Spinner />}
        </Box>
      </Container>
    );
  }
  