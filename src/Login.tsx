import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('https://cognitive-tutor.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      setIsLoggedIn(true); // <<< HERE
      const data = await res.json(); 
      localStorage.setItem('username', username); // Save username
      localStorage.setItem('token', data.access_token); 
      navigate('/lesson'); // <<< Move to the lesson page
    } else {
      alert('Login failed.');
    }
  };
  
  return (
    <div className="form">
      <h2 className="title">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="input"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
        <input
          className = "input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button type="submit" className="button-confirm">Login</button>
      </form>
    </div>
  );
};

export default Login;
