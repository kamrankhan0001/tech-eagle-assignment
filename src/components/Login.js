import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[error, setError] =useState('');
  const navigate = useNavigate();
  

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
        alert("Please fill in all fields");
        return;
      }
      
   
    const mockAuthenticate = (email, password) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      // Check if there is a user with matching email and password
      return users.some((user) => user.email === email && user.password === password);
    };
     // Call mock authentication function
    const authenticated = mockAuthenticate(email, password);
// if successful naviagate to to-do-list page
    if (authenticated) {
      navigate('/todo');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br></br>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br></br>
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
