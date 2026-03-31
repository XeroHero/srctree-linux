import React, { useState } from 'react';

function TagDialog({ repoPath, onClose, onRefresh }) {
  const [tagName, setTagName] = useState('');
  const [message, setMessage] = useState('');

  const handleCreate = async () => {
    if (tagName) {
      const result = await window.electronAPI.gitTagCreate(repoPath, tagName, message);
      if (result.success) {
        onRefresh();
        onClose();
      } else {
        alert('Failed to create tag: ' + result.error);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Create Tag</h2>
        <div className="form-group">
          <label>Tag Name</label>
          <input
            type="text"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            placeholder="v1.0.0"
          />
        </div>
        <div className="form-group">
          <label>Message (optional)</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Release version 1.0.0"
          />
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleCreate}>
            Create Tag
          </button>
        </div>
      </div>
    </div>
  );
}

export default TagDialog;
