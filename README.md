# SourceTree Linux

A powerful Git GUI client for Linux, inspired by SourceTree for macOS/Windows.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Features

- **Multi-tab Repository Support** - Work with multiple repositories simultaneously
- **Visual Commit History** - Beautiful branch graph visualization
- **Working Copy Management** - Stage, unstage, and commit changes with ease
- **Diff Viewer** - View file changes with syntax highlighting
- **Branch Operations** - Create, merge, and switch branches
- **Remote Operations** - Push, pull, and fetch from remotes
- **Stash Management** - Save and apply work in progress
- **Tag Management** - Create and view tags
- **Bookmark System** - Quick access to recent repositories

## 📸 Screenshots

### Welcome Screen
Clean interface to open, clone, or create repositories with recent bookmarks.

### Commit History
Visual branch graph with detailed commit information.

### Working Copy
Intuitive file staging area with status indicators.

## 🛠️ Technology Stack

- **Electron 33** - Desktop application framework
- **React 18** - Modern UI library
- **Vite 6** - Lightning-fast build tool
- **simple-git 3.x** - Pure Node.js Git library
- **electron-builder** - Application packaging

## 📦 Installation

### Prerequisites
- Node.js 18+ or npm/yarn
- Git installed on your system

### Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd sourcetree-linux

# Install dependencies
npm install
# or
yarn install
```

## 🏃 Running the Application

### Development Mode
```bash
# Terminal 1: Start Vite dev server
npm run dev

# Terminal 2: Start Electron
npm run electron:dev
```

### Production Build
```bash
# Build the React application
npm run build

# Package as AppImage
npm run dist
```

The AppImage will be created in the `release/` directory.

## 📖 Usage Guide

### Opening a Repository

1. **Open Existing**: Browse and select a Git repository folder
2. **Clone**: Enter a remote URL and destination path
3. **Create New**: Initialize a new Git repository

### Working with Changes

1. Navigate to "Working Copy" in the sidebar
2. Stage individual files or use "Stage All"
3. Click "Commit" in the toolbar to commit changes
4. Write your commit message and confirm

### Managing Branches

- **Create**: Click "Branch" in toolbar and enter a name
- **Switch**: Click on any branch in the sidebar
- **Merge**: Click "Merge" and select a branch to merge

### Remote Operations

- **Push**: Share your commits with remote repository
- **Pull**: Fetch and merge changes from remote
- **Fetch**: Download remote changes without merging

## 🏗️ Architecture

### Security Pattern
The application uses Electron's recommended security pattern:
- **contextBridge**: Secure IPC communication
- **contextIsolation**: Renderer process isolation
- **No nodeIntegration**: Enhanced security

### IPC Handlers
All Git operations run in the main process via IPC handlers:
- Repository operations (clone, init, status, log)
- File operations (stage, unstage, commit, discard)
- Branch operations (create, delete, checkout, merge)
- Remote operations (push, pull, fetch)
- Stash operations (save, apply, drop, list)
- Tag operations (create, list)

### Component Structure
```
src/
├── App.jsx                    # Main application
├── components/
│   ├── WelcomeScreen.jsx     # Landing page
│   ├── RepositoryView.jsx    # Main repo interface
│   ├── CommitHistory.jsx     # Commit log
│   ├── WorkingCopy.jsx       # File staging
│   ├── DiffViewer.jsx        # Diff display
│   └── dialogs/              # Action dialogs
│       ├── BranchDialog.jsx
│       ├── CommitDialog.jsx
│       ├── MergeDialog.jsx
│       └── ...
```

## 📝 Project Structure

```
sourcetree-linux/
├── main.js                   # Electron main process
├── preload.js                # IPC bridge
├── index.html                # Entry HTML
├── package.json              # Dependencies
├── vite.config.js            # Vite config
├── README.md                 # This file
├── PROJECT_SUMMARY.md        # Detailed documentation
├── sourcetree-linux-source.zip  # Source code archive
└── src/                      # React application
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    └── components/
```

## 🎨 Theme

SourceTree-inspired professional theme:
- Clean light interface
- Purple gradient accents
- Color-coded status indicators
- Intuitive iconography

## 🔮 Roadmap

### Future Enhancements
- [ ] x86_64 and .deb packages
- [ ] Git flow integration
- [ ] SSH key management
- [ ] Conflict resolution UI
- [ ] Settings panel
- [ ] Search in history
- [ ] File history view
- [ ] Blame viewer
- [ ] Submodule support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by [SourceTree](https://www.sourcetreeapp.com/)
- Built with [Electron](https://www.electronjs.org/)
- Powered by [React](https://react.dev/)
- Uses [simple-git](https://github.com/steveukx/git-js)

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Made with ❤️ for the Linux community**
