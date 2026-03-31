import React, { useState } from 'react';

function PushDialog({ repoPath, currentBranch, onClose, onRefresh }) {
  const [remote, setRemote] = useState('origin');
  const [branch, setBranch] = useState(currentBranch);

  const handlePush = async () => {
    const result = await window.electronAPI.gitPush(repoPath, remote, branch);
    if (result.success) {
      alert('Push completed successfully');
      onRefresh();
      onClose();
    } else {
      alert('Push failed: ' + result.error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Push to Remote</h2>
        <div className="form-group">
          <label>Remote</label>
          <input
            type="text"
            value={remote}
            onChange={(e) => setRemote(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Branch</label>
          <input
            type="text"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handlePush}>
            Push
          </button>
        </div>
      </div>
    </div>
  );
}

export default PushDialog;
