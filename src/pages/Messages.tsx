import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Users,
  User,
  Search,
  X,
  Edit,
  Trash,
  File,
  Image,
  Smile,
  Send,
  PlusCircle,
  Clock,
  Check,
  CheckCheck,
} from 'lucide-react';

export default function Messages() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [editingMessage, setEditingMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'group',
      name: 'Advanced Math Group',
      lastMessage: 'Does anyone understand the homework?',
      fullMessage:
        "Hey everyone! Does anyone understand the homework due next week? Let's discuss it here.",
      time: '5m ago',
      status: 'delivered',
      unread: 3,
      participants: ['Sarah W.', 'John D.', 'Mike R.', '+5 more'],
      avatar: 'https://ui-avatars.com/api/?name=Advanced+Math+Group&size=48', // Updated avatar
      replies: [],
    },
    {
      id: 2,
      type: 'private',
      name: 'Sarah Wilson',
      lastMessage: 'Thanks for helping with the project!',
      fullMessage:
        'Thanks for helping with the project! I really appreciate your input on the details.',
      time: '30m ago',
      status: 'read',
      unread: 0,
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&size=48', // Updated avatar
      replies: [],
    },
    {
      id: 3,
      type: 'teacher',
      name: 'Dr. Smith',
      lastMessage: 'Office hours are from 2-4pm today',
      fullMessage:
        'Just a reminder that my office hours are from 2-4pm today. Feel free to drop by!',
      time: '2h ago',
      status: 'sent',
      unread: 1,
      avatar: 'https://ui-avatars.com/api/?name=Dr.+Smith&size=48', // Updated avatar
      replies: [],
    },
  ]);

  // Handler for search input
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsLoading(true);
    // Simulate search delay
    setTimeout(() => setIsLoading(false), 500);
  };

  // Handle replying to a message
  const handleReply = () => {
    if (!replyText.trim()) return;

    const newReply = {
      id: Date.now(),
      text: replyText,
      time: 'Just now',
      status: 'sent',
    };

    setMessages(
      messages.map((msg) =>
        msg.id === selectedMessage.id
          ? { ...msg, replies: [...msg.replies, newReply] }
          : msg
      )
    );

    setReplyText('');

    // Simulate message status updates
    setTimeout(() => {
      setMessages(
        messages.map((msg) =>
          msg.id === selectedMessage.id
            ? {
                ...msg,
                replies: msg.replies.map((reply) =>
                  reply.id === newReply.id
                    ? { ...reply, status: 'delivered' }
                    : reply
                ),
              }
            : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages(
        messages.map((msg) =>
          msg.id === selectedMessage.id
            ? {
                ...msg,
                replies: msg.replies.map((reply) =>
                  reply.id === newReply.id
                    ? { ...reply, status: 'read' }
                    : reply
                ),
              }
            : msg
        )
      );
    }, 2000);
  };

  // Start editing a reply
  const startEditing = (reply) => {
    setEditingMessage(reply);
  };

  // Cancel editing mode
  const cancelEditing = () => {
    setEditingMessage(null);
  };

  // Save edited message
  const handleEditMessage = () => {
    if (!editingMessage.text.trim()) return;

    setMessages(
      messages.map((msg) =>
        msg.id === selectedMessage.id
          ? {
              ...msg,
              replies: msg.replies.map((reply) =>
                reply.id === editingMessage.id
                  ? { ...reply, text: editingMessage.text }
                  : reply
              ),
            }
          : msg
      )
    );
    setEditingMessage(null);
  };

  const MessageStatus = ({ status }) => {
    switch (status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full bg-white">
      {/* Left Sidebar - Message List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
            <button
              onClick={() => setIsCreating(true)}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search messages..."
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-500 border-t-transparent" />
              </div>
            )}
          </div>

          <div className="flex mt-4 space-x-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'groups'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Groups
            </button>
            <button
              onClick={() => setActiveTab('private')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'private'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Private
            </button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {messages
            .filter((msg) => {
              if (activeTab === 'all') return true;
              return msg.type === activeTab;
            })
            .filter((msg) =>
              msg.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((message) => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedMessage?.id === message.id
                    ? 'bg-blue-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={message.avatar}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                    {message.type === 'group' && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                        <Users className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {message.name}
                      </h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {message.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate mt-1">
                      {message.lastMessage}
                    </p>
                    {message.type === 'group' && (
                      <div className="flex items-center mt-1 space-x-1">
                        {message.participants.map((participant, index) => (
                          <span key={index} className="text-xs text-gray-400">
                            {participant}
                            {index < message.participants.length - 1 && '•'}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {message.unread > 0 && (
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-500 rounded-full">
                      {message.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Right Side - Message Content */}
      <div className="flex-1 flex flex-col">
        {selectedMessage ? (
          <>
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedMessage.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      {selectedMessage.name}
                    </h2>
                    {selectedMessage.type === 'group' && (
                      <p className="text-sm text-gray-500">
                        {selectedMessage.participants.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-start space-x-3">
                  <img
                    src={selectedMessage.avatar}
                    alt=""
                    className="w-8 h-8 rounded-full mt-1"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-gray-900">
                        {selectedMessage.fullMessage}
                      </p>
                    </div>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-xs text-gray-500">
                        {selectedMessage.time}
                      </span>
                      <MessageStatus status={selectedMessage.status} />
                    </div>
                  </div>
                </div>
                {selectedMessage.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="flex items-start justify-end space-x-3"
                  >
                    <div className="flex-1 flex justify-end">
                      <div className="max-w-[80%]">
                        {editingMessage?.id === reply.id ? (
                          <textarea
                            value={editingMessage.text}
                            onChange={(e) =>
                              setEditingMessage({
                                ...editingMessage,
                                text: e.target.value,
                              })
                            }
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            rows="3"
                          />
                        ) : (
                          <div className="bg-blue-500 text-white rounded-lg p-3">
                            <p>{reply.text}</p>
                          </div>
                        )}
                        <div className="flex items-center justify-end mt-1 space-x-2">
                          <span className="text-xs text-gray-500">
                            {reply.time}
                          </span>
                          <MessageStatus status={reply.status} />
                          {!editingMessage && (
                            <button onClick={() => startEditing(reply)}>
                              <Edit className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200">
              {editingMessage ? (
                <div className="flex items-end space-x-3">
                  <button
                    onClick={handleEditMessage}
                    className="p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-end space-x-3">
                  <div className="flex-1">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your message..."
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows="3"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                      <Smile className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                      <File className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                      <Image className="w-5 h-5" />
                    </button>{' '}
                    <button
                      onClick={handleReply}
                      disabled={!replyText.trim()}
                      className={`p-2 rounded-lg ${
                        replyText.trim()
                          ? 'text-white bg-blue-500 hover:bg-blue-600'
                          : 'text-gray-400 bg-gray-100'
                      }`}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            {/* Your existing empty state UI */}
          </div>
        )}
      </div>
    </div>
  );
}
