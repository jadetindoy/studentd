import React, { useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  audio: string;
}

const GrammarChallenge: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null); // Audio object state

  const questions: Question[] = [
    {
      question:
        'Choose the correct word to complete the sentence: I ____ to the store yesterday.',
      options: ['go', 'went', 'going', 'gone'],
      correctAnswer: 'went',
      audio: '/audio/question1.mp3',
    },
    {
      question: 'Choose the correct word: She ____ at the moment.',
      options: ['is working', 'works', 'working', 'work'],
      correctAnswer: 'is working',
      audio: '/audio/question2.mp3',
    },
    {
      question:
        'Choose the correct verb form: They ____ in the park right now.',
      options: ['run', 'are running', 'running', 'ran'],
      correctAnswer: 'are running',
      audio: '/audio/question3.mp3',
    },
    {
      question: 'Choose the correct phrase: I ____ a book right now.',
      options: ['am reading', 'reads', 'read', 'reading'],
      correctAnswer: 'am reading',
      audio: '/audio/question4.mp3',
    },
    {
      question:
        'Choose the correct form of the word: He ____ the guitar every day.',
      options: ['play', 'played', 'playing', 'plays'],
      correctAnswer: 'plays',
      audio: '/audio/question5.mp3',
    },
  ];

  const handleAnswer = (selectedAnswer: string): void => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsModalOpen(true); // Open modal after quiz ends
    }
  };

  const playAudio = (audioPath: string) => {
    try {
      const newAudio = new Audio(audioPath);
      setAudio(newAudio); // Store the audio object in state
      newAudio.play();
      setIsAudioPlaying(true);
      console.log('Audio playing:', audioPath);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const stopAudio = () => {
    if (audio) {
      audio.pause();
      setIsAudioPlaying(false);
      console.log('Audio stopped');
    }
  };

  const handlePlayAudio = () => {
    if (!isAudioPlaying) {
      playAudio(questions[currentQuestionIndex].audio);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentQuestionIndex(0);
    setScore(0); // Reset score for next round if you want to restart
  };

  const getEmojiForScore = () => {
    if (score === questions.length) return '🎉';
    if (score >= questions.length * 0.6) return '😊';
    return '😞';
  };

  // Stop the audio when the component unmounts or when the user navigates away
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      stopAudio();
      // Ensure that the browser gives a prompt if the user is leaving
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup event listener when the component is unmounted
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      stopAudio(); // Make sure audio stops when the component is removed from the DOM
    };
  }, [audio]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Grammar Challenge</h2>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        {isModalOpen ? (
          // Modal for result
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-4">
                Your score is {score} / {questions.length}
              </h3>
              <p className="text-4xl">{getEmojiForScore()}</p>
              <p className="mt-4 text-lg">Good job! Keep practicing!</p>
              <button
                className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          // Quiz content
          <>
            <p className="text-lg font-semibold mb-4">
              {questions[currentQuestionIndex].question}
            </p>

            {/* Play Audio Button */}
            <button
              className="flex items-center space-x-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 mb-4"
              onClick={handlePlayAudio}
            >
              <FaPlay className="text-xl" />
              <span>Play Audio</span>
            </button>

            <div className="space-y-3">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-6 text-center">
        <p className="text-lg">Score: {score}</p>
      </div>
    </div>
  );
};

export default GrammarChallenge;
