import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Schedule from '../pages/Schedule';
import Classes from '../pages/Classes';
import BrowseCourses from '../pages/BrowseCourses';
import Messages from '../pages/Messages';
import Payment from '../pages/Payment';
import Settings from '../pages/Settings';
import Games from '../pages/Games';
import EnglishAssessment from '../pages/EnglishAssessment';
import { Resources } from '../pages/Resources';
import GrammarChallenge from '../pages/GrammarChallenge';
import LiveSession from '../pages/LiveSession';
import CoursePage from '../pages/CoursePage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/classes" element={<Classes />} />
      <Route path="/browse-courses" element={<BrowseCourses />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/Resources" element={<Resources />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/games" element={<Games />} />
      <Route path="/english-assessment" element={<EnglishAssessment />} />
      <Route path="/grammar-challenge" element={<GrammarChallenge />} />
      <Route path="/live-session" element={<LiveSession />} />
      <Route path="/course/:courseId" element={<CoursePage />} />
    </Routes>
  );
}
