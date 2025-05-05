import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './styles.css';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('https://cognitive-tutor.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registration successful!');
        navigate('/login'); // redirect to login page
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      alert('An error occurred. Check console.');
    }
  };

  return (
    <div className="form">
      <h2 className="title">Register</h2>
      <form onSubmit={handleRegister}>
        <input
          className="input"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
        <input
          className="input"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button type="submit" className="button-confirm">Register</button>
      </form>
    </div>
  );
}

export default Register;
