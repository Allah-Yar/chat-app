// import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import ChatBox from './pages/ChatBox';
// import Navbar from "./components/Navbar";
// import PrivateRoute from "./routes/PrivateRoute";
// import { isLoggedIn } from "./utils/auth";

// const theme = createTheme({
//   palette: {
//     background: {
//       default: '#6a1b9a' // this will apply everywhere
//     }
//   }
// });

// const App = () => (
//   <ThemeProvider theme={theme}>
//     <CssBaseline />
    
//   <Router>
//     <Routes>
//       <Route path="/" element={isLoggedIn() ? <Navigate to="/chat" /> : <Login />} />
//       <Route path="/login" element={<Login />} /> 
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/chat" element={
//         <PrivateRoute>
//           <Navbar />
//           <ChatBox />
          
//           {/* <UsersBar /> */}
          
//         </PrivateRoute>
//       } />
//     </Routes>
//   </Router>
//   </ThemeProvider>
// );

// export default App;

import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChatBox from './pages/ChatBox';
import Navbar from "./components/Navbar";
import PrivateRoute from "./routes/PrivateRoute";
import { isLoggedIn } from "./utils/auth";

// Import or create the ColorModeContext
export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
  mode: 'light'
});

const App = () => {
  // Add state for theme mode
  const [mode, setMode] = useState('light');
  
  // Create the color mode toggle context
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  // Create theme based on mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#9c27b0',
            light: '#d05ce3',
            dark: '#6a0080',
          },
          secondary: {
            main: '#7b1fa2',
            light: '#ae52d4',
            dark: '#4a0072',
          },
          background: {
            default: mode === 'dark' ? '#121212' : '#6a1b9a',
            paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
          },
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        <Router>
          <Routes>
            <Route path="/" element={isLoggedIn() ? <Navigate to="/chat" /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/chat" 
              element={
                <PrivateRoute>
                  <Navbar />
                  <ChatBox />
                  {/* <UsersBar /> */}
                </PrivateRoute>
              } 
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;