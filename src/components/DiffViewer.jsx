import React, { useState, useEffect } from 'react';

function DiffViewer({ repoPath, filePath, staged, commitHash }) {
  const [diff, setDiff] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDiff();
  }, [repoPath, filePath, staged, commitHash]);

  const loadDiff = async () => {
    setLoading(true);
    let result;
    
    if (commitHash) {
      result = await window.electronAPI.gitDiffCommit(repoPath, commitHash);
    } else if (filePath) {
      result = await window.electronAPI.gitDiffFile(repoPath, filePath, staged);
    }
    
    if (result && result.success) {
      setDiff(result.data);
    }
    setLoading(false);
  };

  const parseDiff = (diffText) => {
    if (!diffText) return [];
    
    const lines = diffText.split('\n');
    return lines.map((line, idx) => {
      let type = 'normal';
      if (line.startsWith('+++') || line.startsWith('---') || line.startsWith('diff')) {
        type = 'header';
      } else if (line.startsWith('+')) {
        type = 'added';
      } else if (line.startsWith('-')) {
        type = 'removed';
      } else if (line.startsWith('@@')) {
        type = 'header';
      }
      
      return { type, content: line, index: idx };
    });
  };

  if (loading) {
    return <div className="loading">Loading diff...</div>;
  }

  if (!diff) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📄</div>
        <div className="empty-state-text">No changes to display</div>
      </div>
    );
  }

  const diffLines = parseDiff(diff);

  return (
    <div className="diff-viewer">
      {diffLines.map((line) => (
        <div key={line.index} className={`diff-line ${line.type}`}>
          <div className="diff-line-numbers">{line.index + 1}</div>
          <div className="diff-content">{line.content || ' '}</div>
        </div>
      ))}
    </div>
  );
}

export default DiffViewer;
