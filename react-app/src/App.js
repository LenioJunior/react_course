import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './App.css';
import AppTheme from './theme/AppTheme';
import ResponsiveAppBar from './components/ResponsiveAppBar';

function App() {
  return (
    <AppTheme>
      <ResponsiveAppBar />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            mt: 3,
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </AppTheme>
  );
}

export default App;