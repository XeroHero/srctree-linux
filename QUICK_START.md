# Quick Start Guide - SourceTree Linux

## Prerequisites Check

Before starting, ensure you have:
- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm or yarn installed (`npm --version` or `yarn --version`)
- [ ] Git installed (`git --version`)

## Installation Steps

### 1. Clone or Extract
```bash
# If cloning from GitHub
git clone <your-repo-url>
cd sourcetree-linux

# OR if using the zip file
unzip sourcetree-linux-source.zip
cd sourcetree-linux
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# OR using yarn
yarn install
```

This will install:
- Electron 33.0.0
- React 18.3.0
- Vite 6.0.0
- simple-git 3.25.0
- electron-builder 25.0.0

### 3. Run Development Mode

**Option A: Two Terminal Method**
```bash
# Terminal 1: Start Vite dev server
npm run dev
# Server will start at http://localhost:3000

# Terminal 2: Start Electron
npm run electron:dev
```

**Option B: Build and Run**
```bash
# Build the application
npm run build

# Run Electron with built files
npm run electron:dev
```

### 4. Build for Distribution
```bash
# Build everything and create AppImage
npm run dist

# The AppImage will be in: release/
```

## First Use

### Opening a Test Repository

1. **Option 1: Use existing Git repo**
   - Click "Open Existing"
   - Browse to any Git repository on your system
   - Click Open

2. **Option 2: Clone a repo**
   - Click "Clone"
   - Enter URL: `https://github.com/username/repo.git`
   - Enter destination path
   - Click "Clone Repository"

3. **Option 3: Create new repo**
   - Click "Create New"
   - Select an empty folder
   - Repository will be initialized

### Testing Features

#### Test Commit History
1. Open any Git repository
2. Click "History" in sidebar
3. View commits with visual branch graph

#### Test Working Copy
1. Make changes to a file in your repository
2. Click "Working Copy" in sidebar
3. See changed files listed
4. Click "Stage" next to a file
5. Click "Commit" in toolbar
6. Enter commit message and commit

#### Test Branching
1. Click "Branch" in toolbar
2. Enter new branch name: `test-branch`
3. Branch created and checked out
4. See new branch in sidebar

#### Test Remote Operations
1. Click "Fetch" to fetch updates
2. Click "Pull" to pull changes
3. Click "Push" to push commits

## Troubleshooting

### Issue: "Cannot find module 'electron'"
**Solution**: Run `npm install` or `yarn install`

### Issue: Vite dev server won't start
**Solution**: Check if port 3000 is available, or modify in `vite.config.js`

### Issue: Electron window is blank
**Solution**: 
1. Check if Vite dev server is running at http://localhost:3000
2. Or build first with `npm run build`

### Issue: Git operations fail
**Solution**: Ensure Git is installed and accessible in PATH

### Issue: AppImage build fails
**Solution**: Make sure you have write permissions in the project directory

## Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build React app for production |
| `npm run preview` | Preview production build |
| `npm run electron:dev` | Start Electron in development mode |
| `npm run electron:build` | Build Electron app |
| `npm run dist` | Build and package as AppImage |

## File Locations

- **User Data**: `~/.config/sourcetree-linux/`
- **Bookmarks**: `~/.config/sourcetree-linux/bookmarks.json`
- **Build Output**: `dist/`
- **Package Output**: `release/`

## Next Steps

After successful installation:
1. ✅ Open your main project repository
2. ✅ Bookmark frequently used repos
3. ✅ Explore commit history
4. ✅ Stage and commit changes
5. ✅ Create and switch branches
6. ✅ Push and pull from remotes

## Getting Help

- Check `PROJECT_SUMMARY.md` for detailed documentation
- Check `README.md` for feature overview
- Review component source in `src/components/`
- Check IPC handlers in `main.js`

---

**Happy Git-ing! 🚀**
