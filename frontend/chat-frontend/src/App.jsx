import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, Typography, Box } from "@mui/material";
import ChatBox from "./components/ChatBox";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box sx={{ p: 5 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Real-Time Chat
          </Typography>
          <ChatBox />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;

