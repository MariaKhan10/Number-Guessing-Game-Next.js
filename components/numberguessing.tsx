"use client"; // Enables client-side rendering for this component

import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NumberGuessingState {
  gameStarted: boolean;
  gameOver: boolean;
  paused: boolean;
  targetNumber: number;
  userGuess: number | string;
  attempts: number;
}

export default function NumberGuessing(): JSX.Element {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<number | string>("");
  const [attempts, setAttempts] = useState<number>(0);

  useEffect(() => {
    if (gameStarted && !paused) {
      const randomNumber: number = Math.floor(Math.random() * 10) + 1;
      setTargetNumber(randomNumber);
    }
  }, [gameStarted, paused]);

  const handleStartGame = (): void => {
    setGameStarted(true);
    setGameOver(false);
    setAttempts(0);
    setPaused(false);
  };

  const handlePauseGame = (): void => {
    setPaused(true);
  };

  const handleResumeGame = (): void => {
    setPaused(false);
  };

  const handleGuess = (): void => {
    if (typeof userGuess === "number" && userGuess === targetNumber) {
      setGameOver(true);
    } else {
      setAttempts(attempts + 1);
    }
  };

  const handleTryAgain = (): void => {
    setGameStarted(false);
    setGameOver(false);
    setUserGuess("");
    setAttempts(0);
  };

  const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserGuess(parseInt(e.target.value));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-teal-400">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg mx-4">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-gray-800 drop-shadow-lg">
          Number Guessing Game
        </h1>
        <p className="text-center text-gray-700 mb-6">
          Try to guess the number between 1 and 10!
        </p>

        {!gameStarted && (
          <div className="flex justify-center mb-6">
            <Button
              onClick={handleStartGame}
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded shadow-lg"
            >
              Start Game
            </Button>
          </div>
        )}

        {gameStarted && !gameOver && (
          <div>
            <div className="flex justify-center mb-4">
              {paused ? (
                <Button
                  onClick={handleResumeGame}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-6 rounded shadow-lg"
                >
                  Resume
                </Button>
              ) : (
                <Button
                  onClick={handlePauseGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded shadow-lg"
                >
                  Pause
                </Button>
              )}
            </div>

            <div className="flex flex-col items-center mb-4">
              <Input
                type="number"
                value={userGuess}
                onChange={handleUserGuessChange}
                className="bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 w-full max-w-xs text-center"
                placeholder="Enter your guess"
              />
              <Button
                onClick={handleGuess}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded mt-4 shadow-lg"
              >
                Guess
              </Button>
            </div>

            <div className="text-center text-gray-800">
              <p>Attempts: {attempts}</p>
            </div>
          </div>
        )}

        {gameOver && (
          <div>
            <div className="text-center mb-4 text-gray-800">
              <h2 className="text-3xl font-bold">Game Over!</h2>
              <p>You guessed the number in {attempts} attempts.</p>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleTryAgain}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded shadow-lg"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
