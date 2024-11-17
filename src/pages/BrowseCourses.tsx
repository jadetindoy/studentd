import React, { useState } from 'react';
import { Search, Filter, Star, Clock, Users, BookOpen } from 'lucide-react';

export default function BrowseCourses() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');

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
  };

  const courses = [
    {
      id: 1,
      title: 'Unlocking English Grammar',
      instructor: 'John Smith',
      rating: 4.8,
      students: 12340,
      duration: '8 weeks',
      level: 'Beginner',
      category: 'Programming',
      thumbnail:
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'English Vocabulary for Everyday Conversations',
      instructor: 'Emily Chen',
      rating: 4.7,
      students: 8920,
      duration: '10 weeks',
      level: 'Intermediate',
      category: 'Data Science',
      thumbnail:
        'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'Fluent in English: Tips & Practice',
      instructor: 'Michael Brown',
      rating: 4.6,
      students: 6780,
      duration: '6 weeks',
      level: 'Beginner',
      category: 'Marketing',
      thumbnail:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ];

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
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Enroll Now
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
                placeholder="Search courses..."
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
              <option value="all">All Categories</option>
              <option value="programming">Programming</option>
              <option value="design">Design</option>
              <option value="business">Business</option>
              <option value="marketing">Marketing</option>
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
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg text-sm font-medium">
                {course.level}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {course.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{course.instructor}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-1" />
                  {course.students.toLocaleString()}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.duration}
                </div>
              </div>

              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
