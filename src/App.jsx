import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import OnboardingWizard from './components/OnboardingWizard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#F2E4CD] to-white">
        <Routes>
          <Route path="/" element={<OnboardingWizard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;