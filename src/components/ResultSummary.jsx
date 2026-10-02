import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Target, 
  RotateCcw, 
  BookOpen, 
  Award, 
  Share2, 
  Printer,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Flag
} from 'lucide-react';

export default function ResultSummary({ result, onRetakeTest, onGoHome }) {
  const { questions, answers, flagged, timeTakenSeconds, config } = result;
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'incorrect' | 'flagged'
  const [expandedSolutions, setExpandedSolutions] = useState({});

  // Compute metrics
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  questions.forEach(q => {
    const userChoice = answers[q.id];
    if (userChoice === undefined) {
      unansweredCount++;
    } else if (userChoice === q.correctIndex) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const totalQuestions = questions.length;
  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

  // Trigger Confetti if high score!
  useEffect(() => {
    if (scorePercentage >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [scorePercentage]);

  const toggleSolution = (qId) => {
    setExpandedSolutions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const filteredQuestions = questions.filter(q => {
    if (filterMode === 'incorrect') return answers[q.id] !== undefined && answers[q.id] !== q.correctIndex;
    if (filterMode === 'flagged') return flagged[q.id];
    return true;
  });

  const formatTimeTaken = (secs) => {
    if (!secs) return 'N/A';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }} className="animate-fade-in">
      {/* Trophy & Score Header */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '2.5rem', 
          textAlign: 'center', 
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: scorePercentage >= 70 ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)',
          marginBottom: '1rem'
        }}>
          <Trophy size={36} />
        </div>

        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.25rem' }}>
          {scorePercentage >= 80 ? 'Outstanding Performance!' : (scorePercentage >= 50 ? 'Good Effort!' : 'Keep Practicing!')}
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          You completed the {config.mode.toUpperCase()} test session.
        </p>

        {/* Score Ring / Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          {/* Overall Accuracy */}
          <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>ACCURACY SCORE</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: scorePercentage >= 70 ? 'var(--accent-success)' : 'var(--accent-warning)' }}>
              {scorePercentage}%
            </div>
          </div>

          {/* Correct */}
          <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-success)', fontWeight: 700 }}>CORRECT</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-success)' }}>
              {correctCount} / {totalQuestions}
            </div>
          </div>

          {/* Incorrect */}
          <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-danger)', fontWeight: 700 }}>INCORRECT</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-danger)' }}>
              {incorrectCount}
            </div>
          </div>

          {/* Time Taken */}
          <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>TIME SPENT</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              {formatTimeTaken(timeTakenSeconds)}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
          <button onClick={onRetakeTest} className="btn btn-secondary">
            <RotateCcw size={18} />
            <span>Retake Test</span>
          </button>

          <button onClick={onGoHome} className="btn btn-primary">
            <span>Back to Dashboard</span>
          </button>

          <button onClick={printReport} className="btn btn-secondary">
            <Printer size={18} />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Review Section */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Question Solutions & Explanations</h3>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-tertiary)', padding: '4px', borderRadius: 'var(--radius-sm)' }}>
            <button
              onClick={() => setFilterMode('all')}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-sm)',
                background: filterMode === 'all' ? 'var(--accent-primary)' : 'transparent',
                color: '#fff',
                border: 'none',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              All ({questions.length})
            </button>
            <button
              onClick={() => setFilterMode('incorrect')}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-sm)',
                background: filterMode === 'incorrect' ? 'var(--accent-danger)' : 'transparent',
                color: '#fff',
                border: 'none',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Incorrect ({incorrectCount})
            </button>
            <button
              onClick={() => setFilterMode('flagged')}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-sm)',
                background: filterMode === 'flagged' ? 'var(--accent-warning)' : 'transparent',
                color: '#fff',
                border: 'none',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Flagged ({Object.values(flagged).filter(Boolean).length})
            </button>
          </div>
        </div>

        {/* Questions list review */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredQuestions.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0' }}>
              No questions in this filter view.
            </p>
          ) : (
            filteredQuestions.map((q, idx) => {
              const userAns = answers[q.id];
              const isCorrect = userAns === q.correctIndex;
              const isUnanswered = userAns === undefined;
              const isExpanded = expandedSolutions[q.id];

              return (
                <div 
                  key={q.id} 
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-tertiary)',
                    border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.3)' : (isUnanswered ? 'var(--border-color)' : 'rgba(239, 68, 68, 0.3)')}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        {isCorrect ? (
                          <span className="badge badge-easy" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <CheckCircle2 size={14} /> Correct
                          </span>
                        ) : (
                          isUnanswered ? (
                            <span className="badge badge-medium">Unanswered</span>
                          ) : (
                            <span className="badge badge-hard" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <XCircle size={14} /> Incorrect
                            </span>
                          )
                        )}
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{q.topic}</span>
                      </div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                        Q{idx + 1}. {q.question}
                      </h4>
                    </div>

                    <button
                      onClick={() => toggleSolution(q.id)}
                      className="btn btn-ghost"
                      style={{ padding: '0.4rem', borderRadius: '50%' }}
                    >
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>

                  {/* Options status */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', margin: '0.75rem 0' }}>
                    {q.options.map((opt, oIdx) => {
                      const isOptionCorrect = oIdx === q.correctIndex;
                      const isOptionChosen = userAns === oIdx;

                      let styleBg = 'var(--bg-secondary)';
                      let styleBorder = '1px solid var(--border-color)';
                      let styleColor = 'var(--text-secondary)';

                      if (isOptionCorrect) {
                        styleBg = 'rgba(16, 185, 129, 0.2)';
                        styleBorder = '1px solid #10b981';
                        styleColor = '#34d399';
                      } else if (isOptionChosen && !isCorrect) {
                        styleBg = 'rgba(239, 68, 68, 0.2)';
                        styleBorder = '1px solid #ef4444';
                        styleColor = '#f87171';
                      }

                      return (
                        <div key={oIdx} style={{ padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', background: styleBg, border: styleBorder, fontSize: '0.85rem', color: styleColor }}>
                          <strong>{String.fromCharCode(65 + oIdx)}.</strong> {opt} {isOptionChosen && '(Your Answer)'} {isOptionCorrect && '✓'}
                        </div>
                      );
                    })}
                  </div>

                  {/* Accordion Explanation */}
                  {(isExpanded || filterMode === 'incorrect') && (
                    <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                      {q.formula && (
                        <div style={{ marginBottom: '0.5rem' }}>
                          <strong style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>Formula:</strong>
                          <code style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#38bdf8', marginTop: '0.2rem' }}>
                            {q.formula}
                          </code>
                        </div>
                      )}
                      <strong style={{ fontSize: '0.75rem', color: 'var(--accent-success)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>Step-by-Step Breakdown:</strong>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', whiteSpace: 'pre-line', lineHeight: '1.5' }}>
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
