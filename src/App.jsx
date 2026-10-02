import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CategoryCard from './components/CategoryCard';
import TestModeSelectorModal from './components/TestModeSelectorModal';
import ExamInterface from './components/ExamInterface';
import ResultSummary from './components/ResultSummary';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ScratchpadModal from './components/ScratchpadModal';
import FormulaDrawer from './components/FormulaDrawer';
import AuthModal from './components/AuthModal';
import AboutUsSection from './components/AboutUsSection';
import BinaryBackground from './components/BinaryBackground';

import { CATEGORIES, QUESTIONS_BANK } from './data/questionsData';
import { 
  Zap, 
  Clock, 
  Brain, 
  Sparkles, 
  BookOpen, 
  Award, 
  Play, 
  CheckCircle,
  TrendingUp,
  Target,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Flame,
  ChevronRight,
  Code2,
  Terminal,
  Activity
} from 'lucide-react';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem('apti_theme') || 'dark');

  // App Navigation View: 'home' | 'practice' | 'about' | 'exam' | 'result' | 'analytics'
  const [activeView, setActiveView] = useState('home');

  // User auth state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('apti_user')) || null;
    } catch (e) {
      return null;
    }
  });
  const [authModalOpen, setAuthModalOpen] = useState(null); // null | 'login' | 'signup'

  // Modals & Drawers
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [testConfigModalOpen, setTestConfigModalOpen] = useState(false);
  const [scratchpadOpen, setScratchpadOpen] = useState(false);
  const [formulasOpen, setFormulasOpen] = useState(false);

  // Test state
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [activeConfig, setActiveConfig] = useState(null);
  const [lastResult, setLastResult] = useState(null);

  // History state
  const [testHistory, setTestHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('apti_test_history')) || [];
    } catch (e) {
      return [];
    }
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('apti_theme', theme);
  }, [theme]);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('apti_user', JSON.stringify(userData));
    setAuthModalOpen(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('apti_user');
  };

  // Handle Category Selection -> Open Selector Modal
  const handleOpenCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setTestConfigModalOpen(true);
  };

  // Start Quick Grand Mock Test (all categories)
  const handleStartGrandMock = () => {
    setSelectedCategoryId('all');
    setTestConfigModalOpen(true);
  };

  // Start Speed Run Test
  const handleStartSpeedRun = () => {
    const subset = [...QUESTIONS_BANK].sort(() => 0.5 - Math.random()).slice(0, 5);
    const config = {
      categoryId: 'all',
      mode: 'speedrun',
      difficulty: 'all',
      questionCount: 5,
      timeLimitMinutes: 5
    };
    setActiveQuestions(subset);
    setActiveConfig(config);
    setActiveView('exam');
  };

  // Configure and Start Test
  const handleStartTest = (config) => {
    setTestConfigModalOpen(false);

    // Filter questions based on category and difficulty
    let filtered = QUESTIONS_BANK;

    if (config.categoryId && config.categoryId !== 'all') {
      filtered = filtered.filter(q => q.category === config.categoryId);
    }

    if (config.difficulty && config.difficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === config.difficulty);
    }

    // Shuffle and pick subset
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    const count = Math.min(config.questionCount || 10, shuffled.length);
    const selected = shuffled.slice(0, count);

    // Fallback if filter returned empty
    const finalQuestions = selected.length > 0 ? selected : QUESTIONS_BANK.slice(0, 10);

    setActiveQuestions(finalQuestions);
    setActiveConfig(config);
    setActiveView('exam');
  };

  // Handle Test Completion
  const handleFinishTest = (resultData) => {
    setLastResult(resultData);

    // Save to history
    const historyItem = {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      questions: resultData.questions,
      answers: resultData.answers,
      config: resultData.config
    };

    const updatedHistory = [historyItem, ...testHistory];
    setTestHistory(updatedHistory);
    localStorage.setItem('apti_test_history', JSON.stringify(updatedHistory));

    setActiveView('result');
  };

  const handleClearHistory = () => {
    setTestHistory([]);
    localStorage.removeItem('apti_test_history');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      {/* Clean Navbar: Home, Practice Quizzes, Dashboard, About Us + Streak & Log In button */}
      <Navbar 
        onNavigate={(view) => setActiveView(view)}
        activeView={activeView}
        currentUser={currentUser}
        onOpenAuthModal={(mode) => setAuthModalOpen(mode)}
        onLogout={handleLogout}
        userStats={{ streak: 1 }}
      />

      {/* Main View Router */}
      <main style={{ flex: 1 }}>
        {/* HOME LANDING VIEW */}
        {activeView === 'home' && (
          <div className="animate-fade-in">
            {/* HERO SECTION (SECTION 1) - CONTAINS BINARY BACKGROUND DOWN TO BOTTOM BORDER */}
            <div style={{
              position: 'relative',
              padding: '4.5rem 1.5rem 4rem',
              borderBottom: '1px solid var(--border-color)',
              overflow: 'hidden',
              background: '#060913'
            }}>
              {/* Crisp Monospace Binary 0 1 Stream Background - Strictly Section 1! */}
              <BinaryBackground />

              {/* Hero Content Overlay */}
              <div style={{
                maxWidth: '1100px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 2,
                textAlign: 'center'
              }}>
                {/* Main Headline */}
                <h1 style={{ 
                  fontSize: '3.6rem', 
                  fontWeight: 800, 
                  letterSpacing: '-1.2px',
                  lineHeight: '1.1',
                  marginBottom: '1rem',
                  color: '#ffffff',
                  maxWidth: '900px',
                  margin: '0 auto 1rem'
                }}>
                  The Smart Aptitude Evaluation Platform
                </h1>

                {/* Sub-headline */}
                <p style={{ 
                  fontSize: '1.25rem', 
                  color: '#94a3b8', 
                  marginBottom: '2rem',
                  lineHeight: '1.6',
                  maxWidth: '700px',
                  margin: '0 auto 2rem',
                  fontWeight: 500
                }}>
                  Test your quantitative logic, reasoning accuracy, speed, and answering power with instant score diagnostics.
                </p>

                {/* Large White Hero CTA Button */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
                  <button 
                    onClick={handleStartGrandMock} 
                    className="btn btn-hero-white"
                  >
                    <Zap size={22} color="#0078d4" fill="#0078d4" />
                    <span>Start Free Quiz Now</span>
                  </button>

                  <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span>Instant Scoring • Step-by-step Solutions • Formula Sheet</span>
                  </div>
                </div>

                {/* Clean App Showcase Preview Window Mockup */}
                <div className="editor-mockup-window" style={{ maxWidth: '960px', margin: '0 auto' }}>
                  {/* Clean Titlebar */}
                  <div className="editor-titlebar">
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
                    </div>

                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e2e8f0', letterSpacing: '0.5px' }}>
                      Interactive Aptitude Quiz Workspace
                    </span>

                    <span className="badge badge-easy" style={{ fontSize: '0.7rem' }}>Live Session</span>
                  </div>

                  {/* Window Content */}
                  <div style={{ padding: '1.5rem', textAlign: 'left', background: '#070a14', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem' }}>
                    <div>
                      <div style={{ color: '#64748b', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
                        // QUESTION 01 [Work & Time - Medium Level]
                      </div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#ffffff', marginBottom: '1rem', lineHeight: '1.5' }}>
                        A can complete a piece of work in 12 days, and B in 18 days. A leaves 3 days before completion. What is the total time taken?
                      </h3>

                      {/* Options Preview */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                        <div style={{ padding: '0.5rem 0.75rem', background: '#12192c', borderRadius: '6px', fontSize: '0.85rem', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.08)' }}>
                          A. 8.4 days
                        </div>
                        <div style={{ padding: '0.5rem 0.75rem', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '6px', fontSize: '0.85rem', color: '#34d399', border: '1px solid #10b981', fontWeight: 700 }}>
                          B. 9 days ✓
                        </div>
                        <div style={{ padding: '0.5rem 0.75rem', background: '#12192c', borderRadius: '6px', fontSize: '0.85rem', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.08)' }}>
                          C. 10 days
                        </div>
                        <div style={{ padding: '0.5rem 0.75rem', background: '#12192c', borderRadius: '6px', fontSize: '0.85rem', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.08)' }}>
                          D. 7.5 days
                        </div>
                      </div>

                      {/* Explanation Snippet */}
                      <div style={{ padding: '0.75rem', background: 'rgba(0, 120, 212, 0.12)', borderLeft: '3px solid #0078d4', borderRadius: '4px', fontSize: '0.8rem', color: '#93c5fd' }}>
                        💡 <strong>Step Breakdown:</strong> Total Work = LCM(12, 18) = 36 units. B works alone last 3 days = 6 units. Remaining 30 units done together at 5 u/day = 6 days. Total = 9 days.
                      </div>
                    </div>

                    {/* Right Panel inside Mockup */}
                    <div style={{ background: '#0e1424', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                        ANSWERING POWER DIAGNOSTICS
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
                          <span style={{ color: '#e2e8f0' }}>Speed Per Question</span>
                          <span style={{ color: '#38bdf8', fontWeight: 700 }}>24s / Q</span>
                        </div>
                        <div style={{ height: '4px', background: '#1e293b', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ width: '82%', height: '100%', background: '#38bdf8' }} />
                        </div>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
                          <span style={{ color: '#e2e8f0' }}>Accuracy Score</span>
                          <span style={{ color: '#34d399', fontWeight: 700 }}>94%</span>
                        </div>
                        <div style={{ height: '4px', background: '#1e293b', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ width: '94%', height: '100%', background: '#10b981' }} />
                        </div>
                      </div>

                      <div style={{ padding: '0.5rem', background: '#141c2e', borderRadius: '6px', fontSize: '0.75rem', color: '#a0aec0', marginTop: '1.25rem' }}>
                        <strong style={{ color: '#ffffff' }}>Answering Power:</strong> 88/100 (Advanced Cognitive Mastery).
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DOMAINS PRACTICE GRID SECTION (Clean solid dark background) */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3.5rem 1.5rem', position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    APTITUDE DOMAINS
                  </span>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Explore Practice Categories</h2>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.5rem'
              }}>
                {CATEGORIES.map(cat => {
                  const count = QUESTIONS_BANK.filter(q => q.category === cat.id).length;
                  return (
                    <CategoryCard 
                      key={cat.id}
                      category={cat}
                      questionCount={count}
                      onSelectCategory={handleOpenCategory}
                    />
                  );
                })}
              </div>

              {/* Quick Formula Drawer Banner */}
              <div 
                className="glass-panel"
                style={{
                  marginTop: '3rem',
                  padding: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  borderLeft: '4px solid #0078d4'
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                    Need a Quick Formula & Concept Refresh?
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                    Access our curated formula cheat sheet for Speed-Distance, Profit & Loss, Work & Time, and Combinatorics.
                  </p>
                </div>
                <button onClick={() => setFormulasOpen(true)} className="btn btn-vscode-blue" style={{ padding: '0.75rem 1.25rem' }}>
                  <BookOpen size={18} />
                  <span>Open Formula Sheet</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PRACTICE QUIZZES VIEW */}
        {activeView === 'practice' && (
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem 1.5rem' }} className="animate-fade-in">
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8' }}>CATALOGUE</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>All Practice Quizzes & Domains</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Choose your category and test mode to begin practicing with real-time feedback.</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}>
              {CATEGORIES.map(cat => {
                const count = QUESTIONS_BANK.filter(q => q.category === cat.id).length;
                return (
                  <CategoryCard 
                    key={cat.id}
                    category={cat}
                    questionCount={count}
                    onSelectCategory={handleOpenCategory}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* ABOUT US VIEW */}
        {activeView === 'about' && (
          <AboutUsSection onStartPractice={handleStartGrandMock} />
        )}

        {/* ACTIVE EXAM VIEW */}
        {activeView === 'exam' && (
          <ExamInterface 
            questions={activeQuestions}
            config={activeConfig}
            onFinishTest={handleFinishTest}
            onOpenScratchpad={() => setScratchpadOpen(true)}
            onOpenFormulas={() => setFormulasOpen(true)}
            soundEnabled={true}
          />
        )}

        {/* TEST RESULT VIEW */}
        {activeView === 'result' && lastResult && (
          <ResultSummary 
            result={lastResult}
            onRetakeTest={() => setActiveView('exam')}
            onGoHome={() => setActiveView('home')}
          />
        )}

        {/* ANALYTICS DASHBOARD VIEW */}
        {activeView === 'analytics' && (
          <AnalyticsDashboard 
            testHistory={testHistory}
            onClearHistory={handleClearHistory}
            onGoHome={() => setActiveView('home')}
          />
        )}
      </main>

      {/* Auth Modal Popup (Log In / Register) */}
      {authModalOpen && (
        <AuthModal 
          initialMode={authModalOpen}
          onClose={() => setAuthModalOpen(null)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Test Mode Configuration Modal */}
      {testConfigModalOpen && (
        <TestModeSelectorModal 
          selectedCategoryId={selectedCategoryId}
          onClose={() => setTestConfigModalOpen(false)}
          onStartTest={handleStartTest}
        />
      )}

      {/* Interactive Scratchpad */}
      {scratchpadOpen && (
        <ScratchpadModal 
          onClose={() => setScratchpadOpen(false)}
        />
      )}

      {/* Formula Cheat Sheet */}
      {formulasOpen && (
        <FormulaDrawer 
          onClose={() => setFormulasOpen(false)}
        />
      )}

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '1.75rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        marginTop: '3rem',
        background: 'var(--bg-secondary)',
        position: 'relative',
        zIndex: 2
      }}>
        <p>© 2026 AptiMaster Pro. Built with React & Vite.</p>
      </footer>
    </div>
  );
}
