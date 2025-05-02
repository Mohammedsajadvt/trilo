import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import  Organization  from '../components/Organizations';
import OrganizationForm from '../components/CreateOrganization';
import UpdateOrganizationForm from '../components/UpdateOrganization';
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage/>} />
    <Route path="/organizations" element={<Organization/>} />
    <Route path="/organizations/create" element={<OrganizationForm/>} />
    <Route path="/organizations/:id" element={<UpdateOrganizationForm/>} />
  </Routes>
);

export default AppRoutes;
