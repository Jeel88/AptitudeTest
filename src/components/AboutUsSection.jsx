import React from 'react';
import { 
  Zap, 
  Brain, 
  Target, 
  Award, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  Cpu,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';

export default function AboutUsSection({ onStartPractice }) {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem' }} className="animate-fade-in">
      {/* Header Banner */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '3.5rem 2.5rem', 
          marginBottom: '3rem', 
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(14, 20, 36, 0.95) 0%, rgba(6, 9, 19, 0.98) 100%)'
        }}
      >
        <div style={{ maxWidth: '780px', position: 'relative', zIndex: 1 }}>
          <span className="badge badge-easy" style={{ marginBottom: '1rem', background: 'rgba(0, 120, 212, 0.15)', color: '#38bdf8', border: '1px solid rgba(0, 120, 212, 0.3)' }}>
            <Zap size={14} /> ABOUT APTIMASTER PRO
          </span>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem', color: '#ffffff' }}>
            Smart Aptitude Evaluation & <span style={{ color: '#38bdf8' }}>Answering Power Analytics</span>
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
            AptiMaster Pro is a comprehensive aptitude testing platform designed to measure your quantitative reasoning, logical thinking, verbal fluency, and technical problem-solving power. Take timed mock exams or practice at your own pace with detailed solution breakdowns.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={onStartPractice} className="btn btn-vscode-blue" style={{ padding: '0.75rem 1.75rem' }}>
              <span>Start Free Quiz Now</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Core Platform Features */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.5rem', textAlign: 'center', color: '#ffffff' }}>
          Evaluate & Boost Your <span style={{ color: '#38bdf8' }}>Answering Power</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {/* Feature 1 */}
          <div className="glass-panel glass-panel-hover" style={{ padding: '1.75rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 120, 212, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <TrendingUp size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: '#ffffff' }}>Answering Power Score</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Our analytics engine calculates your overall Answering Power based on accuracy %, speed per question, and difficulty level.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-panel glass-panel-hover" style={{ padding: '1.75rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.15)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Brain size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: '#ffffff' }}>Multi-Domain Practice</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Practice Quantitative Aptitude, Logical Reasoning, Verbal Ability, and Technical Computer Science questions with instant solutions.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-panel glass-panel-hover" style={{ padding: '1.75rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <BarChart3 size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: '#ffffff' }}>Detailed Performance Review</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Get step-by-step mathematical explanations, key formulas, time-taken breakdowns, and printable progress report cards.
            </p>
          </div>
        </div>
      </div>

      {/* Platform Statistics */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '2rem', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '1.5rem',
          textAlign: 'center'
        }}
      >
        <div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#38bdf8' }}>50,000+</div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Quizzes Solved</span>
        </div>
        <div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#34d399' }}>98.5%</div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Accuracy Improvement</span>
        </div>
        <div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#c084fc' }}>4.9 / 5.0</div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Candidate Rating</span>
        </div>
        <div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fbbf24' }}>100%</div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Free Practice Access</span>
        </div>
      </div>
    </div>
  );
}
