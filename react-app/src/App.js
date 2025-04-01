import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddressForm from './components/AddressForm';
import './App.css';
import AppTheme from './theme/AppTheme'
import ResponsiveAppBar from './components/ResponsiveAppBar'

function App() {

  const handleSave = () => {
    
  };

  return (
    <AppTheme>
    <ResponsiveAppBar />
      <Grid container justifyContent="center">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            maxWidth: { sm: '100%', md: 1000 },
            mt: 3,
          }}
        >          
          <AddressForm />
          <Box
            sx={[
              {
                display: 'flex',
                flexDirection: { xs: 'column-reverse', sm: 'row' },
                alignItems: 'end',
                mt: { xs: 2, sm: 5 },

              },
              {justifyContent: 'flex-end'}
            ]}
          >                    
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{ width: { xs: '100%', sm: 'fit-content' } }}
            >
              Save
            </Button>
          </Box>            
        </Box>           
      </Grid>      
  </AppTheme>
  );
}

export default App;
