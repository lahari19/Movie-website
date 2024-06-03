import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './Auth/SignUp';
import Home from './Home';
import Welcome from './Welcome';
import '../App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </div>
  );
}

export default App;
