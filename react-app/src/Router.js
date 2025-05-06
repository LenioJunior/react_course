import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserList from './components/users/UserList';
import UserForm from './components/users/UserForm';

// Paths
const rootPath = '/';
const usersPath = '/users';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={rootPath} element={<Navigate to={usersPath} />} />
      <Route path={usersPath} element={<UserList />} />
      <Route path={`${usersPath}/add`} element={<UserForm />} />
      <Route path={`${usersPath}/edit/:id`} element={<UserForm />} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
};