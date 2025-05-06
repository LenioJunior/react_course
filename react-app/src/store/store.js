import { configureStore } from '@reduxjs/toolkit';

// Aqui poderíamos adicionar slices para gerenciar estados específicos, como usuários
// Por exemplo: import userReducer from './userSlice';

export default configureStore({
  reducer: {
    // user: userReducer,
    // Adicione outros reducers conforme necessário
  },
});