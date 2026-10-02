import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Flag, 
  Edit3, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Eye, 
  Slash,
  Grid,
  Send,
  AlertTriangle
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
  const [flagged, setFlagged] = useState({}); // { questionId: boolean }
  const [struckOptions, setStruckOptions] = useState({}); // { `${questionId}_${optionIdx}`: boolean }
  const [showPracticeExplanation, setShowPracticeExplanation] = useState({}); // { questionId: boolean }
  const [showHint, setShowHint] = useState({}); // { questionId: boolean }
  const [showGridDrawer, setShowGridDrawer] = useState(false);

  // Timer state
  const totalSeconds = config.timeLimitMinutes ? config.timeLimitMinutes * 60 : null;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  const currentQ = questions[currentIndex];

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

  // Toggle Flag question
  const handleToggleFlag = () => {
    setFlagged(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
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
      flagged,
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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1rem' }} className="animate-fade-in">
      {/* Header Bar */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '1rem 1.5rem', 
          marginBottom: '1.5rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-easy">{config.mode.toUpperCase()} MODE</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{currentQ.topic}</span>
          </div>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
            Question {currentIndex + 1} of {questions.length}
          </h2>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Timer display */}
          {timeLeft !== null && (
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                background: isTimeCritical ? 'rgba(239, 68, 68, 0.2)' : 'var(--bg-tertiary)',
                color: isTimeCritical ? '#ef4444' : 'var(--accent-primary)',
                border: isTimeCritical ? '1px solid #ef4444' : '1px solid var(--border-color)',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)'
              }}
              className={isTimeCritical ? 'pulse-active' : ''}
            >
              <Clock size={18} />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}

          {/* Flag question */}
          <button
            onClick={handleToggleFlag}
            className={`btn ${flagged[currentQ.id] ? 'btn-danger' : 'btn-secondary'}`}
            style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
            title="Flag for later review"
          >
            <Flag size={16} fill={flagged[currentQ.id] ? '#ef4444' : 'none'} />
            <span className="hide-mobile">{flagged[currentQ.id] ? 'Flagged' : 'Flag'}</span>
          </button>

          {/* Scratchpad */}
          <button
            onClick={onOpenScratchpad}
            className="btn btn-secondary"
            style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
            title="Open Scratchpad"
          >
            <Edit3 size={16} />
            <span className="hide-mobile">Scratchpad</span>
          </button>

          {/* Formulas */}
          <button
            onClick={onOpenFormulas}
            className="btn btn-secondary"
            style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
            title="Open Formula Sheet"
          >
            <BookOpen size={16} />
            <span className="hide-mobile">Formulas</span>
          </button>

          {/* Grid Toggle */}
          <button
            onClick={() => setShowGridDrawer(!showGridDrawer)}
            className="btn btn-secondary"
            style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
          >
            <Grid size={16} />
            <span>Palette</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ display: 'grid', gridTemplateColumns: showGridDrawer ? '1fr 280px' : '1fr', gap: '1.5rem' }}>
        {/* Question Area */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          {/* Topic & Difficulty */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <span className={`badge badge-${currentQ.difficulty.toLowerCase()}`}>
              {currentQ.difficulty} Difficulty
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ID: {currentQ.id}</span>
          </div>

          {/* Question Text */}
          <h3 style={{ 
            fontSize: '1.2rem', 
            fontWeight: 600, 
            lineHeight: '1.6', 
            marginBottom: '1.5rem',
            whiteSpace: 'pre-line' 
          }}>
            {currentQ.question}
          </h3>

          {/* Code Snippet if present */}
          {currentQ.codeSnippet && (
            <pre className="code-block" style={{ marginBottom: '1.5rem' }}>
              <code>{currentQ.codeSnippet}</code>
            </pre>
          )}

          {/* Table Data if present (Data Interpretation) */}
          {currentQ.tableData && (
            <table className="di-table">
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
            {currentQ.options.map((opt, optionIdx) => {
              const isSelected = answers[currentQ.id] === optionIdx;
              const isStruck = struckOptions[`${currentQ.id}_${optionIdx}`];
              const isPracticeMode = config.mode === 'practice';
              const isAnsweredInPractice = isPracticeMode && answers[currentQ.id] !== undefined;
              const isCorrectOption = optionIdx === currentQ.correctIndex;

              let optionBg = 'var(--bg-tertiary)';
              let optionBorder = '1px solid var(--border-color)';
              let textColor = 'var(--text-primary)';

              if (isSelected) {
                optionBg = 'rgba(99, 102, 241, 0.18)';
                optionBorder = '2px solid var(--accent-primary)';
              }

              if (isAnsweredInPractice) {
                if (isCorrectOption) {
                  optionBg = 'rgba(16, 185, 129, 0.2)';
                  optionBorder = '2px solid var(--accent-success)';
                  textColor = '#34d399';
                } else if (isSelected) {
                  optionBg = 'rgba(239, 68, 68, 0.2)';
                  optionBorder = '2px solid var(--accent-danger)';
                  textColor = '#f87171';
                }
              }

              return (
                <div
                  key={optionIdx}
                  onClick={() => handleSelectOption(optionIdx)}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: optionBg,
                    border: optionBorder,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
                    opacity: isStruck ? 0.4 : 1,
                    textDecoration: isStruck ? 'line-through' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isSelected ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                      color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      border: '1px solid var(--border-color)'
                    }}>
                      {String.fromCharCode(65 + optionIdx)}
                    </div>
                    <span style={{ fontSize: '0.95rem', fontWeight: isSelected ? 600 : 400, color: textColor }}>
                      {opt}
                    </span>
                  </div>

                  {/* Strikeout Button */}
                  <button
                    onClick={(e) => handleToggleStrike(e, optionIdx)}
                    title={isStruck ? 'Un-strike option' : 'Strike out option'}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: isStruck ? 'var(--accent-danger)' : 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    <Slash size={16} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Practice Mode Instant Feedback & Explanations */}
          {config.mode === 'practice' && (
            <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                <button
                  onClick={() => setShowHint(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }))}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.85rem' }}
                >
                  <HelpCircle size={16} />
                  <span>{showHint[currentQ.id] ? 'Hide Hint' : 'Show Hint'}</span>
                </button>
                <button
                  onClick={() => setShowPracticeExplanation(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }))}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.85rem' }}
                >
                  <Eye size={16} />
                  <span>{showPracticeExplanation[currentQ.id] ? 'Hide Solution' : 'View Detailed Solution'}</span>
                </button>
              </div>

              {/* Hint Box */}
              {showHint[currentQ.id] && (
                <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.12)', borderLeft: '4px solid #f59e0b', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>
                  <strong style={{ color: '#fbbf24', display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem' }}>HINT:</strong>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{currentQ.hint}</p>
                </div>
              )}

              {/* Explanation Box */}
              {showPracticeExplanation[currentQ.id] && (
                <div style={{ padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  {currentQ.formula && (
                    <div style={{ marginBottom: '0.75rem' }}>
                      <strong style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>KEY FORMULA:</strong>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#38bdf8', marginTop: '0.2rem' }}>
                        {currentQ.formula}
                      </div>
                    </div>
                  )}
                  <strong style={{ fontSize: '0.85rem', color: 'var(--accent-success)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>STEP-BY-STEP EXPLANATION:</strong>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                    {currentQ.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Navigation Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="btn btn-secondary"
            >
              <ChevronLeft size={18} />
              <span>Previous</span>
            </button>

            <button
              onClick={clearAnswer}
              disabled={answers[currentQ.id] === undefined}
              className="btn btn-ghost"
              style={{ fontSize: '0.85rem' }}
            >
              Clear Choice
            </button>

            {currentIndex === questions.length - 1 ? (
              <button onClick={onSubmitTest} className="btn btn-success" style={{ padding: '0.75rem 1.5rem' }}>
                <Send size={18} />
                <span>Submit Exam</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                className="btn btn-primary"
              >
                <span>Next Question</span>
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Question Palette Grid Drawer */}
        {showGridDrawer && (
          <div className="glass-panel" style={{ padding: '1.25rem', height: 'fit-content' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Question Palette</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{answeredCount}/{questions.length} Answered</span>
            </h4>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = answers[q.id] !== undefined;
                const isFlagged = flagged[q.id];

                let bg = 'var(--bg-tertiary)';
                let color = 'var(--text-secondary)';
                let border = '1px solid var(--border-color)';

                if (isAnswered) {
                  bg = 'rgba(16, 185, 129, 0.2)';
                  color = '#34d399';
                  border = '1px solid #10b981';
                }
                if (isFlagged) {
                  bg = 'rgba(239, 68, 68, 0.2)';
                  color = '#f87171';
                  border = '1px solid #ef4444';
                }
                if (isCurrent) {
                  border = '2px solid var(--accent-primary)';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    style={{
                      padding: '0.6rem',
                      borderRadius: 'var(--radius-sm)',
                      background: bg,
                      color: color,
                      border: border,
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div style={{ fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34d399' }} />
                <span>Answered</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f87171' }} />
                <span>Flagged for Review</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)' }} />
                <span>Unanswered</span>
              </div>
            </div>

            {/* Finish Button inside palette */}
            <button
              onClick={onSubmitTest}
              className="btn btn-success"
              style={{ width: '100%', marginTop: '1.25rem', padding: '0.65rem' }}
            >
              Submit Test
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
