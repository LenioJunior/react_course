import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import UserList from './components/users/UserList';
import UserForm from './components/users/UserForm';
import CssBaseline from '@mui/material/CssBaseline';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<UserList />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/add" element={<UserForm />} />
          <Route path="users/edit/:id" element={<UserForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);