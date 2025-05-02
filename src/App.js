import './App.css';
import './styles.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Lesson from './Lesson';
import { useState } from 'react';
import { HandWrittenTitle } from "./hand-writing-text"
import * as React from 'react';

function HandWrittenTitleDemo() {
    return <HandWrittenTitle title="Welcome to Cognitive Tutor!" subtitle="Login / Register for your puzzle of the day" />
}

export { HandWrittenTitleDemo }

function Home() {
  return (
    <div className="form">
      <h2 className="title">Welcome to Cognitive Tutor!</h2>
      <p className="title"><span>Login for your daily puzzle.</span></p>
      <div className="login-with">
        <Link to="/login" className="button-confirm">Login</Link>
        <Link to="/register" className="button-confirm">Register</Link>
      </div>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lesson" element={isLoggedIn ? <Lesson /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/hand-writing-text" element={<HandWrittenTitleDemo />} /> 
      </Routes>
    </Router>
  );
}

export default App;

