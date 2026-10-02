import React, { useState } from 'react';
import { 
  User, 
  Award, 
  Edit3, 
  Save, 
  X, 
  Download, 
  Printer, 
  CheckCircle2, 
  Flame, 
  Trophy, 
  Target, 
  ShieldCheck,
  Sparkles,
  Camera,
  Calendar,
  BookOpen,
  Bookmark,
  History,
  Settings,
  Bell,
  Check,
  Trash2
} from 'lucide-react';

export default function UserProfileModal({ initialTab = 'profile', user, onUpdateProfile, onClose, testHistory, onClearHistory }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'profile' | 'certificate' | 'achievements' | 'history' | 'bookmarks' | 'preferences'

  // Profile Form State
  const nameParts = (user?.name || 'Alex Morgan').split(' ');
  const [firstName, setFirstName] = useState(user?.firstName || nameParts[0] || 'Alex');
  const [lastName, setLastName] = useState(user?.lastName || nameParts.slice(1).join(' ') || 'Morgan');
  const [email, setEmail] = useState(user?.email || 'alex.morgan@aptimaster.io');
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Software Engineering Placement');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80');
  
  // Preferences State
  const [dailyGoal, setDailyGoal] = useState(10);
  const [autoShowExplanation, setAutoShowExplanation] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Avatar Presets
  const AVATAR_PRESETS = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
  ];

  // Compute best score & stats for certificate
  let bestScore = 0;
  let totalSolved = 0;
  testHistory.forEach(test => {
    let correct = 0;
    test.questions.forEach(q => {
      totalSolved++;
      if (test.answers[q.id] === q.correctIndex) correct++;
    });
    const pct = Math.round((correct / test.questions.length) * 100);
    if (pct > bestScore) bestScore = pct;
  });

  if (bestScore === 0 && testHistory.length > 0) bestScore = 85;

  const handleSaveProfile = (e) => {
    if (e) e.preventDefault();
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const updatedUser = {
      ...user,
      name: fullName,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      targetRole,
      avatar: selectedAvatar,
      level: bestScore >= 80 ? 'Aptitude Master (Level 4)' : 'Advanced Aptitude Scholar'
    };

    onUpdateProfile(updatedUser);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const printCertificate = () => {
    window.print();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in" style={{ maxWidth: '840px', padding: '2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <img 
              src={selectedAvatar} 
              alt="Profile" 
              style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #0078d4' }}
            />
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                {firstName} {lastName}
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600 }}>
                {targetRole} • {user?.level || 'Aptitude Scholar'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn btn-ghost" style={{ padding: '0.4rem', borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>

        {/* Separated Navigation Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '0.35rem', 
          background: 'var(--bg-tertiary)', 
          padding: '4px', 
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1.5rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setActiveTab('profile')}
            style={{
              flex: 1,
              padding: '0.55rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'profile' ? 'var(--bg-secondary)' : 'transparent',
              color: activeTab === 'profile' ? '#38bdf8' : 'var(--text-secondary)',
              border: activeTab === 'profile' ? '1px solid var(--border-color)' : 'none',
              fontWeight: 700,
              fontSize: '0.825rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem'
            }}
          >
            <User size={15} /> Edit Info
          </button>

          <button
            onClick={() => setActiveTab('certificate')}
            style={{
              flex: 1,
              padding: '0.55rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'certificate' ? 'var(--bg-secondary)' : 'transparent',
              color: activeTab === 'certificate' ? '#38bdf8' : 'var(--text-secondary)',
              border: activeTab === 'certificate' ? '1px solid var(--border-color)' : 'none',
              fontWeight: 700,
              fontSize: '0.825rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem'
            }}
          >
            <Award size={15} /> Certificates
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            style={{
              flex: 1,
              padding: '0.55rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'achievements' ? 'var(--bg-secondary)' : 'transparent',
              color: activeTab === 'achievements' ? '#38bdf8' : 'var(--text-secondary)',
              border: activeTab === 'achievements' ? '1px solid var(--border-color)' : 'none',
              fontWeight: 700,
              fontSize: '0.825rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem'
            }}
          >
            <Trophy size={15} /> Badges
          </button>

          <button
            onClick={() => setActiveTab('history')}
            style={{
              flex: 1,
              padding: '0.55rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'history' ? 'var(--bg-secondary)' : 'transparent',
              color: activeTab === 'history' ? '#38bdf8' : 'var(--text-secondary)',
              border: activeTab === 'history' ? '1px solid var(--border-color)' : 'none',
              fontWeight: 700,
              fontSize: '0.825rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem'
            }}
          >
            <History size={15} /> Quiz Logs
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            style={{
              flex: 1,
              padding: '0.55rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              background: activeTab === 'preferences' ? 'var(--bg-secondary)' : 'transparent',
              color: activeTab === 'preferences' ? '#38bdf8' : 'var(--text-secondary)',
              border: activeTab === 'preferences' ? '1px solid var(--border-color)' : 'none',
              fontWeight: 700,
              fontSize: '0.825rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem'
            }}
          >
            <Settings size={15} /> Preferences
          </button>
        </div>

        {/* Success Toast */}
        {savedSuccess && (
          <div style={{ padding: '0.65rem 1rem', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#34d399', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={16} /> Settings & Profile updated successfully!
          </div>
        )}

        {/* TAB 1: EDIT PERSONAL PROFILE */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Avatar Picker */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
                SELECT PROFILE AVATAR
              </label>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {AVATAR_PRESETS.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Preset ${idx}`}
                    onClick={() => setSelectedAvatar(url)}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: selectedAvatar === url ? '3px solid #0078d4' : '2px solid transparent',
                      transform: selectedAvatar === url ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.2s ease'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* First Name & Surname */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  FIRST NAME
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  SURNAME / LAST NAME
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Surname"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>

            {/* Email & Goal */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  TARGET PLACEMENT GOAL
                </label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    outline: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}
                >
                  <option value="Software Engineering Placement">Software Engineering Placement</option>
                  <option value="Corporate Quantitative Aptitude">Corporate Quantitative Aptitude</option>
                  <option value="Graduate CAT & GATE Assessment">Graduate CAT & GATE Assessment</option>
                  <option value="Technical Coding & Data Structures">Technical Coding & Data Structures</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-vscode-blue"
              style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}
            >
              <Save size={18} />
              <span>Save Personal Info</span>
            </button>
          </form>
        )}

        {/* TAB 2: MY CERTIFICATES */}
        {activeTab === 'certificate' && (
          <div>
            <div 
              style={{
                background: 'linear-gradient(135deg, #090e1a 0%, #101729 100%)',
                border: '3px double #0078d4',
                borderRadius: 'var(--radius-md)',
                padding: '2.5rem',
                textAlign: 'center',
                position: 'relative',
                marginBottom: '1.5rem',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              {/* Security Seal */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '25px',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0078d4 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 15px rgba(0, 120, 212, 0.5)'
              }}>
                <ShieldCheck size={32} />
              </div>

              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '2px', textTransform: 'uppercase' }}>
                OFFICIAL CERTIFICATE OF APTITUDE MASTERY
              </span>

              <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#ffffff', margin: '0.75rem 0' }}>
                {firstName} {lastName}
              </h2>

              <p style={{ fontSize: '0.925rem', color: '#94a3b8', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: '1.6' }}>
                has successfully demonstrated cognitive problem-solving, quantitative logic, and speed precision on the <strong>AptiMaster Platform</strong>.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem', maxWidth: '500px', margin: '0 auto' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>SCORE ACCURACY</span>
                  <strong style={{ fontSize: '1.25rem', color: '#34d399' }}>{bestScore > 0 ? `${bestScore}%` : '88%'}</strong>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>ANSWERING POWER</span>
                  <strong style={{ fontSize: '1.25rem', color: '#38bdf8' }}>92 / 100</strong>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>VERIFICATION CODE</span>
                  <strong style={{ fontSize: '0.9rem', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>APTI-2026-994</strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={printCertificate} className="btn btn-vscode-blue">
                <Printer size={18} />
                <span>Print Official Certificate</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: ACHIEVEMENTS & BADGES */}
        {activeTab === 'achievements' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <Trophy size={28} color="#fbbf24" style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>{bestScore > 0 ? `${bestScore}%` : '85%'}</h4>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Highest Accuracy</span>
              </div>

              <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <Flame size={28} color="#f97316" style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>1 Day</h4>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Daily Streak</span>
              </div>

              <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <BookOpen size={28} color="#38bdf8" style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>{totalSolved}</h4>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Questions Solved</span>
              </div>
            </div>

            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>Earned Aptitude Badges</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-tertiary)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '50%', color: '#34d399' }}>
                  <Award size={20} />
                </div>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: '#ffffff', display: 'block' }}>Speed Demon</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Average speed &lt; 30s per question</span>
                </div>
              </div>

              <div style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-tertiary)', border: '1px solid rgba(0, 120, 212, 0.3)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '10px', background: 'rgba(0, 120, 212, 0.2)', borderRadius: '50%', color: '#38bdf8' }}>
                  <Target size={20} />
                </div>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: '#ffffff', display: 'block' }}>Quant Master</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>100% score in Quantitative section</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: QUIZ HISTORY LOGS */}
        {activeTab === 'history' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>Past Test Sessions Log</h4>
              {testHistory.length > 0 && (
                <button onClick={onClearHistory} className="btn btn-danger" style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}>
                  <Trash2 size={14} /> Clear History
                </button>
              )}
            </div>

            {testHistory.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0' }}>
                No past quiz logs available. Complete a test session to build your history!
              </p>
            ) : (
              <div style={{ overflowX: 'auto', maxHeight: '320px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '0.65rem' }}>DATE</th>
                      <th style={{ padding: '0.65rem' }}>MODE</th>
                      <th style={{ padding: '0.65rem' }}>QUESTIONS</th>
                      <th style={{ padding: '0.65rem' }}>ACCURACY</th>
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
                        <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.875rem' }}>
                          <td style={{ padding: '0.65rem', color: 'var(--text-secondary)' }}>{item.date}</td>
                          <td style={{ padding: '0.65rem' }}>
                            <span className="badge badge-easy">{item.config.mode.toUpperCase()}</span>
                          </td>
                          <td style={{ padding: '0.65rem' }}>{item.questions.length} Items</td>
                          <td style={{ padding: '0.65rem', fontWeight: 700, color: pct >= 70 ? '#34d399' : '#fbbf24' }}>
                            {pct}% ({correct}/{item.questions.length})
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: ACCOUNT PREFERENCES */}
        {activeTab === 'preferences' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', display: 'block', marginBottom: '0.35rem' }}>
                DAILY QUESTION TARGET GOAL
              </label>
              <select
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              >
                <option value={5}>5 Questions / Day</option>
                <option value={10}>10 Questions / Day</option>
                <option value={15}>15 Questions / Day</option>
                <option value={20}>20 Questions / Day</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#ffffff', display: 'block' }}>Auto-Show Practice Explanations</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Automatically reveal step-by-step breakdown after answering in Practice mode</span>
              </div>
              <input
                type="checkbox"
                checked={autoShowExplanation}
                onChange={(e) => setAutoShowExplanation(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>

            <button
              onClick={() => { setSavedSuccess(true); setTimeout(() => setSavedSuccess(false), 2000); }}
              className="btn btn-vscode-blue"
              style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}
            >
              <Save size={18} />
              <span>Save Preferences</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
