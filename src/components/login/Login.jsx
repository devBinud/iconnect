import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Static credentials
    const validUsername = 'iConnect';
    const validPassword = 'admin@2025Iconnect';

    if (username === validUsername && password === validPassword) {
      onLogin(); // Call the login handler passed via props
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="main-panel d-flex align-items-center justify-content-center vh-100">
      <div className="content-wrapper w-100">
        <div className="row justify-content-center">
          <div className="col-lg-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title text-left">Login</h4>
                <p className="card-description text-left">
                  Enter your credentials to access the dashboard
                </p>
                <form onSubmit={handleLogin} className="forms-sample">
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                  <button type="submit" className="btn btn-primary mr-2">
                    Login
                  </button>
                  <button type="reset" className="btn btn-light">
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
