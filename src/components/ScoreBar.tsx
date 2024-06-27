import React from 'react';

interface ScoreBarProps {
  width: string;
  value: number;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ width, value }) => {
  return (
    <div
      style={{
        backgroundColor: '#d9d9d9',
        width: width,
        height: '8px',
        borderRadius: '5px',
        position: 'relative',
      }}
    >
      <span
        style={{
          backgroundColor: '#ffd388',
          borderRadius: `${value == 5 ? '5px' : '5px 0 0 5px'}`,
          width: `${value * 20}%`,
          height: '8px',
          position: 'absolute',
        }}
      ></span>
    </div>
  );
};

export default ScoreBar;
