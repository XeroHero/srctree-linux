import React from 'react';

function BranchGraph({ commits, currentIndex }) {
  // Simple branch visualization using colored dots
  const colors = ['#667eea', '#f56565', '#48bb78', '#ed8936', '#9f7aea'];
  const color = colors[currentIndex % colors.length];

  return (
    <svg width="60" height="40" style={{ overflow: 'visible' }}>
      {/* Draw line to next commit */}
      {currentIndex < commits.length - 1 && (
        <line 
          x1="15" 
          y1="20" 
          x2="15" 
          y2="60" 
          stroke={color} 
          strokeWidth="2"
        />
      )}
      {/* Draw commit dot */}
      <circle 
        cx="15" 
        cy="20" 
        r="5" 
        fill={color}
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
}

export default BranchGraph;
