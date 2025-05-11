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
    <div className="min-h-screen flex items-center justify-center">
      <Hero />
    </div>
  );
}

function Home(): JSX.Element {
  return (
    <div className="form">
      <HeroDemo />
      <div className="login-with">
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