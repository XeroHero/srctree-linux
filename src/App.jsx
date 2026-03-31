import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import RepositoryView from './components/RepositoryView';
import './App.css';

function App() {
  const [repositories, setRepositories] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    const result = await window.electronAPI.loadBookmarks();
    setBookmarks(result);
  };

  const saveBookmarks = async (newBookmarks) => {
    await window.electronAPI.saveBookmarks(newBookmarks);
    setBookmarks(newBookmarks);
  };

  const openRepository = (repoPath) => {
    const existing = repositories.find(r => r.path === repoPath);
    if (existing) {
      setActiveTab(repoPath);
      return;
    }

    const newRepo = { path: repoPath, name: repoPath.split('/').pop() };
    setRepositories([...repositories, newRepo]);
    setActiveTab(repoPath);

    // Add to bookmarks if not exists
    if (!bookmarks.find(b => b.path === repoPath)) {
      saveBookmarks([...bookmarks, newRepo]);
    }
  };

  const closeRepository = (repoPath) => {
    setRepositories(repositories.filter(r => r.path !== repoPath));
    if (activeTab === repoPath) {
      const remaining = repositories.filter(r => r.path !== repoPath);
      setActiveTab(remaining.length > 0 ? remaining[0].path : null);
    }
  };

  if (repositories.length === 0) {
    return <WelcomeScreen onOpenRepository={openRepository} bookmarks={bookmarks} />;
  }

  return (
    <div className="app">
      <div className="tabs-bar">
        {repositories.map(repo => (
          <div
            key={repo.path}
            className={`tab ${activeTab === repo.path ? 'active' : ''}`}
            onClick={() => setActiveTab(repo.path)}
          >
            <span className="tab-name">{repo.name}</span>
            <button
              className="tab-close"
              onClick={(e) => {
                e.stopPropagation();
                closeRepository(repo.path);
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {repositories.map(repo => (
        <div
          key={repo.path}
          style={{ display: activeTab === repo.path ? 'flex' : 'none', height: 'calc(100vh - 36px)' }}
        >
          <RepositoryView repoPath={repo.path} />
        </div>
      ))}
    </div>
  );
}

export default App;
