import React, { useState, useEffect, useRef } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { formatDistanceToNow } from 'date-fns';
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
  Filter,
  Star,
  Pin,
  Archive,
  MoreVertical,
  Phone,
  Video,
  VolumeX,
  Bell,
  Flag,
  Download,
  Paperclip,
  Mic,
  Link2,
  Settings,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';

interface Message {
  id: number;
  type: 'group' | 'private' | 'teacher';
  name: string;
  lastMessage: string;
  fullMessage: string;
  time: string;
  status: 'sent' | 'delivered' | 'read';
  unread: number;
  avatar: string;
  participants?: string[];
  pinned?: boolean;
  archived?: boolean;
  attachments?: { type: string; name: string; url: string }[];
  replies: {
    id: number;
    text: string;
    time: string;
    status: 'sent' | 'delivered' | 'read';
    reactions?: { emoji: string; count: number }[];
  }[];
  isTyping?: boolean;
}

export default function Messages() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [editingMessage, setEditingMessage] = useState<{ id: number; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [pinnedMessages, setPinnedMessages] = useState<number[]>([]);
  const [archivedMessages, setArchivedMessages] = useState<number[]>([]);
  const [showArchived, setShowArchived] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showNotifications, setShowNotifications] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'group',
      name: 'Advanced English Study Group',
      lastMessage: 'Does anyone understand the homework assignment?',
      fullMessage: "Hey everyone! Does anyone understand the homework assignment due next week? I'm having trouble with question 3.",
      time: '5m ago',
      status: 'delivered',
      unread: 3,
      participants: ['Sarah W.', 'John D.', 'Mike R.', '+5 more'],
      avatar: 'https://ui-avatars.com/api/?name=Advanced+English&size=48',
      pinned: true,
      attachments: [
        { type: 'pdf', name: 'Assignment-Guidelines.pdf', url: '/files/guidelines.pdf' },
      ],
      replies: [],
      isTyping: true,
    },
    // ... other messages
  ]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedMessage?.replies]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleReply = () => {
    if (!replyText.trim() || !selectedMessage) return;

    const newReply = {
      id: Date.now(),
      text: replyText,
      time: 'Just now',
      status: 'sent' as const,
      reactions: [],
    };

    setMessages(messages.map(msg =>
      msg.id === selectedMessage.id
        ? { ...msg, replies: [...msg.replies, newReply] }
        : msg
    ));

    setReplyText('');
    simulateMessageStatus(selectedMessage.id, newReply.id);
  };

  const handleEmojiSelect = (emoji: any) => {
    setReplyText(prev => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      // Handle stop recording logic
      setIsRecording(false);
      setRecordingTime(0);
    } else {
      setIsRecording(true);
    }
  };

  const formatRecordingTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const simulateMessageStatus = (messageId: number, replyId: number) => {
    setTimeout(() => {
      setMessages(messages =>
        messages.map(msg =>
          msg.id === messageId
            ? {
                ...msg,
                replies: msg.replies.map(reply =>
                  reply.id === replyId
                    ? { ...reply, status: 'delivered' as const }
                    : reply
                ),
              }
            : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages(messages =>
        messages.map(msg =>
          msg.id === messageId
            ? {
                ...msg,
                replies: msg.replies.map(reply =>
                  reply.id === replyId
                    ? { ...reply, status: 'read' as const }
                    : reply
                ),
              }
            : msg
        )
      );
    }, 2000);
  };

  return (
    <div className="flex h-full bg-white">
      {/* Left Sidebar - Message List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowArchived(!showArchived)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Archive className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsCreating(true)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <PlusCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Search messages..."
            />
          </div>

          <div className="flex mt-4 space-x-2">
            {['all', 'group', 'private', 'teacher'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {messages.map((message) => (
            <div
              key={message.id}
              onClick={() => setSelectedMessage(message)}
              className={`p-4 cursor-pointer transition-colors ${
                selectedMessage?.id === message.id
                  ? 'bg-indigo-50'
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
                    <div className="absolute -bottom-1 -right-1 bg-indigo-500 rounded-full p-1">
                      <Users className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {message.name}
                      </h3>
                      {message.pinned && (
                        <Pin className="w-3 h-3 text-indigo-500" />
                      )}
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {message.time}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-500 truncate">
                      {message.lastMessage}
                    </p>
                    {message.isTyping && (
                      <span className="text-xs text-indigo-600">typing...</span>
                    )}
                  </div>
                  {message.type === 'group' && (
                    <div className="flex items-center mt-1 space-x-1">
                      {message.participants?.map((participant, index) => (
                        <span key={index} className="text-xs text-gray-400">
                          {participant}
                          {index < (message.participants?.length || 0) - 1 && '•'}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {message.unread > 0 && (
                  <span className="flex-shrink-0 inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-indigo-500 rounded-full">
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
                        {selectedMessage.participants?.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsVideoCall(!isVideoCall)}
                    className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
                  >
                    <Video className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Bell className="w-5 h-5" />
                    )}
                  </button>
                  <div className="relative">
                    <button className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex flex-col space-y-4">
                <div className="flex items-start space-x-3">
                  <img
                    src={selectedMessage.avatar}
                    alt=""
                    className="w-8 h-8 rounded-full mt-1"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-gray-900">{selectedMessage.fullMessage}</p>
                      {selectedMessage.attachments?.map((attachment, index) => (
                        <div
                          key={index}
                          className="mt-2 flex items-center space-x-2 text-sm text-indigo-600"
                        >
                          <File className="w-4 h-4" />
                          <span>{attachment.name}</span>
                          <button className="hover:text-indigo-800">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
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
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                            rows={3}
                          />
                        ) : (
                          <div className="bg-indigo-600 text-white rounded-lg p-3">
                            <p>{reply.text}</p>
                          </div>
                        )}
                        <div className="flex items-center justify-end mt-1 space-x-2">
                          <span className="text-xs text-gray-500">
                            {reply.time}
                          </span>
                          <MessageStatus status={reply.status} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messageEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              {selectedFiles.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-100 rounded-lg p-2"
                    >
                      <span className="text-sm text-gray-600 mr-2">
                        {file.name}
                      </span>
                      <button
                        onClick={() =>
                          setSelectedFiles(files =>
                            files.filter((_, i) => i !== index)
                          )
                        }
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                    onChange={handleFileUpload}
                  />
                  <button
                    onClick={toggleRecording}
                    className={`p-2 rounded-lg ${
                      isRecording
                        ? 'text-red-500 bg-red-50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleReply}
                    disabled={!replyText.trim() && selectedFiles.length === 0}
                    className={`p-2 rounded-lg ${
                      replyText.trim() || selectedFiles.length > 0
                        ? 'text-white bg-indigo-600 hover:bg-indigo-700'
                        : 'text-gray-400 bg-gray-100'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {isRecording && (
                <div className="mt-2 flex items-center text-red-500">
                  <span className="animate-pulse mr-2">●</span>
                  <span>Recording: {formatRecordingTime(recordingTime)}</span>
                </div>
              )}

              {showEmojiPicker && (
                <div className="absolute bottom-20 right-4">
                  <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Your Messages
              </h3>
              <p className="text-sm text-gray-500">
                Select a conversation to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const MessageStatus = ({ status }: { status: 'sent' | 'delivered' | 'read' }) => {
  switch (status) {
    case 'sent':
      return <Check className="w-4 h-4 text-gray-400" />;
    case 'delivered':
      return <CheckCheck className="w-4 h-4 text-gray-400" />;
    case 'read':
      return <CheckCheck className="w-4 h-4 text-indigo-500" />;
    default:
      return null;
  }
};