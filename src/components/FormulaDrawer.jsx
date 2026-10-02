import React, { useState } from 'react';
import { BookOpen, Search, X, Copy, Check } from 'lucide-react';
import { FORMULA_SHEET } from '../data/questionsData';

export default function FormulaDrawer({ onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedName, setCopiedName] = useState(null);

  const filteredCategories = FORMULA_SHEET.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  const handleCopy = (formulaText, name) => {
    navigator.clipboard.writeText(formulaText);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in" style={{ maxWidth: '720px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '8px', background: 'rgba(99, 102, 241, 0.15)', borderRadius: '10px', color: 'var(--accent-primary)' }}>
              <BookOpen size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Formula & Quick Concepts Cheat Sheet</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Key mathematical formulas and shortcut techniques</p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: '0.4rem', borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search formulas (e.g. Speed, Percentage, Work, Probability)..."
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.5rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              outline: 'none',
              fontSize: '0.9rem'
            }}
          />
        </div>

        {/* Categories List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '480px', overflowY: 'auto' }}>
          {filteredCategories.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0' }}>
              No formulas matching "{searchTerm}" found.
            </p>
          ) : (
            filteredCategories.map((cat, idx) => (
              <div key={idx}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {cat.category}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {cat.items.map((item, i) => (
                    <div 
                      key={i} 
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '1rem'
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
                          {item.name}
                        </strong>
                        <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                          {item.formula}
                        </code>
                      </div>
                      <button
                        onClick={() => handleCopy(item.formula, item.name)}
                        className="btn btn-ghost"
                        style={{ padding: '0.35rem', borderRadius: '6px', fontSize: '0.75rem' }}
                        title="Copy formula"
                      >
                        {copiedName === item.name ? <Check size={16} color="var(--accent-success)" /> : <Copy size={16} />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
