import React, { useState, useRef, useEffect } from 'react';
import { 
  Calculator, 
  Brain, 
  BookOpen, 
  Code2, 
  ArrowRight,
  Layers,
  Clock,
  Zap,
  CheckCircle,
  ChevronDown,
  Sparkles,
  Sliders,
  Check,
  Infinity as InfinityIcon
} from 'lucide-react';

const ICON_MAP = {
  Calculator,
  Brain,
  BookOpen,
  Code2
};

const TIME_LIMIT_OPTIONS = [
  { value: '5', label: '5 Minutes', badgeText: '5 min', sublabel: 'Speed Drill (5 Qs)', icon: Zap, mode: 'timed' },
  { value: '10', label: '10 Minutes', badgeText: '10 min', sublabel: 'Short Quiz (10 Qs)', icon: Clock, mode: 'timed' },
  { value: '15', label: '15 Minutes', badgeText: '15 min', sublabel: 'Standard Recommended Exam', icon: Clock, mode: 'timed' },
  { value: '30', label: '30 Minutes', badgeText: '30 min', sublabel: 'Full Length Marathon', icon: Clock, mode: 'timed' },
  { value: 'practice', label: 'Practice Mode', badgeText: 'Untimed', sublabel: 'Untimed with Instant Solutions', icon: InfinityIcon, mode: 'practice' }
];

