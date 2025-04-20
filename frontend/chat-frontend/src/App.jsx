// import React from "react";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import { Container, Typography, Box } from "@mui/material";
// import ChatBox from "./pages/ChatBox";

// const theme = createTheme();

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <Container maxWidth="sm">
//         <Box sx={{ p: 5 }}>
//           <Typography variant="h4" component="h1" gutterBottom>
//             Real-Time Chat
//           </Typography>
//           <ChatBox />
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import ChatBox from "./pages/ChatBox";
// import { isLoggedIn } from "./utils/auth";
// import PrivateRoute from "./routes/PrivateRoute";

// const App = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={isLoggedIn() ? <Navigate to="/chat" /> : <Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/chat" element={isLoggedIn() ? <PrivateRoute><ChatBox /></PrivateRoute> : <Navigate to="/" />} />
//     </Routes>
//   </Router>
// );

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChatBox from "./pages/ChatBox";
import PrivateRoute from "./routes/PrivateRoute";
import { isLoggedIn } from "./utils/auth";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={isLoggedIn() ? <Navigate to="/chat" /> : <Login />} />
      <Route path="/login" element={<Login />} />  {/* ✅ Add this */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={
        <PrivateRoute>
          <ChatBox />
        </PrivateRoute>
      } />
    </Routes>
  </Router>
);

export default App;

