import React, { useMemo } from 'react';

export default function BinaryBackground() {
  const binaryRows = useMemo(() => {
    const charSets = [
      "010111010010011010100111010100110101001011101001001101010011101010011010100",
      "110010101110010101110010101110010101110010101110010101110010101110010101110",
      "001101010011101010011010100101110100100110101001110101001101010010111010010",
      "101001110101001101010010111010010011010100111010100110101001011101001001101",
      "011100101011100101011100101011100101011100101011100101011100101011100101011",
      "100100110101001110101001101010010111010010011010100111010100110101001011101"
    ];
    const rows = [];
    for (let i = 0; i < 50; i++) {
      rows.push(charSets[i % charSets.length]);
    }
    return rows;
  }, []);

  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        userSelect: 'none',
        background: '#060913'
      }}
    >
      <div style={{
        fontFamily: "'Fira Code', 'Courier New', monospace",
        fontSize: '13px',
        lineHeight: '1.45',
        letterSpacing: '5px',
        color: 'rgba(56, 189, 248, 0.16)',
        whiteSpace: 'nowrap',
        opacity: 0.95,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {binaryRows.map((row, idx) => (
          <div key={idx} style={{ opacity: idx % 2 === 0 ? 0.95 : 0.75, overflow: 'hidden' }}>
            {row.repeat(6)}
          </div>
        ))}
      </div>
    </div>
  );
}
