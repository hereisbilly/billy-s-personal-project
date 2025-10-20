// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import all your pages
import StudentDashboard from './pages/StudentDashboard';
import StudentPage from './pages/StudentPage';
import BasketballPastSimplePage from './pages/BasketballPastSimplePage';
import DanendraQuizPage from './pages/DanendraQuizPage';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-100 font-sans text-slate-800">
      <main className="p-4 sm:p-8">
        <Routes>
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/student/:studentId" element={<StudentPage />} />
          <Route path="/student/:studentId/module/basketball-past-simple" element={<BasketballPastSimplePage />} />
          <Route path="/student/:studentId/module/diagnostic-quiz" element={<DanendraQuizPage />} />
        </Routes>

      </main>
      <footer className="text-center p-6 text-slate-500"> 
        <p>&copy; 2025 ESL Interactive Worksheets by Billy Dwi Nugroho</p> 
      </footer>
    </div>
  );
}

export default App;