import React from 'react';
import { 
  Calculator, 
  Brain, 
  BookOpen, 
  Code2, 
  ArrowRight, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const ICON_MAP = {
  Calculator,
  Brain,
  BookOpen,
  Code2
};

export default function CategoryCard({ category, questionCount, onSelectCategory }) {
  const IconComponent = ICON_MAP[category.icon] || Calculator;

  return (
    <div 
      className="glass-panel glass-panel-hover"
      style={{
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top Accent Line */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: category.gradient
        }}
      />

      <div>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: category.gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: `0 6px 16px ${category.color}40`
          }}>
            <IconComponent size={24} />
          </div>

          <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.1)', color: category.color, border: `1px solid ${category.color}35` }}>
            {questionCount} Questions
          </span>
        </div>

        {/* Title & Description */}
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
          {category.name}
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
          {category.description}
        </p>

        {/* Topic Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
          {category.topics.map((topic, idx) => (
            <span 
              key={idx} 
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '0.2rem 0.55rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-color)'
              }}
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={() => onSelectCategory(category.id)}
        className="btn btn-primary"
        style={{
          width: '100%',
          background: category.gradient,
          padding: '0.75rem',
          border: 'none',
          boxShadow: `0 4px 14px ${category.color}35`
        }}
      >
        <span>Explore Category</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
