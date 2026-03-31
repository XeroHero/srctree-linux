import React, { useState } from 'react';

function WorkingCopy({ repoPath, status, onRefresh, onSelectFile }) {
  if (!status) {
    return <div className="loading">Loading working copy...</div>;
  }

  const unstagedFiles = [
    ...status.modified.map(f => ({ path: f, status: 'M' })),
    ...status.created.map(f => ({ path: f, status: 'A' })),
    ...status.deleted.map(f => ({ path: f, status: 'D' })),
  ];

  const stagedFiles = [
    ...status.staged.map(f => ({ path: f, status: 'M' })),
  ];

  const handleStage = async (files) => {
    const result = await window.electronAPI.gitStage(repoPath, files);
    if (result.success) {
      onRefresh();
    } else {
      alert('Failed to stage files: ' + result.error);
    }
  };

  const handleUnstage = async (files) => {
    const result = await window.electronAPI.gitUnstage(repoPath, files);
    if (result.success) {
      onRefresh();
    } else {
      alert('Failed to unstage files: ' + result.error);
    }
  };

  const handleDiscard = async (files) => {
    if (confirm('Are you sure you want to discard changes?')) {
      const result = await window.electronAPI.gitDiscard(repoPath, files);
      if (result.success) {
        onRefresh();
      } else {
        alert('Failed to discard changes: ' + result.error);
      }
    }
  };

  const handleStageAll = () => {
    handleStage(unstagedFiles.map(f => f.path));
  };

  const handleUnstageAll = () => {
    handleUnstage(stagedFiles.map(f => f.path));
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'M': return { label: 'M', class: 'modified' };
      case 'A': return { label: 'A', class: 'added' };
      case 'D': return { label: 'D', class: 'deleted' };
      default: return { label: '?', class: '' };
    }
  };

  return (
    <div className="working-copy">
      {stagedFiles.length > 0 && (
        <div className="file-section">
          <h3>
            Staged Files ({stagedFiles.length})
            <div className="section-actions">
              <button className="file-action-btn" onClick={handleUnstageAll}>
                Unstage All
              </button>
            </div>
          </h3>
          <div className="file-list">
            {stagedFiles.map((file, idx) => {
              const statusInfo = getStatusLabel(file.status);
              return (
                <div key={idx} className="file-item">
                  <div className={`file-status ${statusInfo.class}`}>
                    {statusInfo.label}
                  </div>
                  <div className="file-name" onClick={() => onSelectFile({ path: file.path, staged: true })}>
                    {file.path}
                  </div>
                  <div className="file-actions">
                    <button 
                      className="file-action-btn"
                      onClick={() => handleUnstage([file.path])}
                    >
                      Unstage
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {unstagedFiles.length > 0 && (
        <div className="file-section">
          <h3>
            Unstaged Files ({unstagedFiles.length})
            <div className="section-actions">
              <button className="file-action-btn" onClick={handleStageAll}>
                Stage All
              </button>
            </div>
          </h3>
          <div className="file-list">
            {unstagedFiles.map((file, idx) => {
              const statusInfo = getStatusLabel(file.status);
              return (
                <div key={idx} className="file-item">
                  <div className={`file-status ${statusInfo.class}`}>
                    {statusInfo.label}
                  </div>
                  <div className="file-name" onClick={() => onSelectFile({ path: file.path, staged: false })}>
                    {file.path}
                  </div>
                  <div className="file-actions">
                    <button 
                      className="file-action-btn"
                      onClick={() => handleStage([file.path])}
                    >
                      Stage
                    </button>
                    <button 
                      className="file-action-btn"
                      onClick={() => handleDiscard([file.path])}
                    >
                      Discard
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {unstagedFiles.length === 0 && stagedFiles.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">✨</div>
          <div className="empty-state-text">Working directory clean</div>
        </div>
      )}
    </div>
  );
}

export default WorkingCopy;
