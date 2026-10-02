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
  X,
  Sparkles,
  Zap,
  Target
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
        osc.frequency.setValueAtTime(520, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.09);
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
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
  const isTimeCritical = timeLeft !== null && timeLeft <= 120;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem' }} className="animate-fade-in">
      {/* Gamified Header Card */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '1rem 1.25rem', 
          marginBottom: '1.25rem', 
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(30, 144, 255, 0.25)',
          background: 'rgba(12, 18, 34, 0.95)'
        }}
      >
        {/* Animated Top Progress Line */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '4px',
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #1e90ff 0%, #10b981 100%)',
            transition: 'width 0.4s ease',
            boxShadow: '0 0 10px #1e90ff'
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.85rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge" style={{ background: 'rgba(30, 144, 255, 0.15)', color: '#1e90ff', border: '1px solid rgba(30, 144, 255, 0.35)' }}>
                {config.mode.toUpperCase()} MODE
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{currentQ.topic}</span>
            </div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span style={{ fontSize: '0.78rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>
                {progressPercent}% Complete
              </span>
            </h2>
          </div>

          {/* Action Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexWrap: 'wrap' }}>
            {/* Timer Display in Dodger Blue */}
            {timeLeft !== null && (
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  background: isTimeCritical ? 'rgba(239, 68, 68, 0.2)' : 'rgba(30, 144, 255, 0.12)',
                  color: isTimeCritical ? '#ef4444' : '#1e90ff',
                  border: isTimeCritical ? '1px solid #ef4444' : '1px solid rgba(30, 144, 255, 0.4)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
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
              <Edit3 size={15} color="#1e90ff" />
              <span className="hide-mobile">Scratchpad</span>
            </button>

            {/* Formulas */}
            <button
              onClick={onOpenFormulas}
              className="btn btn-secondary"
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}
              title="Open Formula Sheet"
            >
              <BookOpen size={15} color="#1e90ff" />
              <span className="hide-mobile">Formulas</span>
            </button>

            {/* Palette Button */}
            <button
              onClick={() => setShowPaletteModal(true)}
              className="btn"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem', background: 'rgba(30, 144, 255, 0.15)', border: '1px solid rgba(30, 144, 255, 0.4)', color: '#1e90ff', fontWeight: 700 }}
            >
              <Grid size={15} />
              <span>Palette ({answeredCount}/{questions.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Question & Answer Card */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '1.5rem', 
          background: '#090e1a', 
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
        }}
      >
        {/* Difficulty Badge & ID */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.15rem' }}>
          <span className={`badge badge-${currentQ.difficulty.toLowerCase()}`}>
            {currentQ.difficulty} Difficulty
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ID: {currentQ.id}</span>
        </div>

        {/* Question Text */}
        <h3 style={{ 
          fontSize: '1.2rem', 
          fontWeight: 700, 
          lineHeight: '1.6', 
          marginBottom: '1.35rem',
          whiteSpace: 'pre-line',
          color: '#ffffff',
          letterSpacing: '-0.2px'
        }}>
          {currentQ.question}
        </h3>

        {/* Code Snippet if present */}
        {currentQ.codeSnippet && (
          <pre className="code-block" style={{ marginBottom: '1.35rem' }}>
            <code>{currentQ.codeSnippet}</code>
          </pre>
        )}

        {/* Table Data if present (Data Interpretation) */}
        {currentQ.tableData && (
          <table className="di-table" style={{ marginBottom: '1.35rem' }}>
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

        {/* Gamified Answer Option Cards 2x2 Layout (1 2 / 3 4) */}
        <div className="quiz-options-grid">
          {currentQ.options.map((opt, optionIdx) => {
            const isSelected = answers[currentQ.id] === optionIdx;
            const isStruck = struckOptions[`${currentQ.id}_${optionIdx}`];
            const isPracticeMode = config.mode === 'practice';
            const isAnsweredInPractice = isPracticeMode && answers[currentQ.id] !== undefined;
            const isCorrectOption = optionIdx === currentQ.correctIndex;

            // DEFAULT UNSELECTED STYLING
            let optionBg = 'rgba(15, 23, 42, 0.75)';
            let optionBorder = '1px solid rgba(255, 255, 255, 0.12)';
            let textColor = '#e2e8f0';
            let badgeBg = 'rgba(30, 144, 255, 0.12)';
            let badgeColor = '#1e90ff';
            let badgeBorder = '1px solid rgba(30, 144, 255, 0.35)';
            let glowShadow = 'none';

            // BRIGHT VIBRANT EMERALD GREEN WHEN ANSWER IS SELECTED!
            if (isSelected) {
              optionBg = 'linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(5, 150, 105, 0.32) 100%)';
              optionBorder = '2px solid #10b981';
              textColor = '#34d399';
              badgeBg = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
              badgeColor = '#ffffff';
              badgeBorder = 'none';
              glowShadow = '0 8px 25px rgba(16, 185, 129, 0.35), 0 0 15px rgba(16, 185, 129, 0.2)';
            }

            if (isAnsweredInPractice) {
              if (isCorrectOption) {
                optionBg = 'linear-gradient(135deg, rgba(16, 185, 129, 0.28) 0%, rgba(5, 150, 105, 0.4) 100%)';
                optionBorder = '2px solid #10b981';
                textColor = '#34d399';
                badgeBg = '#10b981';
                badgeColor = '#ffffff';
              } else if (isSelected) {
                optionBg = 'linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(185, 28, 28, 0.35) 100%)';
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
                  padding: '0.9rem 1.25rem',
                  borderRadius: '12px',
                  background: optionBg,
                  border: optionBorder,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: isStruck ? 0.35 : 1,
                  textDecoration: isStruck ? 'line-through' : 'none',
                  minHeight: '54px',
                  boxShadow: glowShadow,
                  transform: isSelected ? 'translateY(-2px)' : 'translateY(0)'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected && !isStruck) {
                    e.currentTarget.style.borderColor = '#1e90ff';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(30, 144, 255, 0.25)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1 }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: badgeBg,
                    color: badgeColor,
                    border: badgeBorder,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                  }}>
                    {String.fromCharCode(65 + optionIdx)}
                  </div>
                  <span style={{ fontSize: '0.95rem', fontWeight: isSelected ? 700 : 500, color: textColor }}>
                    {opt}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                  {isSelected && (
                    <CheckCircle2 size={22} color="#10b981" />
                  )}

                  {/* Strikeout Option Button */}
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

        {/* Practice Mode Instant Solutions & Hints */}
        {config.mode === 'practice' && (
          <div style={{ marginTop: '1.35rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.35rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowHint(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }))}
                className="btn btn-secondary"
                style={{ fontSize: '0.85rem', padding: '0.5rem 0.9rem' }}
              >
                <HelpCircle size={16} color="#1e90ff" />
                <span>{showHint[currentQ.id] ? 'Hide Hint' : 'Show Hint'}</span>
              </button>
              <button
                onClick={() => setShowPracticeExplanation(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }))}
                className="btn btn-secondary"
                style={{ fontSize: '0.85rem', padding: '0.5rem 0.9rem' }}
              >
                <Eye size={16} color="#10b981" />
                <span>{showPracticeExplanation[currentQ.id] ? 'Hide Solution' : 'View Detailed Solution'}</span>
              </button>
            </div>

            {/* Hint Box */}
            {showHint[currentQ.id] && (
              <div style={{ padding: '1rem 1.15rem', background: 'rgba(245, 158, 11, 0.12)', borderLeft: '4px solid #f59e0b', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>
                <strong style={{ color: '#fbbf24', display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem' }}>HINT:</strong>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{currentQ.hint}</p>
              </div>
            )}

            {/* Explanation Box */}
            {showPracticeExplanation[currentQ.id] && (
              <div style={{ padding: '1.15rem 1.25rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                {currentQ.formula && (
                  <div style={{ marginBottom: '0.75rem' }}>
                    <strong style={{ fontSize: '0.8rem', color: '#1e90ff', textTransform: 'uppercase' }}>KEY FORMULA:</strong>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: '#38bdf8', marginTop: '0.2rem' }}>
                      {currentQ.formula}
                    </div>
                  </div>
                )}
                <strong style={{ fontSize: '0.85rem', color: '#10b981', textTransform: 'uppercase', display: 'block', marginBottom: '0.45rem' }}>STEP-BY-STEP EXPLANATION:</strong>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                  {currentQ.explanation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Dynamic Navigation Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', gap: '0.65rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="btn btn-secondary"
            style={{ padding: '0.65rem 1.15rem', fontSize: '0.88rem' }}
          >
            <ChevronLeft size={17} />
            <span>Previous</span>
          </button>

          <button
            onClick={clearAnswer}
            disabled={answers[currentQ.id] === undefined}
            className="btn btn-ghost"
            style={{ fontSize: '0.85rem', padding: '0.55rem 0.85rem' }}
          >
            Clear Choice
          </button>

          {currentIndex === questions.length - 1 ? (
            <button onClick={onSubmitTest} className="btn btn-success" style={{ padding: '0.7rem 1.5rem', fontSize: '0.92rem', fontWeight: 800 }}>
              <Send size={17} />
              <span>Submit Exam 🚀</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
              className="btn btn-primary"
              style={{ padding: '0.7rem 1.4rem', fontSize: '0.92rem', fontWeight: 800 }}
            >
              <span>Next Question</span>
              <ChevronRight size={17} />
            </button>
          )}
        </div>
      </div>

      {/* QUESTION PALETTE MODAL (DODGER BLUE ACCENTS) */}
      {showPaletteModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in" style={{ maxWidth: '460px', width: '92%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>Question Palette</h4>
                <span style={{ fontSize: '0.82rem', color: '#1e90ff', fontWeight: 700 }}>{answeredCount} of {questions.length} Questions Answered</span>
              </div>
              <button onClick={() => setShowPaletteModal(false)} className="btn btn-ghost" style={{ padding: '0.4rem', borderRadius: '50%' }}>
                <X size={20} />
              </button>
            </div>

            {/* Questions Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.6rem', marginBottom: '1.25rem', maxHeight: '250px', overflowY: 'auto', padding: '0.25rem' }}>
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
                  border = '2px solid #1e90ff';
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
                      height: '44px',
                      borderRadius: '10px',
                      background: bg,
                      color: color,
                      border: border,
                      fontWeight: 800,
                      cursor: 'pointer',
                      fontSize: '0.92rem',
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
            <div style={{ fontSize: '0.78rem', display: 'flex', gap: '1rem', justifyContent: 'center', background: 'rgba(255,255,255,0.03)', padding: '0.6rem', borderRadius: '8px', marginBottom: '1.15rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                <span style={{ color: '#34d399', fontWeight: 600 }}>Answered</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#1e90ff' }} />
                <span style={{ color: '#1e90ff', fontWeight: 600 }}>Current</span>
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
              style={{ width: '100%', padding: '0.7rem', fontWeight: 800 }}
            >
              Submit Exam Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
