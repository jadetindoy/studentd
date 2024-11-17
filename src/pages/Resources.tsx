import React, { useState } from 'react';
import { FileText, HelpCircle, Book, Download } from 'lucide-react';

export function Resources() {
  const guides = [
    {
      title: 'Getting Started Guide',
      description: 'Learn the basics of using the platform',
      category: 'Basic',
      type: 'PDF',
    },
    {
      title: 'Teacher Manual',
      description: 'Comprehensive guide for teachers',
      category: 'Advanced',
      type: 'PDF',
    },
    {
      title: 'Student Handbook',
      description: 'Essential information for students',
      category: 'Basic',
      type: 'PDF',
    },
    {
      title: 'Platform Features',
      description: 'Detailed overview of all features',
      category: 'Advanced',
      type: 'PDF',
    },
  ];

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer:
        'You can reset your password by clicking on the "Forgot Password" link on the login page.',
    },
    {
      question: 'How do I enroll in a course?',
      answer:
        'Navigate to the course catalog, select your desired course, and click the "Enroll" button.',
    },
    {
      question: 'How do I contact support?',
      answer:
        'You can reach our support team through the Help Desk or by emailing support@edutech.com',
    },
    {
      question: 'How do I track my progress?',
      answer:
        'Your progress can be viewed in the Dashboard under the "My Progress" section.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Resources & Support
        </h1>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Contact Support
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            <Book className="h-5 w-5 inline-block mr-2 text-blue-600" />
            Platform Guides
          </h2>
          <div className="space-y-4">
            {guides.map((guide, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {guide.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {guide.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded">
                    {guide.category}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            <HelpCircle className="h-5 w-5 inline-block mr-2 text-blue-600" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-sm font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <span className="ml-6 flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-sm text-gray-500">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Need More Help?
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Our support team is available 24/7 to assist you with any
              questions.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-lg hover:bg-blue-50">
              View Knowledge Base
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Open Support Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
