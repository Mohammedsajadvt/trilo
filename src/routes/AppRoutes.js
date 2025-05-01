import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import  Organization  from '../components/Organizations';
import OrganizationForm from '../components/CreateOrganization';
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage/>} />
    <Route path="/organizations" element={<Organization/>} />
    <Route path="/organizations/create" element={<OrganizationForm/>} />
  </Routes>
);

export default AppRoutes;
