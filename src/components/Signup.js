import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  // state variables to store form input values and error message
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // initializing useNavigate hook
  const navigate = useNavigate();

  // function to handle signup form submission
  const handleSignup = (e) => {
    e.preventDefault();
  // validate that all fields are filled in  
      if (!username || !email || !password || !confirmPassword) {
        alert("Please fill in all fields");
        return;
      }
    
      const mockRegister = (email, password) => {
    // retrieve existing users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      // add new user to the users array
      users.push({ email, password });
      // save updated users array back to localStorage
      localStorage.setItem('users', JSON.stringify(users));
      // return true to indicate successful registration
      return true;
    };

    // call mock registration function
    const success = mockRegister(email, password);

    if (success) {
       if (password === confirmPassword){
         navigate('/Login');
     }else {
         alert("Passwords don't match");
       }
  };
    
}

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
      <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br></br>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br></br>
        <button type="submit">Signup</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
