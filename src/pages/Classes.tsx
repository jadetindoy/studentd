import React from 'react';
import { BookOpen, Video, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Classes() {
  const navigate = useNavigate();
  const courses = [
    {
      id: 1,
      title: 'Advanced English',
      instructor: 'Prof. Smith',
      progress: 65,
      thumbnail:
        'https://images.pexels.com/photos/5303581/pexels-photo-5303581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 2,
      title: 'Basic Vocabulary Related to Books',
      instructor: 'Prof. Johnson',
      progress: 45,
      thumbnail:
        'https://images.pexels.com/photos/261859/pexels-photo-261859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 3,
      title: 'Practical and Relatable Vocabulary',
      instructor: 'Prof. Williams',
      progress: 80,
      thumbnail:
        'https://images.pexels.com/photos/221166/pexels-photo-221166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Filter
          </button>

          {/* Live Session Button placed here */}
          <button
            onClick={() => navigate('/live-session')}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Live Session
          </button>

          <button
            onClick={() => navigate('/browse-courses')}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Browse Courses
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="relative h-48">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">
                {course.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{course.instructor}</p>

              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium text-gray-900">
                    {course.progress}%
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => navigate(`/course/${course.id}`)} // Navigate to the course page
                  className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Continue
                </button>
                <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <FileText className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
