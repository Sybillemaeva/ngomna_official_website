import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<AdminDashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;