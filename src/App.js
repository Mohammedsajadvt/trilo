import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
