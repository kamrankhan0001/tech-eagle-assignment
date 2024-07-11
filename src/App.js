import './App.css';

import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <h1> ToDo Activity List Application</h1>
      <nav>
        <ul>
          
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/todo">ToDo List</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default App;
