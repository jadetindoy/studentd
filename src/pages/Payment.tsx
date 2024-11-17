import React from 'react';
import { CreditCard, DollarSign, Clock } from 'lucide-react';

export default function Payment() {
  const transactions = [
    {
      id: 1,
      description: 'Advanced English Grammar Course - Premium Access',
      amount: 199.99,
      date: '2024-03-15',
      status: 'completed',
    },
    {
      id: 2,
      description: 'English Conversation Practice - 1 Hour Session',
      amount: 149.99,
      date: '2024-03-10',
      status: 'completed',
    },
    {
      id: 3,
      description: 'English Vocabulary Mastery - Premium Access',
      amount: 299.99,
      date: '2024-03-01',
      status: 'pending',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Payment & Billing</h1>
        <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
          Add Payment Method
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Payment Methods
          </h2>

          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  •••• •••• •••• 4242
                </p>
                <p className="text-sm text-gray-500">Expires 12/24</p>
              </div>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Edit
              </button>
            </div>
          </div>

          <button className="mt-4 w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">
            Add New Card
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Billing Information
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Plan</span>
              <span className="font-medium text-gray-900">Premium Student</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Billing Cycle</span>
              <span className="font-medium text-gray-900">Monthly</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Next Payment</span>
              <span className="font-medium text-gray-900">April 1, 2024</span>
            </div>
          </div>

          <div className="mt-6">
            <button className="mt-4 w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">
              Change Plan
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Transaction History
          </h2>

          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <div className="flex items-center mt-1">
                      <Clock className="w-4 h-4 text-gray-400 mr-1" />
                      <p className="text-sm text-gray-500">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    ${transaction.amount}
                  </p>
                  <p
                    className={`text-sm ${
                      transaction.status === 'completed'
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    {transaction.status.charAt(0).toUpperCase() +
                      transaction.status.slice(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
