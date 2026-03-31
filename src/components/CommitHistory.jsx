import React, { useState, useEffect } from 'react';
import BranchGraph from './BranchGraph';

function CommitHistory({ repoPath, onSelectCommit, selectedCommit }) {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCommits();
  }, [repoPath]);

  const loadCommits = async () => {
    setLoading(true);
    const result = await window.electronAPI.gitLog(repoPath, { maxCount: 100 });
    if (result.success) {
      setCommits(result.data.all || []);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="loading">Loading commit history...</div>;
  }

  if (commits.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📊</div>
        <div className="empty-state-text">No commits yet</div>
      </div>
    );
  }

  return (
    <div className="commit-history">
      {commits.map((commit, index) => (
        <div 
          key={commit.hash}
          className="commit-item"
          onClick={() => onSelectCommit(commit.hash)}
          style={{ 
            background: selectedCommit === commit.hash ? '#f0f0f8' : 'transparent'
          }}
        >
          <div className="commit-graph">
            <BranchGraph commits={commits} currentIndex={index} />
          </div>
          <div className="commit-details">
            <div className="commit-message">
              {commit.message}
              {commit.refs && commit.refs.includes('HEAD') && (
                <span className="branch-badge">HEAD</span>
              )}
            </div>
            <div className="commit-meta">
              <span className="commit-hash">{commit.hash.substring(0, 7)}</span>
              <span>{commit.author_name}</span>
              <span> • </span>
              <span>{new Date(commit.date).toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommitHistory;
