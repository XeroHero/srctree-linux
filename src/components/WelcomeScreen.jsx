import React, { useState } from 'react';

function WelcomeScreen({ onOpenRepository, bookmarks }) {
  const [cloneUrl, setCloneUrl] = useState('');
  const [clonePath, setClonePath] = useState('');
  const [showClone, setShowClone] = useState(false);

  const handleOpenExisting = async () => {
    const path = await window.electronAPI.openFolder();
    if (path) {
      onOpenRepository(path);
    }
  };

  const handleClone = async () => {
    if (cloneUrl && clonePath) {
      const result = await window.electronAPI.gitClone(cloneUrl, clonePath);
      if (result.success) {
        onOpenRepository(clonePath);
      } else {
        alert('Clone failed: ' + result.error);
      }
    }
  };

  const handleNewRepo = async () => {
    const path = await window.electronAPI.openFolder();
    if (path) {
      const result = await window.electronAPI.gitInit(path);
      if (result.success) {
        onOpenRepository(path);
      } else {
        alert('Failed to initialize repository: ' + result.error);
      }
    }
  };

  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <h1>SourceTree Linux</h1>
        <p>A powerful Git GUI client for Linux</p>
        
        <div className="welcome-actions">
          <button className="welcome-btn" onClick={handleOpenExisting}>
            📂 Open Existing
          </button>
          <button className="welcome-btn" onClick={() => setShowClone(!showClone)}>
            🌐 Clone
          </button>
          <button className="welcome-btn" onClick={handleNewRepo}>
            ➕ Create New
          </button>
        </div>

        {showClone && (
          <div style={{ marginBottom: '40px' }}>
            <input
              type="text"
              placeholder="Repository URL"
              value={cloneUrl}
              onChange={(e) => setCloneUrl(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '12px', 
                marginBottom: '8px', 
                borderRadius: '4px',
                border: '2px solid white',
                fontSize: '14px'
              }}
            />
            <input
              type="text"
              placeholder="Destination Path"
              value={clonePath}
              onChange={(e) => setClonePath(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '12px', 
                marginBottom: '8px', 
                borderRadius: '4px',
                border: '2px solid white',
                fontSize: '14px'
              }}
            />
            <button className="welcome-btn" onClick={handleClone} style={{ width: '100%' }}>
              Clone Repository
            </button>
          </div>
        )}

        {bookmarks.length > 0 && (
          <div className="bookmarks-list">
            <h3>Recent Repositories</h3>
            {bookmarks.map((bookmark, idx) => (
              <div 
                key={idx} 
                className="bookmark-item"
                onClick={() => onOpenRepository(bookmark.path)}
              >
                <div className="bookmark-name">{bookmark.name}</div>
                <div className="bookmark-path">{bookmark.path}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WelcomeScreen;
