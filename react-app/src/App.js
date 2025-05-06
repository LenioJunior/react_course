import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './App.css';
import AppTheme from './theme/AppTheme'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import FormCadastro from './FormCadastro';

function App() {
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
		  <FormCadastro/>  
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