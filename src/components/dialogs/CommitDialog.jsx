import React, { useState } from 'react';

function CommitDialog({ repoPath, onClose, onRefresh }) {
  const [message, setMessage] = useState('');

  const handleCommit = async () => {
    if (message.trim()) {
      const result = await window.electronAPI.gitCommit(repoPath, message);
      if (result.success) {
        onRefresh();
        onClose();
      } else {
        alert('Failed to commit: ' + result.error);
      }
    } else {
      alert('Please enter a commit message');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Commit Changes</h2>
        <div className="form-group">
          <label>Commit Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter commit message..."
            autoFocus
          />
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleCommit}>
            Commit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommitDialog;
