import React, { useState } from 'react';
import {
  Users,
  Clock,
  Calendar,
  Video,
  MessageCircle,
  Globe,
  BookOpen,
  Star,
  Award,
  Mic,
  Camera,
  Volume2,
  CheckCircle,
} from 'lucide-react';

interface LiveSessionData {
  id: number;
  title: string;
  instructor: {
    name: string;
    avatar: string;
    expertise: string;
  };
  time: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  participants: number;
  maxParticipants: number;
  description: string;
  topics: string[];
  language: string;
  image: string;
  rating: number;
  reviews: number;
}

const LiveSession: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const liveSessions: LiveSessionData[] = [
    {
      id: 1,
      title: 'Advanced English Grammar Masterclass',
      instructor: {
        name: 'Dr. Linda Smith',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        expertise: 'PhD in English Literature',
      },
      time: 'March 20, 2024 - 3:00 PM',
      duration: '90 minutes',
      level: 'Advanced',
      participants: 28,
      maxParticipants: 30,
      description: 'Master complex grammar structures and enhance your writing skills in this interactive session.',
      topics: ['Perfect Tenses', 'Conditional Clauses', 'Academic Writing'],
      language: 'English',
      image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
      rating: 4.9,
      reviews: 128,
    },
    {
      id: 2,
      title: 'Business English Communication',
      instructor: {
        name: 'Prof. James Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        expertise: 'Business Communication Expert',
      },
      time: 'March 22, 2024 - 4:00 PM',
      duration: '60 minutes',
      level: 'Intermediate',
      participants: 15,
      maxParticipants: 25,
      description: 'Learn essential business English skills for professional success.',
      topics: ['Email Writing', 'Presentation Skills', 'Negotiation'],
      language: 'English',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
      rating: 4.8,
      reviews: 95,
    },
    {
      id: 3,
      title: 'English Pronunciation Workshop',
      instructor: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        expertise: 'Speech Pathologist',
      },
      time: 'March 23, 2024 - 2:00 PM',
      duration: '45 minutes',
      level: 'Beginner',
      participants: 20,
      maxParticipants: 20,
      description: 'Perfect your English pronunciation with interactive exercises.',
      topics: ['Vowel Sounds', 'Consonant Clusters', 'Intonation'],
      language: 'English',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
      rating: 4.7,
      reviews: 82,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-[400px] rounded-2xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80"
          alt="Live Session Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-900/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Interactive Live English Sessions
            </h1>
            <p className="text-xl mb-8">
              Join expert instructors and fellow learners in real-time interactive
              classes designed to enhance your English proficiency
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                <Users className="w-5 h-5 mr-2" />
                <span>Small Group Sessions</span>
              </div>
              <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                <Globe className="w-5 h-5 mr-2" />
                <span>Global Community</span>
              </div>
              <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                <Award className="w-5 h-5 mr-2" />
                <span>Expert Instructors</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search sessions..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Session Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {liveSessions.map((session) => (
          <div
            key={session.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={session.image}
                alt={session.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-indigo-600">
                {session.level}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={session.instructor.avatar}
                  alt={session.instructor.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">
                    {session.instructor.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {session.instructor.expertise}
                  </p>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {session.title}
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  {session.time}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  {session.duration}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-2" />
                  {session.participants}/{session.maxParticipants} participants
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(session.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  ({session.reviews} reviews)
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {session.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Live interaction with instructor
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Mic className="w-4 h-4 mr-2 text-green-500" />
                  Speaking practice
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Camera className="w-4 h-4 mr-2 text-green-500" />
                  Video enabled session
                </div>
              </div>

              <button className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
                <Video className="w-4 h-4 mr-2" />
                Join Session
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tips Section */}
      <div className="bg-indigo-50 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-indigo-900 mb-4">
          Tips for a Great Live Session Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Mic className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-indigo-900">
                Test Your Audio
              </h3>
              <p className="text-sm text-indigo-700">
                Ensure your microphone works properly before joining
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Camera className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-indigo-900">
                Check Your Camera
              </h3>
              <p className="text-sm text-indigo-700">
                A working camera enhances interaction
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Volume2 className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-indigo-900">
                Find a Quiet Space
              </h3>
              <p className="text-sm text-indigo-700">
                Minimize background noise for better focus
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSession;