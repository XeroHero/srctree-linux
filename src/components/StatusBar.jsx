import React from 'react';

function StatusBar({ repoPath, currentBranch, status }) {
  const ahead = status?.ahead || 0;
  const behind = status?.behind || 0;
  
  return (
    <div className="status-bar">
      <div className="status-bar-left">
        <span>📁 {repoPath}</span>
        <span>🌿 {currentBranch}</span>
      </div>
      <div className="status-bar-right">
        {ahead > 0 && <span>⬆️ {ahead} ahead</span>}
        {behind > 0 && <span>⬇️ {behind} behind</span>}
      </div>
    </div>
  );
}

export default StatusBar;
