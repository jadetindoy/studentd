import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  FileText,
  Upload,
  Bell,
  Loader,
  Edit,
  X,
  Filter,
  CheckCircle,
  AlertCircle,
  Download,
  RotateCcw,
  ChevronRight,
  BookOpen,
  Video,
  Users,
  Search,
  CalendarDays,
} from 'lucide-react';

interface Assignment {
  id: number;
  title: string;
  courseId: string;
  courseName: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded' | 'late';
  grade?: string;
  feedback?: string;
  documents: { name: string; url: string }[];
}

interface ScheduleItem {
  id: number;
  type: 'class' | 'exam' | 'workshop';
  title: string;
  course: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  platform: string;
  link: string;
  description?: string;
}

export default function Schedule() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'assignments' | 'history'>('upcoming');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data
  const assignments: Assignment[] = [
    {
      id: 1,
      title: 'English Grammar Analysis',
      courseId: 'ENG101',
      courseName: 'Advanced English Grammar',
      dueDate: '2024-03-25',
      status: 'pending',
      documents: [],
    },
    {
      id: 2,
      title: 'Vocabulary Exercise',
      courseId: 'ENG102',
      courseName: 'English Vocabulary',
      dueDate: '2024-03-20',
      status: 'submitted',
      grade: 'A',
      feedback: 'Excellent work! Your vocabulary usage shows great improvement.',
      documents: [
        { name: 'vocabulary_exercise.pdf', url: '/documents/vocab.pdf' },
      ],
    },
  ];

  const scheduleItems: ScheduleItem[] = [
    {
      id: 1,
      type: 'class',
      title: 'Advanced Grammar Session',
      course: 'English Grammar Mastery',
      instructor: 'Dr. Sarah Johnson',
      date: '2024-03-20',
      time: '10:00 AM',
      duration: '1.5 hours',
      platform: 'Zoom',
      link: 'https://zoom.us/j/123456789',
      description: 'Focus on perfect tenses and conditional clauses',
    },
    {
      id: 2,
      type: 'workshop',
      title: 'Pronunciation Workshop',
      course: 'Speaking Skills',
      instructor: 'Prof. Michael Chen',
      date: '2024-03-21',
      time: '2:00 PM',
      duration: '1 hour',
      platform: 'Teams',
      link: 'https://teams.microsoft.com/l/meetup-join/123',
      description: 'Interactive session on English phonetics',
    },
  ];

  const handleUpload = (assignmentId: number) => {
    setSelectedAssignment(assignments.find(a => a.id === assignmentId) || null);
    setShowUploadModal(true);
  };

  const simulateUpload = (files: FileList) => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowUploadModal(false);
            setUploadProgress(0);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'graded':
        return 'text-blue-600 bg-blue-100';
      case 'late':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Calendar View Toggle */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Schedule & Assignments</h1>
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['upcoming', 'assignments', 'history'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === tab
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search schedules and assignments..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
              <option value="graded">Graded</option>
              <option value="late">Late</option>
            </select>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {activeTab === 'upcoming' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Schedule */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h2>
              <div className="space-y-4">
                {scheduleItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {item.type === 'class' ? (
                          <Video className="w-5 h-5 text-indigo-600 mr-2" />
                        ) : (
                          <BookOpen className="w-5 h-5 text-indigo-600 mr-2" />
                        )}
                        <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                      </div>
                      <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                        {item.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">{item.course}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {item.time} ({item.duration})
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-1" />
                        {item.instructor}
                      </div>
                    </div>
                    <div className="mt-4">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100"
                      >
                        Join {item.platform}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Assignment Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Assignments</h2>
              <div className="space-y-4">
                {assignments
                  .filter((assignment) => assignment.status === 'pending')
                  .map((assignment) => (
                    <div
                      key={assignment.id}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-900">
                          {assignment.title}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            assignment.status
                          )}`}
                        >
                          {assignment.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{assignment.courseName}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarDays className="w-4 h-4 mr-1" />
                        Due: {assignment.dueDate}
                      </div>
                      <button
                        onClick={() => handleUpload(assignment.id)}
                        className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                      >
                        Submit Assignment
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'assignments' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="space-y-6">
              {assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {assignment.title}
                      </h3>
                      <p className="text-sm text-gray-500">{assignment.courseName}</p>
                    </div>
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                        assignment.status
                      )}`}
                    >
                      {assignment.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      Due: {assignment.dueDate}
                    </div>
                    {assignment.grade && (
                      <div className="flex items-center text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Grade: {assignment.grade}
                      </div>
                    )}
                  </div>

                  {assignment.feedback && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">{assignment.feedback}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {assignment.documents.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.url}
                          className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          {doc.name}
                        </a>
                      ))}
                    </div>
                    {assignment.status === 'pending' && (
                      <button
                        onClick={() => handleUpload(assignment.id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                      >
                        Submit Assignment
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="space-y-6">
              {assignments
                .filter((a) => a.status === 'graded')
                .map((assignment) => (
                  <div
                    key={assignment.id}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {assignment.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-500">
                          Submitted on {assignment.dueDate}
                        </span>
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                            assignment.status
                          )}`}
                        >
                          {assignment.grade || assignment.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{assignment.courseName}</p>
                    {assignment.feedback && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">{assignment.feedback}</p>
                      </div>
                    )}
                    <div className="flex items-center space-x-4">
                      {assignment.documents.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.url}
                          className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          {doc.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Submit Assignment: {selectedAssignment.title}
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  onChange={(e) => e.target.files && simulateUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs text-gray-400">
                    PDF, DOC, DOCX up to 10MB
                  </span>
                </label>
              </div>
              {uploadProgress > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}