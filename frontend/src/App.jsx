import React, { useEffect, useState } from 'react'
import{ BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Home from "./pages/Dashboard/Home"
import Income from "./pages/Dashboard/Income"
import Expense from "./pages/Dashboard/Expense"

import {Toaster} from "react-hot-toast"
import UserProvider from './context/userContext'


function App() {
 
  return (
    <UserProvider>
      <div>
      <Router>
        <Routes>
          <Route path='/' element={<Root/>} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/income" exact element={<Income />} />
          <Route path="/expense" exact element={<Expense />} />

        </Routes>
      </Router>
    </div>
    <Toaster 
      toastOptions={{
        className:"",
        style:{
          fontSize:"13px"
        },
      }}
      />
    </UserProvider>
    
  )
}

export default App

const Root = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};