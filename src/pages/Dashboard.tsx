import React from 'react';
import DashboardOverview from '../components/DashboardOverview';
import { Calendar, BookOpen, Bell } from 'lucide-react';

export default function Dashboard() {
  const upcomingClasses = [
    {
      id: 1,
      subject: 'Advanced Mathematics',
      time: '09:00 AM',
      instructor: 'Dr. Smith',
      platform: 'Zoom',
    },
    {
      id: 2,
      subject: 'Physics Lab',
      time: '11:30 AM',
      instructor: 'Prof. Johnson',
      platform: 'Teams',
    },
  ];

  const announcements = [
    {
      id: 1,
      title: 'Mid-term Exam Schedule',
      content: 'Mid-term examinations will begin next week. Please check the detailed schedule.',
      date: '2h ago',
    },
    {
      id: 2,
      title: 'New Course Materials',
      content: 'Updated materials for Advanced Mathematics have been uploaded.',
      date: '5h ago',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Welcome back, John!
        </div>
      </div>

      <DashboardOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Classes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Upcoming Classes
            </h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingClasses.map((class_) => (
              <div
                key={class_.id}
                className="flex items-center p-4 bg-gray-50 rounded-lg"
              >
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {class_.subject}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {class_.time} • {class_.instructor}
                  </p>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">
                  Join {class_.platform}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Announcements
            </h2>
            <Bell className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900">
                    {announcement.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {announcement.date}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{announcement.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}