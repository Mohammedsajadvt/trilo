import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import  Organization  from '../components/Organizations';
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginForm />} />
    <Route path="/organizations" element={<Organizations/>} />
  </Routes>
);

export default AppRoutes;
