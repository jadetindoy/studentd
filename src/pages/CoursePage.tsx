import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  BookOpen,
  MessageCircle,
  Download,
  Share2,
  Bookmark,
  ThumbsUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

interface Chapter {
  id: number;
  title: string;
  duration: string;
  startTime: number;
  completed: boolean;
  resources?: {
    title: string;
    type: 'pdf' | 'doc' | 'video';
    url: string;
  }[];
}

interface Course {
  id: number;
  title: string;
  instructor: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  totalChapters: number;
  completedChapters: number;
  rating: number;
  students: number;
  lastUpdated: string;
  chapters: Chapter[];
  notes: string[];
}

const CoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [playing, setPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [muted, setMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'chapters' | 'notes' | 'resources'>('chapters');
  const [showNoteInput, setShowNoteInput] = useState<boolean>(false);
  const [newNote, setNewNote] = useState<string>('');
  const playerRef = useRef<ReactPlayer>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Sample course data
  const course: Course = {
    id: 1,
    title: 'Advanced English Grammar Mastery',
    instructor: 'Prof. Sarah Anderson',
    description: 'Master advanced English grammar concepts through comprehensive lessons and practical examples.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    duration: '10h 30m',
    totalChapters: 12,
    completedChapters: 5,
    rating: 4.8,
    students: 1234,
    lastUpdated: '2024-03-15',
    chapters: [
      {
        id: 1,
        title: 'Introduction to Advanced Grammar',
        duration: '15:00',
        startTime: 0,
        completed: true,
        resources: [
          { title: 'Lesson Notes', type: 'pdf', url: '/resources/lesson1.pdf' },
          { title: 'Practice Exercises', type: 'doc', url: '/resources/exercises1.doc' },
        ],
      },
      {
        id: 2,
        title: 'Perfect Tenses in Depth',
        duration: '20:30',
        startTime: 900,
        completed: true,
        resources: [
          { title: 'Tenses Chart', type: 'pdf', url: '/resources/tenses.pdf' },
          { title: 'Additional Examples', type: 'video', url: '/resources/examples.mp4' },
        ],
      },
    ],
    notes: [
      'Remember the difference between Present Perfect and Past Perfect',
      'Practice using conditional sentences in daily conversations',
    ],
  };

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    setProgress(state.playedSeconds);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const togglePlay = () => {
    setPlaying(!playing);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    setMuted(value === 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setProgress(time);
    playerRef.current?.seekTo(time);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      course.notes.push(newNote);
      setNewNote('');
      setShowNoteInput(false);
    }
  };

  const calculateProgress = (): number => {
    return (course.completedChapters / course.totalChapters) * 100;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Player Section */}
        <div className="lg:col-span-2 space-y-6">
          <div ref={videoContainerRef} className="relative bg-black rounded-xl overflow-hidden">
            <ReactPlayer
              ref={playerRef}
              url={course.videoUrl}
              width="100%"
              height="100%"
              playing={playing}
              volume={volume}
              muted={muted}
              onProgress={handleProgress}
              onDuration={handleDuration}
              className="aspect-video"
            />

            {/* Custom Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex flex-col space-y-2">
                <input
                  type="range"
                  min={0}
                  max={duration}
                  value={progress}
                  onChange={handleSeek}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-4">
                    <button onClick={togglePlay} className="hover:text-indigo-400">
                      {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>
                    <div className="flex items-center space-x-2">
                      <button onClick={toggleMute}>
                        {muted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.1}
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-20"
                      />
                    </div>
                    <span className="text-sm">
                      {formatTime(progress)} / {formatTime(duration)}
                    </span>
                  </div>
                  <button onClick={toggleFullscreen}>
                    <Maximize className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Course Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {course.duration}
              </span>
              <span className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                {course.totalChapters} chapters
              </span>
              <span className="flex items-center">
                <ThumbsUp className="w-4 h-4 mr-1" />
                {course.rating} rating
              </span>
            </div>
            <p className="text-gray-600 mb-6">{course.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
                <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700">
                  <Bookmark className="w-5 h-5" />
                  <span>Save</span>
                </button>
              </div>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Continue Learning
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Course Completion</span>
                  <span>{calculateProgress()}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${calculateProgress()}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {course.completedChapters} of {course.totalChapters} chapters completed
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="flex border-b">
              <button
                className={`flex-1 py-3 text-sm font-medium ${
                  activeTab === 'chapters'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('chapters')}
              >
                Chapters
              </button>
              <button
                className={`flex-1 py-3 text-sm font-medium ${
                  activeTab === 'notes'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('notes')}
              >
                Notes
              </button>
              <button
                className={`flex-1 py-3 text-sm font-medium ${
                  activeTab === 'resources'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('resources')}
              >
                Resources
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'chapters' && (
                <div className="space-y-4">
                  {course.chapters.map((chapter) => (
                    <div
                      key={chapter.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        {chapter.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-gray-400" />
                        )}
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{chapter.title}</h4>
                          <p className="text-xs text-gray-500">{chapter.duration}</p>
                        </div>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-700">
                        <Play className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-4">
                  {course.notes.map((note, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">{note}</p>
                    </div>
                  ))}
                  {showNoteInput ? (
                    <div className="space-y-2">
                      <textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Type your note here..."
                        className="w-full p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        rows={3}
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setShowNoteInput(false)}
                          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddNote}
                          className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                          Add Note
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowNoteInput(true)}
                      className="w-full p-2 text-sm text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100"
                    >
                      + Add Note
                    </button>
                  )}
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-4">
                  {course.chapters.map((chapter) =>
                    chapter.resources?.map((resource, index) => (
                      <div
                        key={`${chapter.id}-${index}`}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <BookOpen className="w-5 h-5 text-indigo-600" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{resource.title}</h4>
                            <p className="text-xs text-gray-500">Chapter {chapter.id}</p>
                          </div>
                        </div>
                        <button className="text-indigo-600 hover:text-indigo-700">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;