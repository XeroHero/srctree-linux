import React from 'react';

function Sidebar({ view, setView, branches, remotes, tags, stashes, currentBranch, repoPath, onRefresh }) {
  const handleBranchClick = async (branchName) => {
    const result = await window.electronAPI.gitCheckout(repoPath, branchName);
    if (result.success) {
      onRefresh();
    } else {
      alert('Failed to checkout branch: ' + result.error);
    }
  };

  const localBranches = branches.local?.all || [];
  const remoteBranches = branches.remote?.all || [];

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3>Workspace</h3>
        <div 
          className={`sidebar-item ${view === 'working-copy' ? 'active' : ''}`}
          onClick={() => setView('working-copy')}
        >
          📝 Working Copy
        </div>
        <div 
          className={`sidebar-item ${view === 'history' ? 'active' : ''}`}
          onClick={() => setView('history')}
        >
          📊 History
        </div>
      </div>

      <div className="sidebar-section">
        <h3>Branches</h3>
        {localBranches.map(branch => (
          <div 
            key={branch}
            className="sidebar-item"
            onClick={() => handleBranchClick(branch)}
            style={{ fontWeight: branch === currentBranch ? 'bold' : 'normal' }}
          >
            {branch === currentBranch ? '● ' : '○ '}{branch}
          </div>
        ))}
      </div>

      {remoteBranches.length > 0 && (
        <div className="sidebar-section">
          <h3>Remotes</h3>
          {remotes.map(remote => (
            <div key={remote.name} className="sidebar-item">
              🌐 {remote.name}
            </div>
          ))}
        </div>
      )}

      {tags.length > 0 && (
        <div className="sidebar-section">
          <h3>Tags</h3>
          {tags.slice(0, 10).map(tag => (
            <div key={tag} className="sidebar-item">
              🏷️ {tag}
            </div>
          ))}
        </div>
      )}

      {stashes.length > 0 && (
        <div className="sidebar-section">
          <h3>Stashes</h3>
          {stashes.map((stash, idx) => (
            <div key={idx} className="sidebar-item">
              📦 {stash.message || `Stash ${idx}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
