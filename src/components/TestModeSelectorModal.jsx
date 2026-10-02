import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  Zap, 
  Sliders, 
  HelpCircle, 
  Play, 
  X,
  Target
} from 'lucide-react';
import { CATEGORIES } from '../data/questionsData';

export default function TestModeSelectorModal({ selectedCategoryId, initialConfig = {}, onClose, onStartTest }) {
  const categoryInfo = CATEGORIES.find(c => c.id === selectedCategoryId) || {
    name: 'All Topics Grand Mock Test',
    description: 'Comprehensive evaluation across Quantitative, Reasoning, Verbal & CS Aptitude.'
  };

  const [mode, setMode] = useState(initialConfig.mode || 'timed'); // 'timed' | 'practice' | 'speedrun'
  const [difficulty, setDifficulty] = useState(initialConfig.difficulty || 'all'); // 'all' | 'Easy' | 'Medium' | 'Hard'
  const [questionCount, setQuestionCount] = useState(initialConfig.questionCount || 10);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(
    initialConfig.timeLimitMinutes !== undefined && initialConfig.timeLimitMinutes !== null
      ? initialConfig.timeLimitMinutes 
      : 15
  );

  const handleStart = () => {
    onStartTest({
      categoryId: selectedCategoryId,
      mode,
      difficulty,
      questionCount: mode === 'speedrun' ? 5 : questionCount,
      timeLimitMinutes: mode === 'practice' ? null : (mode === 'speedrun' ? 5 : timeLimitMinutes)
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in" style={{ maxWidth: '640px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <span className="badge badge-medium" style={{ marginBottom: '0.4rem' }}>Configure Test Session</span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{categoryInfo.name}</h2>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: '0.4rem', borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>

        {/* Mode Selector Options */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.75rem' }}>
            SELECT TEST MODE
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.85rem' }}>
            {/* Timed Mock Test */}
            <div
              onClick={() => setMode('timed')}
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: mode === 'timed' ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-tertiary)',
                border: mode === 'timed' ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
                <Clock size={20} />
                <strong style={{ fontSize: '0.95rem' }}>Timed Mock</strong>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Simulated exam environment with countdown timer and question grid.
              </p>
            </div>

            {/* Practice Mode */}
            <div
              onClick={() => setMode('practice')}
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: mode === 'practice' ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-tertiary)',
                border: mode === 'practice' ? '2px solid var(--accent-success)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-success)', marginBottom: '0.5rem' }}>
                <CheckCircle size={20} />
                <strong style={{ fontSize: '0.95rem' }}>Practice Mode</strong>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                No time limits. Instant step-by-step solutions, hints & formulas.
              </p>
            </div>

            {/* Speed Run */}
            <div
              onClick={() => setMode('speedrun')}
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: mode === 'speedrun' ? 'rgba(236, 72, 153, 0.15)' : 'var(--bg-tertiary)',
                border: mode === 'speedrun' ? '2px solid var(--accent-secondary)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-secondary)', marginBottom: '0.5rem' }}>
                <Zap size={20} />
                <strong style={{ fontSize: '0.95rem' }}>Speed Run</strong>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                5 Rapid questions, 5 minutes. Perfect for quick mental drills.
              </p>
            </div>
          </div>
        </div>

        {/* Configuration Sliders/Selectors */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.75rem' }}>
          {/* Difficulty */}
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
              DIFFICULTY LEVEL
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                outline: 'none',
                fontWeight: 600
              }}
            >
              <option value="all">All Difficulties (Balanced)</option>
              <option value="Easy">Easy Level</option>
              <option value="Medium">Medium Level</option>
              <option value="Hard">Hard Level</option>
            </select>
          </div>

          {/* Question Count */}
          {mode !== 'speedrun' && (
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
                QUESTIONS COUNT
              </label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  outline: 'none',
                  fontWeight: 600
                }}
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
                <option value={20}>20 Questions</option>
              </select>
            </div>
          )}

          {/* Time Limit (if timed mode) */}
          {mode === 'timed' && (
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
                TIME ALLOCATED
              </label>
              <select
                value={timeLimitMinutes}
                onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  outline: 'none',
                  fontWeight: 600
                }}
              >
                <option value={5}>5 Minutes</option>
                <option value={10}>10 Minutes</option>
                <option value={15}>15 Minutes</option>
                <option value={30}>30 Minutes</option>
              </select>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={handleStart} className="btn btn-primary" style={{ padding: '0.75rem 1.75rem' }}>
            <Play size={18} fill="white" />
            <span>Start Test Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
