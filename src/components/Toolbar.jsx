import React, { useState } from 'react';
import BranchDialog from './dialogs/BranchDialog';
import MergeDialog from './dialogs/MergeDialog';
import StashDialog from './dialogs/StashDialog';
import PushDialog from './dialogs/PushDialog';
import PullDialog from './dialogs/PullDialog';
import TagDialog from './dialogs/TagDialog';
import CommitDialog from './dialogs/CommitDialog';

function Toolbar({ repoPath, currentBranch, onRefresh }) {
  const [showBranchDialog, setShowBranchDialog] = useState(false);
  const [showMergeDialog, setShowMergeDialog] = useState(false);
  const [showStashDialog, setShowStashDialog] = useState(false);
  const [showPushDialog, setShowPushDialog] = useState(false);
  const [showPullDialog, setShowPullDialog] = useState(false);
  const [showTagDialog, setShowTagDialog] = useState(false);
  const [showCommitDialog, setShowCommitDialog] = useState(false);

  const handleFetch = async () => {
    const result = await window.electronAPI.gitFetch(repoPath, 'origin');
    if (result.success) {
      alert('Fetch completed successfully');
      onRefresh();
    } else {
      alert('Fetch failed: ' + result.error);
    }
  };

  return (
    <>
      <div className="toolbar">
        <button className="toolbar-btn" onClick={() => setShowCommitDialog(true)}>
          💾 Commit
        </button>
        <button className="toolbar-btn" onClick={() => setShowPullDialog(true)}>
          ⬇️ Pull
        </button>
        <button className="toolbar-btn" onClick={() => setShowPushDialog(true)}>
          ⬆️ Push
        </button>
        <button className="toolbar-btn" onClick={handleFetch}>
          🔄 Fetch
        </button>
        <button className="toolbar-btn" onClick={() => setShowBranchDialog(true)}>
          🌿 Branch
        </button>
        <button className="toolbar-btn" onClick={() => setShowMergeDialog(true)}>
          🔀 Merge
        </button>
        <button className="toolbar-btn" onClick={() => setShowStashDialog(true)}>
          📦 Stash
        </button>
        <button className="toolbar-btn" onClick={() => setShowTagDialog(true)}>
          🏷️ Tag
        </button>
      </div>

      {showBranchDialog && (
        <BranchDialog 
          repoPath={repoPath}
          onClose={() => setShowBranchDialog(false)}
          onRefresh={onRefresh}
        />
      )}
      {showMergeDialog && (
        <MergeDialog 
          repoPath={repoPath}
          currentBranch={currentBranch}
          onClose={() => setShowMergeDialog(false)}
          onRefresh={onRefresh}
        />
      )}
      {showStashDialog && (
        <StashDialog 
          repoPath={repoPath}
          onClose={() => setShowStashDialog(false)}
          onRefresh={onRefresh}
        />
      )}
      {showPushDialog && (
        <PushDialog 
          repoPath={repoPath}
          currentBranch={currentBranch}
          onClose={() => setShowPushDialog(false)}
          onRefresh={onRefresh}
        />
      )}
      {showPullDialog && (
        <PullDialog 
          repoPath={repoPath}
          currentBranch={currentBranch}
          onClose={() => setShowPullDialog(false)}
          onRefresh={onRefresh}
        />
      )}
      {showTagDialog && (
        <TagDialog 
          repoPath={repoPath}
          onClose={() => setShowTagDialog(false)}
          onRefresh={onRefresh}
        />
      )}
      {showCommitDialog && (
        <CommitDialog 
          repoPath={repoPath}
          onClose={() => setShowCommitDialog(false)}
          onRefresh={onRefresh}
        />
      )}
    </>
  );
}

export default Toolbar;