export default function CategoryCard({ category, questionCount, onSelectCategory, onStartDirectQuiz }) {
  const IconComponent = ICON_MAP[category.icon] || Calculator;
  const [isHovered, setIsHovered] = useState(false);
  
  // Selected Time Limit state
  const [selectedTime, setSelectedTime] = useState('15');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeOption = TIME_LIMIT_OPTIONS.find(o => o.value === selectedTime) || TIME_LIMIT_OPTIONS[2];
  const ActiveIcon = activeOption.icon;

  const handleStart = (e) => {
    if (e) e.stopPropagation();
    const isPractice = selectedTime === 'practice';
    const config = {
      categoryId: category.id,
      mode: isPractice ? 'practice' : 'timed',
      difficulty: 'all',
      questionCount: Math.min(10, questionCount),
      timeLimitMinutes: isPractice ? null : Number(selectedTime)
    };
    if (onStartDirectQuiz) {
      onStartDirectQuiz(config);
    } else {
      onSelectCategory(category.id, config);
    }
  };

  const handleOpenModal = (e) => {
    e.stopPropagation();
    const isPractice = selectedTime === 'practice';
    onSelectCategory(category.id, {
      timeLimitMinutes: isPractice ? null : Number(selectedTime),
      mode: isPractice ? 'practice' : 'timed'
    });
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
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
        zIndex: isDropdownOpen ? 9999 : (isHovered ? 10 : 1),
        cursor: 'default',
        // Critical: keep overflow visible so dropdown does NOT get chopped!
        overflow: 'visible'
      }}
    >
      {/* Top Image Showcase Banner - Container has overflow hidden for rounded top edges */}
      <div 
        style={{
          height: '125px',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#060913',
          borderTopLeftRadius: '15px',
          borderTopRightRadius: '15px'
        }}
      >
        {/* Category Graphic Image */}
        <img 
          src={category.image}
          alt={category.name}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: isHovered ? 'brightness(1.05) contrast(1.08)' : 'brightness(0.95) contrast(1.02)'
          }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />

        {/* Dynamic Glowing Accent Gradient Overlay */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(6, 9, 19, 0.15) 0%, rgba(13, 19, 34, 0.4) 50%, rgba(13, 19, 34, 0.92) 100%)',
            pointerEvents: 'none'
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
            top: '0.75rem',
            left: '1rem',
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'rgba(6, 9, 19, 0.8)',
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
          <IconComponent size={18} />
        </div>

        {/* Question Count Badge */}
        <div 
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '1rem',
            padding: '0.25rem 0.65rem',
            borderRadius: '20px',
            background: 'rgba(6, 9, 19, 0.8)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: `1px solid ${category.color}40`,
            fontSize: '0.7rem',
            fontWeight: 700,
            color: category.color,
            letterSpacing: '0.3px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <Layers size={12} color={category.color} />
          <span>{questionCount} Questions</span>
        </div>

        {/* Active Time Limit Badge (Bottom Right of Header) */}
        <div
          style={{
            position: 'absolute',
            bottom: '0.55rem',
            right: '0.85rem',
            padding: '0.25rem 0.55rem',
            borderRadius: '7px',
            background: 'rgba(6, 9, 19, 0.85)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${category.color}80`,
            fontSize: '0.7rem',
            fontWeight: 700,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            boxShadow: `0 4px 12px rgba(0,0,0,0.4)`
          }}
        >
          <ActiveIcon size={12} color={category.color} />
          <span style={{ color: category.color }}>{activeOption.badgeText}</span>
        </div>
      </div>

      {/* Card Content Area - Overflow visible so cool dropdown floats cleanly */}
      <div style={{ padding: '1rem 1.1rem 1.1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'visible' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* Category Title */}
          <h3 
            style={{ 
              fontSize: '1.1rem', 
              fontWeight: 700, 
              marginBottom: '0.25rem', 
              color: isHovered ? category.color : '#ffffff',
              transition: 'color 0.2s ease',
              letterSpacing: '-0.3px',
              minHeight: '1.6rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {category.name}
          </h3>

          {/* Description */}
          <p 
            style={{ 
              fontSize: '0.82rem', 
              color: '#94a3b8', 
              marginBottom: '0.85rem', 
              lineHeight: '1.4',
              fontWeight: 400,
              minHeight: '2.3rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {category.description}
          </p>

          {/* Topics Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem', minHeight: '48px', alignContent: 'flex-start' }}>
            {category.topics.map((topic, idx) => (
              <span 
                key={idx} 
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  padding: '0.18rem 0.5rem',
                  borderRadius: '5px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  color: '#cbd5e1',
                  border: '1px solid rgba(255, 255, 255, 0.07)'
                }}
              >
                {topic}
              </span>
            ))}
          </div>

          {/* TIME LIMIT SELECTOR DROPDOWN (COOL GLASSMORPHIC UI - NOT CHOPPED) */}
          <div ref={dropdownRef} style={{ marginTop: 'auto', marginBottom: '1.25rem', position: 'relative' }}>
            <label style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '0.4rem' }}>
              Select Time Limit
            </label>

            {/* Custom Interactive Dropdown Trigger Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              style={{
                width: '100%',
                padding: '0.6rem 0.85rem',
                borderRadius: '10px',
                background: isDropdownOpen ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.05)',
                border: isDropdownOpen ? `1px solid ${category.color}` : '1px solid rgba(255, 255, 255, 0.14)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isDropdownOpen ? `0 0 16px ${category.glowColor}` : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <div 
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    background: `${category.color}20`,
                    border: `1px solid ${category.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: category.color
                  }}
                >
                  <ActiveIcon size={14} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                    {activeOption.label}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                    {activeOption.sublabel}
                  </div>
                </div>
              </div>

              <ChevronDown 
                size={18} 
                style={{ 
                  color: category.color,
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.25s ease',
                  flexShrink: 0,
                  marginLeft: '0.5rem'
                }} 
              />
            </button>

            {/* Formal Glassmorphic Options Menu (Opens DOWNWARD with elevated zIndex overlay) */}
            {isDropdownOpen && (
              <div 
                className="animate-fade-in"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: 0,
                  right: 0,
                  zIndex: 99999,
                  background: '#090e1a',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: `1px solid ${category.color}80`,
                  borderRadius: '12px',
                  padding: '0.35rem',
                  boxShadow: `0 20px 45px rgba(0, 0, 0, 0.95), 0 0 24px ${category.glowColor || 'rgba(56, 189, 248, 0.2)'}`,
                  maxHeight: '180px',
                  overflowY: 'auto'
                }}
              >
                {TIME_LIMIT_OPTIONS.map((opt) => {
                  const isSelected = selectedTime === opt.value;
                  const OptIcon = opt.icon;
                  return (
                    <div
                      key={opt.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTime(opt.value);
                        setIsDropdownOpen(false);
                      }}
                      style={{
                        padding: '0.55rem 0.75rem',
                        borderRadius: '8px',
                        background: isSelected ? `${category.color}25` : 'transparent',
                        border: isSelected ? `1px solid ${category.color}60` : '1px solid transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        marginBottom: '0.2rem'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <OptIcon size={15} color={isSelected ? category.color : '#94a3b8'} />
                        <div>
                          <div style={{ fontSize: '0.83rem', fontWeight: isSelected ? 700 : 600, color: isSelected ? '#ffffff' : '#cbd5e1' }}>
                            {opt.label}
                          </div>
                          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                            {opt.sublabel}
                          </div>
                        </div>
                      </div>

                      {isSelected && (
                        <Check size={16} color={category.color} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Action Button Controls Row */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {/* Main Quick Start Button */}
          <button
            onClick={handleStart}
            style={{
              flex: 1,
              background: isHovered ? category.gradient : 'rgba(255, 255, 255, 0.06)',
              color: isHovered ? '#ffffff' : '#e2e8f0',
              border: isHovered ? 'none' : '1px solid rgba(255, 255, 255, 0.14)',
              padding: '0.7rem 1rem',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: isHovered ? `0 6px 20px ${category.glowColor}` : 'none'
            }}
          >
            <span>
              {selectedTime === 'practice' 
                ? `Start Practice Quiz` 
                : `Start ${activeOption.badgeText} Quiz`}
            </span>
            <ArrowRight 
              size={17} 
              style={{ 
                transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                transition: 'transform 0.25s ease'
              }} 
            />
          </button>

          {/* Configure/Settings Button */}
          <button
            onClick={handleOpenModal}
            title="Configure advanced test options (Difficulty, Question Count)"
            style={{
              padding: '0.7rem 0.75rem',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#cbd5e1',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.color = '#cbd5e1';
            }}
          >
            <Sliders size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
