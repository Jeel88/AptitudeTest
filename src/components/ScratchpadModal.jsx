import React, { useRef, useState, useEffect } from 'react';
import { Edit3, Eraser, Trash2, X, Download, Type } from 'lucide-react';

export default function ScratchpadModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('draw'); // 'draw' | 'text'
  const [notesText, setNotesText] = useState(() => localStorage.getItem('apti_scratch_text') || '');
  const [color, setColor] = useState('#6366f1');
  const [isErasing, setIsErasing] = useState(false);
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  // Initialize canvas
  useEffect(() => {
    if (activeTab === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      // Set resolution
      canvas.width = canvas.parentElement.clientWidth || 580;
      canvas.height = 340;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [activeTab]);

  const handleTextChange = (e) => {
    setNotesText(e.target.value);
    localStorage.setItem('apti_scratch_text', e.target.value);
  };

  // Canvas drawing functions
  const startDrawing = (e) => {
    isDrawingRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.strokeStyle = isErasing ? '#0f172a' : color;
    ctx.lineWidth = isErasing ? 20 : 3;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in" style={{ maxWidth: '640px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Edit3 size={20} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Interactive Scratchpad</h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Tabs */}
            <div style={{ background: 'var(--bg-tertiary)', padding: '3px', borderRadius: 'var(--radius-sm)', display: 'flex' }}>
              <button
                onClick={() => setActiveTab('draw')}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-sm)',
                  background: activeTab === 'draw' ? 'var(--accent-primary)' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Canvas
              </button>
              <button
                onClick={() => setActiveTab('text')}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-sm)',
                  background: activeTab === 'text' ? 'var(--accent-primary)' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Notes
              </button>
            </div>

            <button onClick={onClose} className="btn btn-ghost" style={{ padding: '0.4rem', borderRadius: '50%' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content area */}
        {activeTab === 'draw' ? (
          <div>
            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => setIsErasing(false)}
                  className={`btn ${!isErasing ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
                >
                  Pen
                </button>
                <button
                  onClick={() => setIsErasing(true)}
                  className={`btn ${isErasing ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
                >
                  <Eraser size={14} /> Eraser
                </button>

                {/* Colors */}
                {!isErasing && (
                  <div style={{ display: 'flex', gap: '0.35rem', marginLeft: '0.5rem' }}>
                    {['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#ffffff'].map((c) => (
                      <div
                        key={c}
                        onClick={() => setColor(c)}
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: c,
                          cursor: 'pointer',
                          border: color === c ? '2px solid #fff' : 'none',
                          transform: color === c ? 'scale(1.15)' : 'scale(1)'
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <button onClick={clearCanvas} className="btn btn-danger" style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}>
                <Trash2 size={14} /> Clear Canvas
              </button>
            </div>

            {/* Canvas Area */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: '#0f172a' }}>
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                style={{ width: '100%', height: '340px', cursor: isErasing ? 'crosshair' : 'pen', touchAction: 'none' }}
              />
            </div>
          </div>
        ) : (
          <div>
            <textarea
              value={notesText}
              onChange={handleTextChange}
              placeholder="Type your calculations, equations, or rough notes here..."
              style={{
                width: '100%',
                height: '340px',
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                background: '#090d16',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                resize: 'none',
                outline: 'none'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
