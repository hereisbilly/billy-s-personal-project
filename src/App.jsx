import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentSelectionPage from './pages/StudentSelectionPage';
import StudentLessonPage from './pages/StudentLessonPage';
import ModuleLoader from './ModuleLoader';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentSelectionPage />} />
        <Route path="/student/:studentId" element={<StudentLessonPage />} />
        <Route path="/lesson/:moduleId" element={<ModuleLoader />} />
      </Routes>
    </Router>
  );
}

export default App;