import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentPage from './pages/StudentPage';
import ModuleLoader from './ModuleLoader';
import StudentHomePage from './pages/StudentHomePage';

function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Routes>
          <Route path="/" element={<StudentHomePage />} />
          <Route path="/student/:studentId" element={<StudentPage />} />
          <Route 
            path="/student/:studentId/module/:moduleId" 
            element={<ModuleLoader />} 
          />
          <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;