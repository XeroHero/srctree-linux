const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Dialog
  openFolder: () => ipcRenderer.invoke('dialog:open-folder'),
  
  // Bookmarks
  loadBookmarks: () => ipcRenderer.invoke('bookmarks:load'),
  saveBookmarks: (bookmarks) => ipcRenderer.invoke('bookmarks:save', bookmarks),
  
  // Git operations
  gitLog: (repoPath, options) => ipcRenderer.invoke('git:log', repoPath, options),
  gitStatus: (repoPath) => ipcRenderer.invoke('git:status', repoPath),
  gitDiffFile: (repoPath, filePath, staged) => ipcRenderer.invoke('git:diff-file', repoPath, filePath, staged),
  gitDiffCommit: (repoPath, commitHash) => ipcRenderer.invoke('git:diff-commit', repoPath, commitHash),
  gitCommit: (repoPath, message) => ipcRenderer.invoke('git:commit-files', repoPath, message),
  gitStage: (repoPath, files) => ipcRenderer.invoke('git:stage', repoPath, files),
  gitUnstage: (repoPath, files) => ipcRenderer.invoke('git:unstage', repoPath, files),
  gitDiscard: (repoPath, files) => ipcRenderer.invoke('git:discard', repoPath, files),
  
  // Branch operations
  gitBranches: (repoPath) => ipcRenderer.invoke('git:branches', repoPath),
  gitBranchCreate: (repoPath, branchName) => ipcRenderer.invoke('git:branch-create', repoPath, branchName),
  gitBranchDelete: (repoPath, branchName) => ipcRenderer.invoke('git:branch-delete', repoPath, branchName),
  gitCheckout: (repoPath, branchName) => ipcRenderer.invoke('git:checkout', repoPath, branchName),
  gitMerge: (repoPath, branchName) => ipcRenderer.invoke('git:merge', repoPath, branchName),
  
  // Remote operations
  gitPush: (repoPath, remote, branch) => ipcRenderer.invoke('git:push', repoPath, remote, branch),
  gitPull: (repoPath, remote, branch) => ipcRenderer.invoke('git:pull', repoPath, remote, branch),
  gitFetch: (repoPath, remote) => ipcRenderer.invoke('git:fetch', repoPath, remote),
  gitRemotes: (repoPath) => ipcRenderer.invoke('git:remotes', repoPath),
  
  // Stash operations
  gitStashList: (repoPath) => ipcRenderer.invoke('git:stash-list', repoPath),
  gitStashSave: (repoPath, message) => ipcRenderer.invoke('git:stash-save', repoPath, message),
  gitStashApply: (repoPath, stashIndex) => ipcRenderer.invoke('git:stash-apply', repoPath, stashIndex),
  gitStashDrop: (repoPath, stashIndex) => ipcRenderer.invoke('git:stash-drop', repoPath, stashIndex),
  
  // Tag operations
  gitTags: (repoPath) => ipcRenderer.invoke('git:tags', repoPath),
  gitTagCreate: (repoPath, tagName, message) => ipcRenderer.invoke('git:tag-create', repoPath, tagName, message),
  
  // Repository operations
  gitClone: (url, targetPath) => ipcRenderer.invoke('git:clone', url, targetPath),
  gitInit: (repoPath) => ipcRenderer.invoke('git:init', repoPath),
  
  // Config
  gitConfigGet: (repoPath, key) => ipcRenderer.invoke('git:config-get', repoPath, key),
});
