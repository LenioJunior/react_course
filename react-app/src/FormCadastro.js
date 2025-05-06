import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { FormLabel } from '@mui/material';
import FormGrid from './FormGrid'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function FormCadastro() {

  const[nome, setNome] = React.useState('');
  const[idade, setIdade] = React.useState('');

  const[contador, setContador] = React.useState(0);

  const aoClicar = () => {
    setContador(contador + 1);
  }

  return (
    <Box sx={{ flexGrow: 1, mt: 4, ml: 10, mr: 10 }}>
      <Grid container spacing={2}>
        <FormGrid size={12}>
          <FormLabel label="Label">Nome</FormLabel>          
          <TextField 
            id="outlined-basic" 
            label="Outlined" 
            variant="outlined" 
            value={nome}
            onChange={(e) => { setNome(e.target.value)}} 
          />
        </FormGrid>
        <FormGrid size={12}>
          <FormLabel label="Label">Idade</FormLabel> 
          <TextField 
            id="outlined-basic" 
            label="Outlined" 
            variant="outlined" 
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />
        </FormGrid>
        <FormGrid size={12}>
          <FormLabel>{`Seu nome é: ${nome}. Sua idade é: ${idade}.`}</FormLabel>
        </FormGrid>
        <FormGrid size={1}>
          <Button variant="contained" onClick={aoClicar} endIcon={<SendIcon />}>
            {`Send -> ${contador}`}
          </Button>
        </FormGrid>
      </Grid>
    </Box>
  );
}
