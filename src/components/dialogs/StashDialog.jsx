import React, { useState } from 'react';

function StashDialog({ repoPath, onClose, onRefresh }) {
  const [message, setMessage] = useState('');

  const handleStash = async () => {
    const stashMessage = message || 'WIP';
    const result = await window.electronAPI.gitStashSave(repoPath, stashMessage);
    if (result.success) {
      onRefresh();
      onClose();
    } else {
      alert('Failed to stash changes: ' + result.error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Stash Changes</h2>
        <div className="form-group">
          <label>Stash Message (optional)</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Work in progress..."
          />
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleStash}>
            Stash
          </button>
        </div>
      </div>
    </div>
  );
}

export default StashDialog;
