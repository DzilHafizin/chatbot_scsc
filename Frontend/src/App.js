import React from 'react';
import './App.css';
// import Header from './components/Header';
import Update from './components/Update';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import { Routes, Route } from 'react-router-dom'

function App () {
  return (
    <React.Fragment>
      {/* <header>
        <Header />
      </header> */}
      
      {/* <main> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      {/* </main> */}
      
    </React.Fragment>
  );
}

export default App;
