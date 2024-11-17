export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student';
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  thumbnail: string;
}

export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
}

export interface Message {
  id: string;
  sender: User;
  content: string;
  timestamp: string;
  type: 'group' | 'private' | 'teacher';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface Schedule {
  id: string;
  courseId: string;
  title: string;
  startTime: string;
  endTime: string;
  platform: 'teams' | 'zoom' | 'meet';
  link: string;
}