// src/App.jsx

import React, { useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

// ✅ IMPORT STATEMENTS WERE MISSING - THEY ARE NOW RESTORED
import StudentDashboard from './pages/StudentDashboard';
import StudentPage from './pages/StudentPage';
import BasketballPastSimplePage from './pages/BasketballPastSimplePage';
import DanendraQuizPage from './pages/DanendraQuizPage'; 
import K5ReadingWritingPage from './pages/K5ReadingWritingPage';
import K5CountingPage from './pages/K5CountingPage';
import K5ReadingGamePage from './pages/K5ReadingGamePage';
import SulthanQuizPage from './pages/SulthanQuizPage';
import SulthanFutureSimplePage from './pages/SulthanFutureSimplePage';

const Header = () => {
  const params = useParams();
  const studentName = params.studentId ? params.studentId.charAt(0).toUpperCase() + params.studentId.slice(1) : null;

  return (
    <header className="p-8 text-center bg-white shadow-md">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-600 leading-tight py-2">
          Learn English, but way more fun!
        </h1>
        <h2 className="text-slate-600 text-2xl font-semibold">
          {studentName ? `Student: ${studentName}` : 'Billy Dwi Nugroho'}
        </h2>
      </div>
    </header>
  );
};

function App() {
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  const handleFirstInteraction = () => {
    if (!audioUnlocked) {
      const synth = window.speechSynthesis;
      if (synth.getVoices().length === 0) {
        synth.onvoiceschanged = () => {};
      }
      console.log("Audio context unlocked.");
      setAudioUnlocked(true);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-100 font-sans text-slate-800"
      onClick={handleFirstInteraction}
    >
      <Routes>
        <Route path="*" element={<Header />} />
      </Routes>
      
      <main className="p-4 sm:p-8">
        <Routes>
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/student/:studentId" element={<StudentPage />} />
          <Route path="/student/:studentId/module/basketball-past-simple" element={<BasketballPastSimplePage />} />
          <Route path="/student/:studentId/module/diagnostic-quiz" element={<DanendraQuizPage />} />
          <Route path="/student/:studentId/module/k5-reading-writing" element={<K5ReadingWritingPage />} />
          <Route path="/student/:studentId/module/k5-counting" element={<K5CountingPage />} />
          <Route path="/student/:studentId/module/k5-reading-game" element={<K5ReadingGamePage />} />
          <Route path="/student/:studentId/module/sulthan-refreshment" element={<SulthanQuizPage />} />
          <Route path="/student/:studentId/module/sulthan-future-simple" element={<SulthanFutureSimplePage />} />
        </Routes>
      </main>
      <footer className="text-center p-6 text-slate-500"> 
        <p>&copy; 2025 ESL Interactive Worksheets by Billy Dwi Nugroho</p> 
      </footer>
    </div>
  );
}

export default App;