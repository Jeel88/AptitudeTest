import React, { useState } from 'react';
import { 
  Calculator, 
  Brain, 
  BookOpen, 
  Code2, 
  ArrowRight,
  Layers,
  CheckCircle2
} from 'lucide-react';

const ICON_MAP = {
  Calculator,
  Brain,
  BookOpen,
  Code2
};

export default function CategoryCard({ category, questionCount, onSelectCategory }) {
  const IconComponent = ICON_MAP[category.icon] || Calculator;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectCategory(category.id)}
      style={{
        borderRadius: '16px',
        background: '#0d1322',
        border: isHovered ? `1px solid ${category.color}` : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: isHovered 
          ? `0 16px 36px rgba(0, 0, 0, 0.6), 0 0 24px ${category.glowColor || 'rgba(56, 189, 248, 0.2)'}`
          : '0 8px 24px rgba(0, 0, 0, 0.3)',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer'
      }}
    >
      {/* Top Image Showcase Banner */}
      <div 
        style={{
          height: '140px',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#060913'
        }}
      >
        {/* Category Graphic Image */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${category.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.5s ease',
            filter: 'brightness(0.95) contrast(1.05)'
          }}
        />

        {/* Dark Gradient Overlay for Readability */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(6, 9, 19, 0.2) 0%, rgba(13, 19, 34, 0.95) 100%)'
          }}
        />

        {/* Top Accent Line */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: category.gradient
          }}
        />

        {/* Floating Category Icon Badge */}
        <div 
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1.25rem',
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'rgba(6, 9, 19, 0.75)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: `1px solid ${category.color}60`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: category.color,
            boxShadow: `0 4px 14px rgba(0, 0, 0, 0.5)`
          }}
        >
          <IconComponent size={22} />
        </div>

        {/* Question Count Badge */}
        <div 
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1.25rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '20px',
            background: 'rgba(6, 9, 19, 0.8)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${category.color}40`,
            fontSize: '0.75rem',
            fontWeight: 700,
            color: category.color,
            letterSpacing: '0.3px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <Layers size={13} color={category.color} />
          <span>{questionCount} Questions</span>
        </div>
      </div>

      {/* Card Content Area */}
      <div style={{ padding: '1.25rem 1.35rem 1.35rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {/* Category Title */}
          <h3 
            style={{ 
              fontSize: '1.25rem', 
              fontWeight: 700, 
              marginBottom: '0.5rem', 
              color: isHovered ? category.color : '#ffffff',
              transition: 'color 0.2s ease',
              letterSpacing: '-0.3px'
            }}
          >
            {category.name}
          </h3>

          {/* Description */}
          <p 
            style={{ 
              fontSize: '0.875rem', 
              color: '#94a3b8', 
              marginBottom: '1.25rem', 
              lineHeight: '1.5',
              fontWeight: 400
            }}
          >
            {category.description}
          </p>

          {/* Topics Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.5rem' }}>
            {category.topics.map((topic, idx) => (
              <span 
                key={idx} 
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  padding: '0.25rem 0.6rem',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  color: '#cbd5e1',
                  border: '1px solid rgba(255, 255, 255, 0.07)'
                }}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectCategory(category.id);
          }}
          style={{
            width: '100%',
            background: isHovered ? category.gradient : 'rgba(255, 255, 255, 0.06)',
            color: isHovered ? '#ffffff' : '#e2e8f0',
            border: isHovered ? 'none' : '1px solid rgba(255, 255, 255, 0.12)',
            padding: '0.7rem 1.25rem',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            boxShadow: isHovered ? `0 6px 20px ${category.glowColor}` : 'none'
          }}
        >
          <span>Practice {category.name.split(' ')[0]}</span>
          <ArrowRight 
            size={18} 
            style={{ 
              transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform 0.25s ease'
            }} 
          />
        </button>
      </div>
    </div>
  );
}
