import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import ChatBox from "./components/ChatBox/ChatBox";
import Navbar from "./components/Navbar";
import UsersBar from './components/UsersBar';
import PrivateRoute from "./routes/PrivateRoute";
import { isLoggedIn } from "./utils/auth";
// import ChatPage from "./components/ChatPage";

const theme = createTheme({
  palette: {
    background: {
      default: '#6a1b9a' // this will apply everywhere
    }
  }
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    
  <Router>
    <Routes>
      <Route path="/" element={isLoggedIn() ? <Navigate to="/chat" /> : <Login />} />
      <Route path="/login" element={<Login />} />  {/* ✅ Add this */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={
        <PrivateRoute>
          {/* <ChatBox /> */}
          <Navbar />
          <UsersBar />
          
        </PrivateRoute>
      } />
      {/* <Route path="/chatpage" element={
        <PrivateRoute>
          <ChatPage />
        </PrivateRoute>
      } /> */}
    </Routes>
  </Router>
  </ThemeProvider>
);

export default App;

