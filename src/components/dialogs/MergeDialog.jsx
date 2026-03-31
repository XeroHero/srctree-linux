import React, { useState, useEffect } from 'react';

function MergeDialog({ repoPath, currentBranch, onClose, onRefresh }) {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    const result = await window.electronAPI.gitBranches(repoPath);
    if (result.success) {
      const allBranches = result.data.local?.all || [];
      setBranches(allBranches.filter(b => b !== currentBranch));
    }
  };

  const handleMerge = async () => {
    if (selectedBranch) {
      const result = await window.electronAPI.gitMerge(repoPath, selectedBranch);
      if (result.success) {
        alert('Merge completed successfully');
        onRefresh();
        onClose();
      } else {
        alert('Merge failed: ' + result.error);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Merge Branch</h2>
        <p style={{ fontSize: '13px', marginBottom: '16px' }}>
          Merge into: <strong>{currentBranch}</strong>
        </p>
        <div className="form-group">
          <label>Select Branch to Merge</label>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            style={{ width: '100%', padding: '8px', fontSize: '13px' }}
          >
            <option value="">-- Select Branch --</option>
            {branches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleMerge}>
            Merge
          </button>
        </div>
      </div>
    </div>
  );
}

export default MergeDialog;
