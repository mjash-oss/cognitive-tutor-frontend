import React, { useEffect, useState } from 'react';
import './styles.css';

interface LessonResponse {
  message: string;
  puzzle: string;
  answers: string[];
}

const Lesson: React.FC = () => {
  const [puzzle, setPuzzle] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const fetchPuzzle = async () => {
      try {
        const res = await fetch(`https://cognitive-tutor.onrender.com/api/lessons/`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  credentials: 'include', // required for cross-origin with credentials
});
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setMessage(data.message);
        setPuzzle(data.puzzle);
        setCorrectAnswers(data.answers || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else { 
          setError('An unknown error occurred');
      }
    };
    }; 
    fetchPuzzle();
  }, []);

  const checkAnswer = () => {
    const normalized = answer.trim().toLowerCase();
    const isCorrect = correctAnswers.some(ans => ans.trim().toLowerCase() === normalized);
    setFeedback(isCorrect ? '✅ Correct!' : '❌ Try again, click the hint button for a hint.');
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