import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SurveyDashboard from './components/survey/SurveyDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<SurveyDashboard />} />
        <Route path="/survey" element={<SurveyDashboard />} />
        <Route path="/" element={<SurveyDashboard />} />
      </Routes>
    </Router>
  );
}

export default App; 