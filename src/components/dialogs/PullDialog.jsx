import React, { useState } from 'react';

function PullDialog({ repoPath, currentBranch, onClose, onRefresh }) {
  const [remote, setRemote] = useState('origin');
  const [branch, setBranch] = useState(currentBranch);

  const handlePull = async () => {
    const result = await window.electronAPI.gitPull(repoPath, remote, branch);
    if (result.success) {
      alert('Pull completed successfully');
      onRefresh();
      onClose();
    } else {
      alert('Pull failed: ' + result.error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Pull from Remote</h2>
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
          <button className="btn btn-primary" onClick={handlePull}>
            Pull
          </button>
        </div>
      </div>
    </div>
  );
}

export default PullDialog;
