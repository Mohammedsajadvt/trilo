import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import  Organization  from '../components/Organizations';
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage/>} />
    <Route path="/organizations" element={<Organization/>} />
  </Routes>
);

export default AppRoutes;
