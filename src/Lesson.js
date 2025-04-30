import React, { useEffect, useState } from 'react';
import './styles.css';

function Lesson() {
  const [puzzle, setPuzzle] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const fetchPuzzle = async () => {
      try {
        const res = await fetch(`https://cognitive-tutor.onrender.com/members?username=${username}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setMessage(data.message);
        setPuzzle(data.puzzle);
        setCorrectAnswers(data.answers || []);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPuzzle();
  }, []);

  const checkAnswer = () => {
    const normalized = answer.trim().toLowerCase();
    const isCorrect = correctAnswers.some(ans => ans.trim().toLowerCase() === normalized);
    setFeedback(isCorrect ? '✅ Correct!' : '❌ Try again.');
  };

  if (error) return <div>Error loading puzzle: {error}</div>;
  if (!puzzle) return <div>Loading puzzle...</div>;

  return (
    <div className="form">
      <h2 className="title">{message}</h2>
      <p className="title"><span>{puzzle}</span></p>
      <input
        className="input"
        placeholder="Your answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button className="button-confirm" onClick={checkAnswer}>Submit</button>
      {feedback && <p className="title"><span>{feedback}</span></p>}
    </div>
  );
}

export default Lesson;