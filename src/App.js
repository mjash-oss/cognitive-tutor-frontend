import './App.css';
import './styles.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Lesson from './Lesson';
import { useState } from 'react';
//import Home from './Home';
//import { AuroraBackgroundDemo } from './AuroraBackgroundDemo'; // <--- ADD THIS
/*
function Home() {
  return (
    <div className="App">
      <header class='main-header'></header>
      <h1>Welcome to Cognitive Tutor! Login for your puzzle of the day.</h1>
      <nav>
        <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
        <Link to="/register">Register </Link>
        <Link to="/lesson" style={{ marginRight: '10px' }}>Take a Lesson</Link>
      </nav>
    </div>
  );
}
  */
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
      </Routes>
    </Router>
  );
}

export default App;

