import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StudentPage from './pages/StudentPage'; // Use StudentPage
import ModuleLoader from './ModuleLoader';

function App() {
  return (
    <Router>
      <div className="bg-slate-100 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/student/:studentId" element={<StudentPage />} /> {/* Use StudentPage here */}
          <Route path="/lesson/:moduleId" element={<ModuleLoader />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;