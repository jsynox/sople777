'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const countriesAndCapitals = [
  { country: "Afghanistan", capital: "Kabul" },
  { country: "Albania", capital: "Tirana" },
  // ... (rest of the countries and capitals)
  { country: "Zimbabwe", capital: "Harare" }
];

const GamePage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [triesLeft, setTriesLeft] = useState(5);
  const [answer, setAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [skippedQuestions, setSkippedQuestions] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const shuffledQuestions = [...countriesAndCapitals].sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
  }, []);

  const handleAnswerSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer.toLowerCase().trim() === currentQuestion.capital.toLowerCase()) {
      setCorrectAnswers(correctAnswers + 1);
      nextQuestion();
    } else {
      handleTryAgain();
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTriesLeft(5);
      setAnswer('');
    } else {
      setGameOver(true);
    }
  };

  const handleSkip = () => {
    setSkippedQuestions(skippedQuestions + 1);
    nextQuestion();
  };

  const handleTryAgain = () => {
    if (triesLeft > 1) {
      setTriesLeft(triesLeft - 1);
      setAnswer('');
    } else {
      nextQuestion();
    }
  };

  const resetGame = () => {
    const shuffledQuestions = [...countriesAndCapitals].sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setTriesLeft(5);
    setAnswer('');
    setCorrectAnswers(0);
    setSkippedQuestions(0);
    setGameOver(false);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-gray-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">Capital City Game</CardTitle>
        </CardHeader>
        <CardContent>
          {!gameOver ? (
            <>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Question {currentQuestionIndex + 1}</h2>
              <p className="text-lg mb-4 text-gray-600">Country: <span className="font-bold">{currentQuestion?.country}</span></p>
              <div className="mb-4">
                <Input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter the capital city"
                  className="w-full"
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">Tries Left: {triesLeft}</p>
                <div className="space-x-2">
                  <Button onClick={handleAnswerSubmit} disabled={triesLeft === 0}>
                    Submit
                  </Button>
                  <Button onClick={handleSkip} variant="outline">
                    Skip
                  </Button>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <p>Correct: {correctAnswers}</p>
                <p>Skipped: {skippedQuestions}</p>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Game Over!</h2>
              <p className="text-lg mb-4 text-gray-600">You answered {correctAnswers} questions correctly.</p>
              <Button onClick={resetGame}>Play Again</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GamePage;




