import React, { useState } from 'react';

function BranchDialog({ repoPath, onClose, onRefresh }) {
  const [branchName, setBranchName] = useState('');

  const handleCreate = async () => {
    if (branchName) {
      const result = await window.electronAPI.gitBranchCreate(repoPath, branchName);
      if (result.success) {
        onRefresh();
        onClose();
      } else {
        alert('Failed to create branch: ' + result.error);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Create New Branch</h2>
        <div className="form-group">
          <label>Branch Name</label>
          <input
            type="text"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            placeholder="feature/my-feature"
            autoFocus
          />
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleCreate}>
            Create Branch
          </button>
        </div>
      </div>
    </div>
  );
}

export default BranchDialog;
