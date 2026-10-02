import React, { useState } from 'react';
import { 
  Flame,
  Zap,
  LogIn,
  LogOut,
  ChevronDown,
  BarChart3,
  User,
  Award,
  Trophy,
  History,
  Settings
} from 'lucide-react';

export default function Navbar({ 
  onNavigate,
  activeView,
  currentUser,
  onOpenAuthModal,
  onOpenProfileModal,
  onLogout,
  userStats
}) {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(6, 9, 19, 0.95)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0.75rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Left: Logo & Quiz Navigation Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {/* Logo */}
        <div 
          onClick={() => onNavigate('home')} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.65rem', 
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #0078d4 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(0, 120, 212, 0.4)'
          }}>
            <Zap size={20} fill="#ffffff" />
          </div>
          <span style={{ 
            fontSize: '1.2rem', 
            fontWeight: 800, 
            color: '#ffffff',
            letterSpacing: '-0.3px',
            fontFamily: 'var(--font-sans)'
          }}>
            AptiMaster
          </span>
        </div>

        {/* Quiz Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hide-mobile">
          <button 
            onClick={() => onNavigate('home')}
            className={`nav-link ${activeView === 'home' ? 'active' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate('practice')}
            className={`nav-link ${activeView === 'practice' ? 'active' : ''}`}
          >
            Practice Quizzes
          </button>
          <button 
            onClick={() => onNavigate('analytics')}
            className={`nav-link ${activeView === 'analytics' ? 'active' : ''}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => onNavigate('about')}
            className={`nav-link ${activeView === 'about' ? 'active' : ''}`}
          >
            About Us
          </button>
        </nav>
      </div>

      {/* Right Side: Streak Badge & Profile Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Daily Streak Badge */}
        <div 
          title="Current Daily Practice Streak"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            padding: '0.4rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            color: '#fbbf24',
            fontSize: '0.85rem',
            fontWeight: 700
          }}
        >
          <Flame size={16} fill="#fbbf24" color="#fbbf24" />
          <span>{userStats?.streak || 1} Day Streak</span>
        </div>

        {/* Log In Button / Profile Dropdown Menu */}
        {!currentUser ? (
          <button
            onClick={() => onOpenAuthModal('login')}
            className="btn btn-vscode-blue"
            style={{ padding: '0.5rem 1.1rem', fontSize: '0.875rem' }}
          >
            <LogIn size={16} />
            <span>Log In</span>
          </button>
        ) : (
          /* Separated Menu Options Dropdown */
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="btn btn-secondary"
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <img 
                src={currentUser.avatar} 
                alt="Avatar" 
                style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} 
              />
              <span style={{ fontWeight: 700, color: '#ffffff' }}>{currentUser.name}</span>
              <ChevronDown size={14} />
            </button>

            {userDropdownOpen && (
              <div 
                className="glass-panel"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '110%',
                  width: '240px',
                  padding: '0.75rem',
                  zIndex: 60,
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <div style={{ paddingBottom: '0.5rem', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                  <strong style={{ fontSize: '0.85rem', color: '#ffffff', display: 'block' }}>{currentUser.name}</strong>
                  <span style={{ fontSize: '0.75rem', color: '#38bdf8' }}>{currentUser.level}</span>
                </div>

                {/* Separated Options */}
                <button
                  onClick={() => { onOpenProfileModal('profile'); setUserDropdownOpen(false); }}
                  className="btn btn-ghost"
                  style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.85rem', padding: '0.4rem 0.6rem' }}
                >
                  <User size={15} /> Edit Personal Info
                </button>

                <button
                  onClick={() => { onOpenProfileModal('certificate'); setUserDropdownOpen(false); }}
                  className="btn btn-ghost"
                  style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.85rem', padding: '0.4rem 0.6rem' }}
                >
                  <Award size={15} /> My Certificates
                </button>

                <button
                  onClick={() => { onOpenProfileModal('achievements'); setUserDropdownOpen(false); }}
                  className="btn btn-ghost"
                  style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.85rem', padding: '0.4rem 0.6rem' }}
                >
                  <Trophy size={15} /> Badges & Achievements
                </button>

                <button
                  onClick={() => { onOpenProfileModal('history'); setUserDropdownOpen(false); }}
                  className="btn btn-ghost"
                  style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.85rem', padding: '0.4rem 0.6rem' }}
                >
                  <History size={15} /> Quiz History Logs
                </button>

                <button
                  onClick={() => { onNavigate('analytics'); setUserDropdownOpen(false); }}
                  className="btn btn-ghost"
                  style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.85rem', padding: '0.4rem 0.6rem' }}
                >
                  <BarChart3 size={15} /> Dashboard & Analytics
                </button>

                <button
                  onClick={() => { onOpenProfileModal('preferences'); setUserDropdownOpen(false); }}
                  className="btn btn-ghost"
                  style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.85rem', padding: '0.4rem 0.6rem' }}
                >
                  <Settings size={15} /> Account Preferences
                </button>

                <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.4rem 0' }} />

                <button
                  onClick={() => { onLogout(); setUserDropdownOpen(false); }}
                  className="btn btn-ghost"
                  style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.85rem', padding: '0.4rem 0.6rem', color: '#f87171' }}
                >
                  <LogOut size={15} /> Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
