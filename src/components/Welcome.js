import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem('users')) || [];
    const user = userData.find(user => user.email === email && user.password === password);
    if (user) {
      console.log('Sign In successful', { email, password });
      navigate('/home');
    } else {
      alert('Invalid credentials or user not found. Please sign up.');
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="welcome-container">
      <div className="welcome-left">
        <h1>Welcome</h1>
        <form onSubmit={handleSignIn}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <a href="#" className="forgot-password">Forgot password?</a>
          <button type="submit" className="signin-button">Sign In</button>
        </form>
      </div>
      <div className="welcome-right">
        <h2>Don't have an account? Please Sign up!</h2>
        <button onClick={handleSignUp} className="signup-button">Sign Up</button>
      </div>
    </div>
  );
};

export default Welcome;
