const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const simpleGit = require('simple-git');

let mainWindow;
const userDataPath = app.getPath('userData');
const bookmarksPath = path.join(userDataPath, 'bookmarks.json');

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    title: 'SourceTree Linux',
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Helper function to get git instance
function getGit(repoPath) {
  return simpleGit(repoPath);
}

// Dialog handlers
ipcMain.handle('dialog:open-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
  });
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

// Bookmarks handlers
ipcMain.handle('bookmarks:load', async () => {
  try {
    const data = await fs.readFile(bookmarksPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
});

ipcMain.handle('bookmarks:save', async (event, bookmarks) => {
  try {
    await fs.writeFile(bookmarksPath, JSON.stringify(bookmarks, null, 2));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Git handlers
ipcMain.handle('git:log', async (event, repoPath, options = {}) => {
  try {
    const git = getGit(repoPath);
    const log = await git.log({
      maxCount: options.maxCount || 100,
      '--all': true,
      '--graph': true,
      '--decorate': true,
    });
    return { success: true, data: log };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:status', async (event, repoPath) => {
  try {
    const git = getGit(repoPath);
    const status = await git.status();
    return { success: true, data: status };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:diff-file', async (event, repoPath, filePath, staged = false) => {
  try {
    const git = getGit(repoPath);
    const diff = staged 
      ? await git.diff(['--cached', filePath])
      : await git.diff([filePath]);
    return { success: true, data: diff };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:diff-commit', async (event, repoPath, commitHash) => {
  try {
    const git = getGit(repoPath);
    const diff = await git.show([commitHash]);
    return { success: true, data: diff };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:commit-files', async (event, repoPath, message) => {
  try {
    const git = getGit(repoPath);
    await git.commit(message);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:stage', async (event, repoPath, files) => {
  try {
    const git = getGit(repoPath);
    await git.add(files);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:unstage', async (event, repoPath, files) => {
  try {
    const git = getGit(repoPath);
    await git.reset(['HEAD', ...files]);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:discard', async (event, repoPath, files) => {
  try {
    const git = getGit(repoPath);
    await git.checkout(files);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:branches', async (event, repoPath) => {
  try {
    const git = getGit(repoPath);
    const branches = await git.branchLocal();
    const remoteBranches = await git.branch(['-r']);
    return { 
      success: true, 
      data: {
        local: branches,
        remote: remoteBranches
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:branch-create', async (event, repoPath, branchName) => {
  try {
    const git = getGit(repoPath);
    await git.checkoutLocalBranch(branchName);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:branch-delete', async (event, repoPath, branchName) => {
  try {
    const git = getGit(repoPath);
    await git.deleteLocalBranch(branchName);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:checkout', async (event, repoPath, branchName) => {
  try {
    const git = getGit(repoPath);
    await git.checkout(branchName);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:merge', async (event, repoPath, branchName) => {
  try {
    const git = getGit(repoPath);
    await git.merge([branchName]);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:push', async (event, repoPath, remote, branch) => {
  try {
    const git = getGit(repoPath);
    await git.push(remote, branch);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:pull', async (event, repoPath, remote, branch) => {
  try {
    const git = getGit(repoPath);
    await git.pull(remote, branch);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:fetch', async (event, repoPath, remote) => {
  try {
    const git = getGit(repoPath);
    await git.fetch(remote);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:stash-list', async (event, repoPath) => {
  try {
    const git = getGit(repoPath);
    const stashList = await git.stashList();
    return { success: true, data: stashList };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:stash-save', async (event, repoPath, message) => {
  try {
    const git = getGit(repoPath);
    await git.stash(['save', message]);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:stash-apply', async (event, repoPath, stashIndex) => {
  try {
    const git = getGit(repoPath);
    await git.stash(['apply', `stash@{${stashIndex}}`]);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:stash-drop', async (event, repoPath, stashIndex) => {
  try {
    const git = getGit(repoPath);
    await git.stash(['drop', `stash@{${stashIndex}}`]);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:tags', async (event, repoPath) => {
  try {
    const git = getGit(repoPath);
    const tags = await git.tags();
    return { success: true, data: tags };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:tag-create', async (event, repoPath, tagName, message) => {
  try {
    const git = getGit(repoPath);
    await git.addTag(tagName);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:remotes', async (event, repoPath) => {
  try {
    const git = getGit(repoPath);
    const remotes = await git.getRemotes(true);
    return { success: true, data: remotes };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:config-get', async (event, repoPath, key) => {
  try {
    const git = getGit(repoPath);
    const value = await git.getConfig(key);
    return { success: true, data: value };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:clone', async (event, url, targetPath) => {
  try {
    await simpleGit().clone(url, targetPath);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('git:init', async (event, repoPath) => {
  try {
    const git = getGit(repoPath);
    await git.init();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
