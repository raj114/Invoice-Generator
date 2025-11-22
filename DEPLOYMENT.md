# GitHub Pages Deployment Guide

## Important: Repository Name Must Match

The `base` path in `vite.config.js` **MUST** match your GitHub repository name exactly.

### Current Configuration
- Base path: `/Invoice-Generator/`
- This means your repository must be named: `Invoice-Generator`

### If Your Repository Has a Different Name

1. Open `vite.config.js`
2. Change line 8: `const REPO_NAME = "Invoice-Generator";`
3. Replace `"Invoice-Generator"` with your actual repository name
4. Rebuild: `npm run build`
5. Redeploy

### Deployment Steps

#### Option 1: Using GitHub Actions (Recommended)

1. **Enable GitHub Pages:**
   - Go to your repository → Settings → Pages
   - Under "Source", select **"GitHub Actions"**

2. **Push your code:**
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages"
   git push origin main
   ```

3. **Check deployment:**
   - Go to the "Actions" tab in your repository
   - Wait for the workflow to complete
   - Your site will be at: `https://yourusername.github.io/Invoice-Generator/`

#### Option 2: Using gh-pages CLI

```bash
npm run deploy
```

Then in GitHub:
- Go to Settings → Pages
- Select "Deploy from a branch"
- Choose `gh-pages` branch and `/ (root)` folder

### Testing Locally

**For development (without base path):**
```bash
npm run dev
```

**For testing production build (with base path):**
```bash
npm run build
npm run preview
```
Then open: `http://localhost:4173/Invoice-Generator/`

### Troubleshooting 404 Errors

If you see `main.jsx:1 Failed to load resource: 404`:

1. **Check repository name matches:**
   - Your GitHub repo name must exactly match the `REPO_NAME` in `vite.config.js`
   - Case-sensitive!

2. **Rebuild after changing config:**
   ```bash
   npm run build
   ```

3. **Clear browser cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
   - Or clear cache in browser settings

4. **Verify deployment:**
   - Check that files in `dist/` folder are deployed
   - Verify the URL structure matches: `username.github.io/REPO_NAME/`

### Common Issues

- **404 on all assets:** Repository name doesn't match base path
- **White screen:** Check browser console for errors
- **Service worker errors:** Clear browser cache and service workers
- **Paths work locally but not on GitHub Pages:** Repository name mismatch

