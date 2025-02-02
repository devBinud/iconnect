import React, { useState } from 'react';
import "../login/Login.css";
import logo from '../../assets/logo/logomain.jpeg'; // Ensure the correct path
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (username === 'admin' && password === 'iconnect@2025Admin') {
      localStorage.setItem('userToken', 'authenticated'); // Simulating login
      window.location.href = '/'; // Redirect to dashboard
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <img src={logo} alt="Logo" className="login-logo" />
        <h2>Admin Login</h2>
        {error && <p className="error">{error}</p>}

        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />

        <div className="password-container">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
