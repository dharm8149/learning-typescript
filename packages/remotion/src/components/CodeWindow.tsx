import React from 'react';

interface CodeWindowProps {
  title?: string;
  code: string;
  highlightLine?: number;
  hasError?: boolean;
  errorMessage?: string;
}

export const CodeWindow: React.FC<CodeWindowProps> = ({
  title = "index.ts",
  code,
  highlightLine,
  hasError = false,
  errorMessage
}) => {
  const lines = code.split('\n');

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#0f172a',
      borderRadius: '16px',
      border: '1px solid #334155',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
      overflow: 'hidden',
      fontFamily: '"Fira Code", monospace, Consolas',
      color: '#e2e8f0',
      fontSize: '22px'
    }}>
      {/* Window Title Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 20px',
        backgroundColor: '#1e293b',
        borderBottom: '1px solid #334155'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }} />
        </div>
        <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 600 }}>{title}</span>
        <div style={{ width: '40px' }} />
      </div>

      {/* Code Body */}
      <div style={{ padding: '24px 28px', lineHeight: 1.7 }}>
        {lines.map((line, index) => {
          const lineNumber = index + 1;
          const isHighlighted = lineNumber === highlightLine;

          return (
            <div
              key={lineNumber}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: isHighlighted ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                borderLeft: isHighlighted ? '4px solid #3b82f6' : '4px solid transparent',
                paddingLeft: '12px',
                borderRadius: '4px'
              }}
            >
              <span style={{
                color: '#475569',
                userSelect: 'none',
                width: '40px',
                textAlign: 'right',
                marginRight: '20px',
                fontSize: '18px'
              }}>
                {lineNumber}
              </span>
              <span style={{ whiteSpace: 'pre', color: isHighlighted ? '#60a5fa' : '#e2e8f0' }}>
                {line}
              </span>
            </div>
          );
        })}

        {/* Animated Error Squiggle Tooltip */}
        {hasError && errorMessage && (
          <div style={{
            marginTop: '16px',
            padding: '12px 18px',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            borderRadius: '8px',
            color: '#fca5a5',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '20px' }}>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};
