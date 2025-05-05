import './App.css';
import './styles.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login.tsx';
import Register from './Register.tsx';
import Lesson from './Lesson.tsx';
import { JSX, useState } from 'react';
import { Hero } from "@/components/ui/animated-hero";

function HeroDemo(): JSX.Element {
  return (
    <div className="block">
      <Hero />
    </div>
  );
}

function Home(): JSX.Element {
  return (
    <div className="form">
      <HeroDemo />
      <h2 className="title">Welcome to Cognitive Tutor!</h2>
      <p className="title">
        <span>Login for your daily puzzle.</span>
      </p>
      <div className="login-with">
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</Link>
        <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded ml-2">Register</Link>
      </div>
    </div>
  );
}

function App(): JSX.Element {
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