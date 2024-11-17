import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  MessageCircle,
  Headphones,
  PenTool,
  Brain,
  Trophy,
  Timer,
  Sparkles,
  Gamepad2,
  Search,
  Star,
  Users,
  Clock,
} from 'lucide-react';

export default function Games() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const games = [
    {
      id: 1,
      title: 'Grammar Challenge',
      description:
        'Test your English grammar knowledge with interactive exercises',
      icon: PenTool,
      category: 'Grammar',
      difficulty: 'Intermediate',
      timeEstimate: '15 min',
      thumbnail:
        'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      route: '/grammar-challenge',
      rating: 4.5,
      students: 1200,
      isNew: true,
    },
    // ...more games
  ];

  // Determine the featured game for the Hero Section (e.g., the first new release game)
  const featuredGame = games.find((game) => game.isNew) || games[0];

  // Search and Filter Logic
  const filteredGames = games.filter(
    (game) =>
      (selectedCategory === 'All' || game.category === selectedCategory) &&
      (selectedDifficulty === 'All' ||
        game.difficulty === selectedDifficulty) &&
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle starting the game
  const handleStartGame = (route) => {
    navigate(route);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Learning Games</h1>
        <button
          onClick={() => navigate('/english-assessment')}
          className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 flex items-center"
        >
          <Trophy className="w-4 h-4 mr-2" />
          Test Your English
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 rounded-2xl overflow-hidden">
        <img
          src={featuredGame.thumbnail}
          alt={featuredGame.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-3xl mx-auto px-8 text-white">
            <h1 className="text-4xl font-bold mb-4">{featuredGame.title}</h1>
            <p className="text-lg mb-6">{featuredGame.description}</p>
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span>{featuredGame.rating}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-gray-300 mr-1" />
                <span>{featuredGame.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-300 mr-1" />
                <span>{featuredGame.timeEstimate}</span>
              </div>
            </div>
            <button
              onClick={() => handleStartGame(featuredGame.route)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Start Now
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
            >
              <option value="All">All Categories</option>
              <option value="Grammar">Grammar</option>
              <option value="Vocabulary">Vocabulary</option>
              <option value="Listening">Listening</option>
              {/* Add more categories as needed */}
            </select>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
            >
              <option value="All">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Games List Section */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="bg-white shadow-md rounded-lg p-4 space-y-4 hover:shadow-lg transition-shadow"
          >
            <img
              src={game.thumbnail}
              alt={`${game.title} thumbnail`}
              className="w-full h-40 object-cover rounded-t-md"
            />
            <div className="flex items-center space-x-3">
              <game.icon className="w-6 h-6 text-indigo-600" />
              <h2 className="text-lg font-semibold">{game.title}</h2>
            </div>
            <p className="text-gray-600">{game.description}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{game.category}</span>
              <span>{game.difficulty}</span>
              <span>{game.timeEstimate}</span>
            </div>
            {/* Start Game Button */}
            <button
              onClick={() => handleStartGame(game.route)}
              className="w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Start Game
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
