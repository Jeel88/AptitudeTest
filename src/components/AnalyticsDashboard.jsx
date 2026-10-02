import React from 'react';
import { 
  BarChart3, 
  Trophy, 
  Flame, 
  Clock, 
  Target, 
  Trash2, 
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import { CATEGORIES } from '../data/questionsData';

export default function AnalyticsDashboard({ testHistory, onClearHistory, onGoHome }) {
  // Compute analytics
  const totalTests = testHistory.length;

  let totalQuestions = 0;
  let totalCorrect = 0;

  const categoryStats = {
    quant: { correct: 0, total: 0 },
    logical: { correct: 0, total: 0 },
    verbal: { correct: 0, total: 0 },
    technical: { correct: 0, total: 0 }
  };

  testHistory.forEach(test => {
    test.questions.forEach(q => {
      totalQuestions++;
      const isRight = test.answers[q.id] === q.correctIndex;
      if (isRight) totalCorrect++;

      if (categoryStats[q.category]) {
        categoryStats[q.category].total++;
        if (isRight) categoryStats[q.category].correct++;
      }
    });
  });

  const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }} className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={onGoHome} className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Performance Analytics Dashboard</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Track your growth across all aptitude domains</p>
          </div>
        </div>

        {totalTests > 0 && (
          <button onClick={onClearHistory} className="btn btn-danger" style={{ fontSize: '0.85rem' }}>
            <Trash2 size={16} />
            <span>Reset History</span>
          </button>
        )}
      </div>

      {/* KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        {/* Total Tests */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>TESTS COMPLETED</span>
            <Trophy size={20} color="var(--accent-primary)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{totalTests}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Mock & Practice sessions</span>
        </div>

        {/* Overall Accuracy */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>OVERALL ACCURACY</span>
            <Target size={20} color="var(--accent-success)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-success)' }}>{overallAccuracy}%</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{totalCorrect} / {totalQuestions} questions correct</span>
        </div>

        {/* Total Questions Attempted */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>ATTEMPTED</span>
            <CheckCircle size={20} color="var(--accent-secondary)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{totalQuestions}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Questions solved</span>
        </div>

        {/* Active Streak */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>DAILY STREAK</span>
            <Flame size={20} color="#fbbf24" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24' }}>1 Day</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Keep testing daily!</span>
        </div>
      </div>

      {/* Domain Breakdown Progress */}
      <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <TrendingUp size={20} color="var(--accent-primary)" />
          <span>Category Performance Breakdown</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {CATEGORIES.map(cat => {
            const stats = categoryStats[cat.id] || { correct: 0, total: 0 };
            const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

            return (
              <div key={cat.id} style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{cat.name}</strong>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: cat.color }}>{percentage}%</span>
                </div>
                {/* Progress bar */}
                <div style={{ width: '100%', height: '8px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{ width: `${percentage}%`, height: '100%', background: cat.gradient, borderRadius: 'var(--radius-full)', transition: 'width 0.5s ease' }} />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.4rem' }}>
                  {stats.correct} / {stats.total} correct
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Test History Log */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem' }}>Recent Test History</h3>

        {testHistory.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0' }}>
            No test records found yet. Complete a test session to start building your analytics!
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>DATE</th>
                  <th style={{ padding: '0.75rem' }}>MODE</th>
                  <th style={{ padding: '0.75rem' }}>QUESTIONS</th>
                  <th style={{ padding: '0.75rem' }}>SCORE</th>
                  <th style={{ padding: '0.75rem' }}>ACCURACY</th>
                </tr>
              </thead>
              <tbody>
                {testHistory.map((item, idx) => {
                  let correct = 0;
                  item.questions.forEach(q => {
                    if (item.answers[q.id] === q.correctIndex) correct++;
                  });
                  const pct = Math.round((correct / item.questions.length) * 100);

                  return (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
                      <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{item.date}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span className="badge badge-easy">{item.config.mode.toUpperCase()}</span>
                      </td>
                      <td style={{ padding: '0.75rem' }}>{item.questions.length} Questions</td>
                      <td style={{ padding: '0.75rem', fontWeight: 700 }}>{correct} / {item.questions.length}</td>
                      <td style={{ padding: '0.75rem', fontWeight: 700, color: pct >= 70 ? 'var(--accent-success)' : 'var(--accent-warning)' }}>
                        {pct}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
