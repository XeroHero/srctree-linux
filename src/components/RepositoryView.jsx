import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import CommitHistory from './CommitHistory';
import WorkingCopy from './WorkingCopy';
import DiffViewer from './DiffViewer';
import StatusBar from './StatusBar';

function RepositoryView({ repoPath }) {
  const [view, setView] = useState('history');
  const [status, setStatus] = useState(null);
  const [branches, setBranches] = useState({ local: null, remote: null });
  const [currentBranch, setCurrentBranch] = useState('');
  const [remotes, setRemotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [stashes, setStashes] = useState([]);
  const [selectedCommit, setSelectedCommit] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    loadRepositoryData();
  }, [repoPath, refreshTrigger]);

  const loadRepositoryData = async () => {
    // Load status
    const statusResult = await window.electronAPI.gitStatus(repoPath);
    if (statusResult.success) {
      setStatus(statusResult.data);
      setCurrentBranch(statusResult.data.current);
    }

    // Load branches
    const branchesResult = await window.electronAPI.gitBranches(repoPath);
    if (branchesResult.success) {
      setBranches(branchesResult.data);
    }

    // Load remotes
    const remotesResult = await window.electronAPI.gitRemotes(repoPath);
    if (remotesResult.success) {
      setRemotes(remotesResult.data);
    }

    // Load tags
    const tagsResult = await window.electronAPI.gitTags(repoPath);
    if (tagsResult.success) {
      setTags(tagsResult.data.all || []);
    }

    // Load stashes
    const stashesResult = await window.electronAPI.gitStashList(repoPath);
    if (stashesResult.success) {
      setStashes(stashesResult.data.all || []);
    }
  };

  const refresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="repo-view">
      <Sidebar 
        view={view}
        setView={setView}
        branches={branches}
        remotes={remotes}
        tags={tags}
        stashes={stashes}
        currentBranch={currentBranch}
        repoPath={repoPath}
        onRefresh={refresh}
      />
      <div className="main-content">
        <Toolbar 
          repoPath={repoPath}
          currentBranch={currentBranch}
          onRefresh={refresh}
        />
        <div className="content-area">
          {view === 'history' && (
            <CommitHistory 
              repoPath={repoPath}
              onSelectCommit={setSelectedCommit}
              selectedCommit={selectedCommit}
            />
          )}
          {view === 'working-copy' && (
            <WorkingCopy 
              repoPath={repoPath}
              status={status}
              onRefresh={refresh}
              onSelectFile={setSelectedFile}
            />
          )}
          {view === 'diff' && selectedFile && (
            <DiffViewer 
              repoPath={repoPath}
              filePath={selectedFile.path}
              staged={selectedFile.staged}
            />
          )}
          {view === 'diff' && selectedCommit && (
            <DiffViewer 
              repoPath={repoPath}
              commitHash={selectedCommit}
            />
          )}
        </div>
        <StatusBar 
          repoPath={repoPath}
          currentBranch={currentBranch}
          status={status}
        />
      </div>
    </div>
  );
}

export default RepositoryView;
