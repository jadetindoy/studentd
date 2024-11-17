import React from 'react';
import { BookOpen, Clock, Calendar, Award } from 'lucide-react';

const stats = [
  { icon: BookOpen, label: 'Active Courses', value: '6' },
  { icon: Clock, label: 'Study Hours', value: '24h' },
  { icon: Calendar, label: 'Assignments Due', value: '3' },
  { icon: Award, label: 'Average Grade', value: 'A-' },
];

export default function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Icon className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}