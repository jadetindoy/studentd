import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Star,
  Clock,
  Users,
  BookOpen,
  ChevronDown,
  Tag,
  DollarSign,
  Award,
  CheckCircle,
  AlertCircle,
  Heart,
  Share2,
  PlayCircle,
  BarChart,
  Calendar,
  Globe,
} from 'lucide-react';

interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  level: string;
  category: string;
  price: number;
  thumbnail: string;
  description: string;
  language: string;
  lastUpdated: string;
  topics: string[];
  skills: string[];
  prerequisites: string[];
  certification: boolean;
  discount?: {
    percentage: number;
    endDate: string;
  };
  features: string[];
  isFavorite: boolean;
}

export default function BrowseCourses() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [favorites, setFavorites] = useState<number[]>([]);

  const featuredCourse = {
    id: 'featured',
    title: 'English Essentials: Building Confidence in Speaking and Writing',
    instructor: 'Prof. Sarah Anderson',
    rating: 4.9,
    students: 15420,
    duration: '12 weeks',
    level: 'Advanced',
    thumbnail:
      'https://images.pexels.com/photos/5428260/pexels-photo-5428260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description:
      'Improve your speaking and writing skills with key phrases and sentence structures for clear communication.',
    features: ['Live Sessions', 'Certificate', '24/7 Support', 'Projects'],
  };

  const courses: Course[] = [
    {
      id: 1,
      title: 'Unlocking English Grammar',
      instructor: 'John Smith',
      rating: 4.8,
      students: 12340,
      duration: '8 weeks',
      level: 'Beginner',
      category: 'Grammar',
      price: 49.99,
      thumbnail:
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Master English grammar from basics to advanced concepts.',
      language: 'English',
      lastUpdated: '2024-03-01',
      topics: ['Tenses', 'Articles', 'Prepositions'],
      skills: ['Writing', 'Grammar Usage'],
      prerequisites: ['Basic English knowledge'],
      certification: true,
      features: ['Quizzes', 'Practice Exercises', 'Video Lessons'],
      isFavorite: false,
    },
    {
      id: 2,
      title: 'English Vocabulary for Everyday Conversations',
      instructor: 'Emily Chen',
      rating: 4.7,
      students: 8920,
      duration: '10 weeks',
      level: 'Intermediate',
      category: 'Speaking',
      price: 59.99,
      thumbnail:
        'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Expand your vocabulary for natural conversations.',
      language: 'English',
      lastUpdated: '2024-02-15',
      topics: ['Daily Conversations', 'Idioms', 'Phrasal Verbs'],
      skills: ['Speaking', 'Listening'],
      prerequisites: [],
      certification: true,
      discount: {
        percentage: 20,
        endDate: '2024-04-01',
      },
      features: ['Live Practice Sessions', 'Native Speaker Interactions'],
      isFavorite: false,
    },
    {
      id: 3,
      title: 'Business English Mastery',
      instructor: 'Michael Brown',
      rating: 4.9,
      students: 6780,
      duration: '12 weeks',
      level: 'Advanced',
      category: 'Business',
      price: 79.99,
      thumbnail:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Professional English for business communication.',
      language: 'English',
      lastUpdated: '2024-03-10',
      topics: ['Business Writing', 'Presentations', 'Negotiations'],
      skills: ['Business Communication', 'Professional Writing'],
      prerequisites: ['Intermediate English Level'],
      certification: true,
      features: ['Real-world Projects', 'Industry Expert Sessions'],
      isFavorite: false,
    },
  ];

  const handleEnroll = (courseId: number | string) => {
    // Here you could add logic to handle enrollment (e.g., API call)
    console.log(`Enrolling in course ${courseId}`);
    navigate(`/course/${courseId}`);
  };

  const toggleFavorite = (courseId: number) => {
    setFavorites(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const formatPrice = (price: number, discount?: { percentage: number }) => {
    if (discount) {
      const discountedPrice = price * (1 - discount.percentage / 100);
      return (
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-900">
            ${discountedPrice.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500 line-through">${price}</span>
          <span className="text-sm text-green-600">
            {discount.percentage}% off
          </span>
        </div>
      );
    }
    return <span className="text-lg font-bold text-gray-900">${price}</span>;
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-96 rounded-2xl overflow-hidden">
        <img
          src={featuredCourse.thumbnail}
          alt={featuredCourse.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-3xl mx-auto px-8 text-white">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-medium">Featured Course</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{featuredCourse.title}</h1>
            <p className="text-lg mb-6">{featuredCourse.description}</p>
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span>{featuredCourse.rating}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-gray-300 mr-1" />
                <span>{featuredCourse.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-300 mr-1" />
                <span>{featuredCourse.duration}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleEnroll('featured')}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Enroll Now
              </button>
              <button className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
                Preview Course
              </button>
            </div>
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
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            <ChevronDown className={`w-4 h-4 ml-2 transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
            >
              <option value="all">All Categories</option>
              <option value="grammar">Grammar</option>
              <option value="speaking">Speaking</option>
              <option value="business">Business English</option>
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
            >
              <option value="all">Any Duration</option>
              <option value="short">0-4 weeks</option>
              <option value="medium">5-8 weeks</option>
              <option value="long">9+ weeks</option>
            </select>

            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
            >
              <option value="all">All Prices</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
              <option value="discounted">On Discount</option>
            </select>

            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
            >
              <option value="all">All Languages</option>
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        )}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => toggleFavorite(course.id)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(course.id)
                        ? 'text-red-500 fill-current'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="absolute top-4 left-4 px-2 py-1 bg-white rounded-lg text-sm font-medium">
                {course.level}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">
                  {course.category}
                </span>
                {course.certification && (
                  <div className="flex items-center text-green-600">
                    <Award className="w-4 h-4 mr-1" />
                    <span className="text-sm">Certificate</span>
                  </div>
                )}
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {course.title}
              </h3>

              <div className="flex items-center mb-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${course.instructor}&size=32`}
                  alt={course.instructor}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-sm text-gray-500">{course.instructor}</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{course.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">
                    ({course.students.toLocaleString()})
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.duration}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                {formatPrice(course.price, course.discount)}
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  Last updated: {course.lastUpdated}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {course.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleEnroll(course.id)}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Enroll Now
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <PlayCircle className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}