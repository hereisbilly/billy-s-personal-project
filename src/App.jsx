// src/App.jsx

import React, { useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

// Import all your pages
import StudentDashboard from './pages/StudentDashboard';
import StudentPage from './pages/StudentPage';
import BasketballPastSimplePage from './pages/BasketballPastSimplePage';
import DanendraQuizPage from './pages/DanendraQuizPage';
import K5ReadingWritingPage from './pages/K5ReadingWritingPage';
import K5CountingPage from './pages/K5CountingPage';
import K5ReadingGamePage from './pages/K5ReadingGamePage';
import SulthanQuizPage from './pages/SulthanQuizPage';
import SulthanFutureSimplePage from './pages/SulthanFutureSimplePage';
// ✅ THE IMPORT NAME AND PATH ARE NOW CORRECTED
import DanendraPastContinuousPage from './pages/DanendraPastContinuousPage';
import RajaPresentSimplePage from './pages/RajaPresentSimplePage';
import DanendraPresentPerfectSimple from './pages/DanendraPresentPerfectSimple';
import FebriPresentLesson from './pages/FebriLessonPage';
import DanendraFutureWillGoingTo from './pages/DanendraFutureWillGoingTo';
import SulthanPresentPerfectSimple from './pages/SulthanPresentPerfectSimple';
import DodiePatronelaTravelLesson from './pages/DodiePatronelaTravelLesson';

const Header = () => {
  const params = useParams();
  const studentName = params.studentId ? params.studentId.charAt(0).toUpperCase() + params.studentId.slice(1) : null;

  return (
    <header className="p-4 sm:p-6 text-center border-b-2 border-slate-200">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl sm:text-4xl font-black text-emerald-500 font-sans uppercase tracking-wider">
          English Lessons
        </h1>
        <h2 className="text-slate-500 text-xl sm:text-2xl font-semibold tracking-wider">
          {studentName ? `Student: ${studentName}` : 'Instructor: Billy'}
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
      className="min-h-screen bg-slate-100 font-sans text-slate-800"
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
          {/* ✅ THE ROUTE PATH IS NOW CORRECTED */}
          <Route path="/student/:studentId/module/danendra-past-continuous" element={<DanendraPastContinuousPage />} />
          <Route path="/student/:studentId/module/raja-present-simple" element={<RajaPresentSimplePage />} />
          <Route path="/student/:studentId/module/danendra-present-perfect-simple" element={<DanendraPresentPerfectSimple />} />
          <Route path="/student/:studentId/module/febri-lesson" element={<FebriPresentLesson />} />
          <Route path="/student/:studentId/module/sulthan-present-perfect-simple" element={<SulthanPresentPerfectSimple />} />
          <Route path="/student/:studentId/module/danendra-future-will-going-to" element={<DanendraFutureWillGoingTo />} />
          <Route path="/student/:studentId/module/dodie-patronela-travel-lesson" element={<DodiePatronelaTravelLesson />} />
          {/* Alias for older/other slug so StudentPage links still work */}
          <Route path="/student/:studentId/module/danendrapresentperfectsimple" element={<DanendraPresentPerfectSimple />} />
        </Routes>
      </main>      <footer className="text-center p-6 text-slate-400 text-xs font-sans tracking-widest">
        <p>&copy; 2025 ESL Interactive Worksheets by Billy Dwi Nugroho</p>
      </footer>
    </div>
  );
}

export default App;