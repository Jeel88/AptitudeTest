import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Edit3, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  HelpCircle, 
  Eye, 
  Slash,
  Grid,
  Send,
  X
} from 'lucide-react';

export default function ExamInterface({ 
  questions, 
  config, 
  onFinishTest, 
  onOpenScratchpad, 
  onOpenFormulas,
  soundEnabled 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: chosenIndex }
  const [struckOptions, setStruckOptions] = useState({}); // { `${questionId}_${optionIdx}`: boolean }
  const [showPracticeExplanation, setShowPracticeExplanation] = useState({}); // { questionId: boolean }
  const [showHint, setShowHint] = useState({}); // { questionId: boolean }
  const [showPaletteModal, setShowPaletteModal] = useState(false);

  // Timer state
  const totalSeconds = config.timeLimitMinutes ? config.timeLimitMinutes * 60 : null;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  const currentQ = questions[currentIndex] || questions[0];

  // Sound effect handler
  const playSound = (type) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'select') {
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      } else if (type === 'warning') {
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      }
    } catch (err) {
      // Audio fallback swallow
    }
  };

  // Timer Countdown Effect
  useEffect(() => {
    if (totalSeconds === null) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onSubmitTest();
          return 0;
        }
        if (prev === 120) playSound('warning'); // 2 min warning sound
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [totalSeconds]);

  // Handle Option Select
  const handleSelectOption = (optionIdx) => {
    playSound('select');
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIdx
    }));
  };

  // Handle Option Strikeout (Scratch out option)
  const handleToggleStrike = (e, optionIdx) => {
    e.stopPropagation();
    const key = `${currentQ.id}_${optionIdx}`;
    setStruckOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const clearAnswer = () => {
    setAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const onSubmitTest = () => {
    onFinishTest({
      questions,
      answers,
      timeTakenSeconds: totalSeconds ? totalSeconds - timeLeft : null,
      config
    });
  };

  // Format Time
  const formatTime = (secs) => {
    if (secs === null) return null;
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(answers).length;
  const isTimeCritical = timeLeft !== null && timeLeft <= 120;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem' }} className="animate-fade-in">
      {/* Header Bar */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '0.85rem 1.25rem', 
          marginBottom: '1.25rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <span className="badge badge-easy">{config.mode.toUpperCase()} MODE</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{currentQ.topic}</span>
          </div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800 }}>
            Question {currentIndex + 1} of {questions.length}
          </h2>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {/* Timer display */}
          {timeLeft !== null && (
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                background: isTimeCritical ? 'rgba(239, 68, 68, 0.2)' : 'var(--bg-tertiary)',
                color: isTimeCritical ? '#ef4444' : 'var(--accent-primary)',
                border: isTimeCritical ? '1px solid #ef4444' : '1px solid var(--border-color)',
                fontWeight: 700,
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)'
              }}
              className={isTimeCritical ? 'pulse-active' : ''}
            >
              <Clock size={16} />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}

          {/* Scratchpad */}
          <button
            onClick={onOpenScratchpad}
            className="btn btn-secondary"
            style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}
            title="Open Scratchpad"
          >
            <Edit3 size={15} />
            <span className="hide-mobile">Scratchpad</span>
          </button>

          {/* Formulas */}
          <button
            onClick={onOpenFormulas}
            className="btn btn-secondary"
            style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}
            title="Open Formula Sheet"
          >
            <BookOpen size={15} />
            <span className="hide-mobile">Formulas</span>
          </button>

          {/* Palette Button */}
          <button
            onClick={() => setShowPaletteModal(true)}
            className="btn btn-secondary"
            style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.4)', color: '#38bdf8' }}
          >
            <Grid size={15} />
            <span>Palette</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="glass-panel" style={{ padding: '1.35rem' }}>
        {/* Topic & Difficulty */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span className={`badge badge-${currentQ.difficulty.toLowerCase()}`}>
            {currentQ.difficulty} Difficulty
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ID: {currentQ.id}</span>
        </div>

        {/* Question Text */}
        <h3 style={{ 
          fontSize: '1.15rem', 
          fontWeight: 600, 
          lineHeight: '1.55', 
          marginBottom: '1.25rem',
          whiteSpace: 'pre-line',
          color: '#ffffff'
        }}>
          {currentQ.question}
        </h3>

        {/* Code Snippet if present */}
        {currentQ.codeSnippet && (
          <pre className="code-block" style={{ marginBottom: '1.25rem' }}>
            <code>{currentQ.codeSnippet}</code>
          </pre>
        )}

        {/* Table Data if present (Data Interpretation) */}
        {currentQ.tableData && (
          <table className="di-table" style={{ marginBottom: '1.25rem' }}>
            <thead>
              <tr>
                {Object.keys(currentQ.tableData[0]).map((key) => (
                  <th key={key}>{key.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentQ.tableData.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Options List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
          {currentQ.options.map((opt, optionIdx) => {
            const isSelected = answers[currentQ.id] === optionIdx;
            const isStruck = struckOptions[`${currentQ.id}_${optionIdx}`];
            const isPracticeMode = config.mode === 'practice';
            const isAnsweredInPractice = isPracticeMode && answers[currentQ.id] !== undefined;
            const isCorrectOption = optionIdx === currentQ.correctIndex;

            // DEFAULT / SELECTED / PRACTICE STYLING
            let optionBg = 'rgba(255, 255, 255, 0.04)';
            let optionBorder = '1px solid rgba(255, 255, 255, 0.1)';
            let textColor = '#e2e8f0';
            let badgeBg = 'rgba(255, 255, 255, 0.1)';
            let badgeColor = '#94a3b8';

            // BRIGHT GREEN WHEN ANSWER IS SELECTED!
            if (isSelected) {
              optionBg = 'rgba(16, 185, 129, 0.22)';
              optionBorder = '2px solid #10b981';
              textColor = '#34d399';
              badgeBg = '#10b981';
              badgeColor = '#ffffff';
            }

            if (isAnsweredInPractice) {
              if (isCorrectOption) {
                optionBg = 'rgba(16, 185, 129, 0.25)';
                optionBorder = '2px solid #10b981';
                textColor = '#34d399';
                badgeBg = '#10b981';
                badgeColor = '#ffffff';
              } else if (isSelected) {
                optionBg = 'rgba(239, 68, 68, 0.25)';
                optionBorder = '2px solid #ef4444';
                textColor = '#f87171';
                badgeBg = '#ef4444';
                badgeColor = '#ffffff';
              }
            }

            return (
              <div
                key={optionIdx}
                onClick={() => handleSelectOption(optionIdx)}
                style={{
                  padding: '0.85rem 1.1rem',
                  borderRadius: '12px',
                  background: optionBg,
                  border: optionBorder,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease',
                  opacity: isStruck ? 0.4 : 1,
                  textDecoration: isStruck ? 'line-through' : 'none',
                  minHeight: '52px',
                  boxShadow: isSelected ? '0 4px 16px rgba(16, 185, 129, 0.2)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: badgeBg,
                    color: badgeColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    flexShrink: 0
                  }}>
                    {String.fromCharCode(65 + optionIdx)}
                  </div>
                  <span style={{ fontSize: '0.92rem', fontWeight: isSelected ? 700 : 500, color: textColor }}>
                    {opt}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {isSelected && (
                    <CheckCircle2 size={20} color="#10b981" />
                  )}

                  {/* Strikeout Button */}
                  <button
                    onClick={(e) => handleToggleStrike(e, optionIdx)}
                    title={isStruck ? 'Un-strike option' : 'Strike out option'}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: isStruck ? '#ef4444' : '#64748b',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    <Slash size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Practice Mode Instant Feedback & Explanations */}
        {config.mode === 'practice' && (
          <div style={{ marginTop: '1.25rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowHint(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }))}
                className="btn btn-secondary"
                style={{ fontSize: '0.82rem', padding: '0.45rem 0.8rem' }}
              >
                <HelpCircle size={15} />
                <span>{showHint[currentQ.id] ? 'Hide Hint' : 'Show Hint'}</span>
              </button>
              <button
                onClick={() => setShowPracticeExplanation(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }))}
                className="btn btn-secondary"
                style={{ fontSize: '0.82rem', padding: '0.45rem 0.8rem' }}
              >
                <Eye size={15} />
                <span>{showPracticeExplanation[currentQ.id] ? 'Hide Solution' : 'View Solution'}</span>
              </button>
            </div>

            {/* Hint Box */}
            {showHint[currentQ.id] && (
              <div style={{ padding: '0.85rem 1rem', background: 'rgba(245, 158, 11, 0.12)', borderLeft: '4px solid #f59e0b', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>
                <strong style={{ color: '#fbbf24', display: 'block', marginBottom: '0.2rem', fontSize: '0.82rem' }}>HINT:</strong>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{currentQ.hint}</p>
              </div>
            )}

            {/* Explanation Box */}
            {showPracticeExplanation[currentQ.id] && (
              <div style={{ padding: '1rem 1.1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                {currentQ.formula && (
                  <div style={{ marginBottom: '0.65rem' }}>
                    <strong style={{ fontSize: '0.78rem', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>KEY FORMULA:</strong>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#38bdf8', marginTop: '0.15rem' }}>
                      {currentQ.formula}
                    </div>
                  </div>
                )}
                <strong style={{ fontSize: '0.82rem', color: 'var(--accent-success)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>STEP-BY-STEP EXPLANATION:</strong>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', whiteSpace: 'pre-line', lineHeight: '1.55' }}>
                  {currentQ.explanation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Navigation Controls - Justified Mobile & Desktop */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="btn btn-secondary"
            style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          <button
            onClick={clearAnswer}
            disabled={answers[currentQ.id] === undefined}
            className="btn btn-ghost"
            style={{ fontSize: '0.82rem', padding: '0.5rem 0.75rem' }}
          >
            Clear Choice
          </button>

          {currentIndex === questions.length - 1 ? (
            <button onClick={onSubmitTest} className="btn btn-success" style={{ padding: '0.6rem 1.25rem', fontSize: '0.88rem' }}>
              <Send size={16} />
              <span>Submit Exam</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
              className="btn btn-primary"
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.88rem' }}
            >
              <span>Next Question</span>
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* QUESTION PALETTE MODAL (FULLY WORKING & RESPONSIVE FOR MOBILE & DESKTOP) */}
      {showPaletteModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in" style={{ maxWidth: '450px', width: '92%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>Question Palette</h4>
                <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600 }}>{answeredCount} of {questions.length} Answered</span>
              </div>
              <button onClick={() => setShowPaletteModal(false)} className="btn btn-ghost" style={{ padding: '0.4rem', borderRadius: '50%' }}>
                <X size={20} />
              </button>
            </div>

            {/* Questions Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.55rem', marginBottom: '1.25rem', maxHeight: '250px', overflowY: 'auto', padding: '0.25rem' }}>
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = answers[q.id] !== undefined;

                let bg = 'rgba(255, 255, 255, 0.05)';
                let color = '#94a3b8';
                let border = '1px solid rgba(255, 255, 255, 0.1)';

                if (isAnswered) {
                  bg = 'rgba(16, 185, 129, 0.25)';
                  color = '#34d399';
                  border = '1px solid #10b981';
                }
                if (isCurrent) {
                  border = '2px solid #0078d4';
                  color = '#ffffff';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowPaletteModal(false);
                    }}
                    style={{
                      height: '42px',
                      borderRadius: '8px',
                      background: bg,
                      color: color,
                      border: border,
                      fontWeight: 800,
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Palette Legend */}
            <div style={{ fontSize: '0.78rem', display: 'flex', gap: '1rem', justifyContent: 'center', background: 'rgba(255,255,255,0.03)', padding: '0.6rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                <span style={{ color: '#34d399', fontWeight: 600 }}>Answered</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0078d4' }} />
                <span style={{ color: '#38bdf8', fontWeight: 600 }}>Current</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#64748b' }} />
                <span style={{ color: '#94a3b8' }}>Unanswered</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={() => {
                setShowPaletteModal(false);
                onSubmitTest();
              }}
              className="btn btn-success"
              style={{ width: '100%', padding: '0.7rem', fontWeight: 700 }}
            >
              Submit Exam Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
