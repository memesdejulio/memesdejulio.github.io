# GitHub Pages Deployment Guide - July Meme Calendar

This guide explains how to deploy the July Meme Calendar to GitHub Pages with custom domain `memesdejulio.es`.

## Automatic Deployment (Recommended)

The repository is configured with GitHub Actions for automatic deployment to the custom domain.

### Setup

1. **Configure DNS for your custom domain:**
   - Add a CNAME record in your DNS provider pointing `memesdejulio.es` to `urielsalis.github.io`
   - Or add A records pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

2. **Enable GitHub Pages in your repository:**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `/ (root)`
   - Custom domain: `memesdejulio.es`
   - Enable "Enforce HTTPS"

3. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

4. **GitHub Actions will automatically:**
   - Build the project
   - Deploy to GitHub Pages
   - Your site will be available at: `https://memesdejulio.es`

## Manual Deployment

If you prefer to deploy manually:

```bash
# Build and deploy
npm run deploy
```

This will build the project and push the built files to the `gh-pages` branch.

## Local Testing

Test the production build locally:

```bash
# Build and preview
npm run serve
```

## Adding Memes Before Deployment

### 1. Add Meme Files

Place your meme images in the appropriate day directories:

```
public/memes/
├── 1/
│   ├── manifest.json
│   ├── morning-meme.jpg
│   └── coffee-meme.png
├── 2/
│   ├── manifest.json
│   └── tuesday-mood.gif
└── ...
```

### 2. Create Manifest Files

For each day with memes, create a `manifest.json`:

```json
{
  "memes": [
    {
      "filename": "morning-meme.jpg",
      "title": "Morning Motivation",
      "submittedBy": "Your Name"
    },
    {
      "filename": "coffee-meme.png",
      "title": "Coffee Time",
      "submittedBy": "Another User"
    }
  ]
}
```

### 3. Commit and Push

```bash
git add public/memes/
git commit -m "Add memes for July"
git push origin main
```

The site will automatically rebuild and deploy with your new memes!

## Configuration Details

### Repository Settings
- **Repository:** `urielsalis/july-meme-calendar`
- **Custom Domain:** `memesdejulio.es`
- **GitHub Pages URL:** `https://memesdejulio.es`
- **Base Path:** `/` (root, since using custom domain)

### Build Configuration
- **Build Command:** `npm run build`
- **Output Directory:** `dist/`
- **Node Version:** 18
- **CNAME File:** `public/CNAME` contains `memesdejulio.es`

### DNS Configuration

**For CNAME (recommended):**
```
Type: CNAME
Name: @
Value: urielsalis.github.io
```

**For A Records (alternative):**
```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

## Troubleshooting

### Site Not Loading
1. Check DNS propagation (can take up to 24 hours)
2. Verify CNAME file is present in `public/CNAME`
3. Check GitHub Actions tab for build errors
4. Ensure GitHub Pages is enabled with correct custom domain

### Custom Domain Issues
1. Verify DNS records are correctly configured
2. Check that "Enforce HTTPS" is enabled in GitHub Pages settings
3. Wait for SSL certificate generation (can take a few minutes)
4. Use `dig memesdejulio.es` to verify DNS resolution

### Memes Not Showing
1. Verify meme files are in `public/memes/{day}/` directories
2. Check manifest.json files are valid JSON
3. Ensure filenames in manifest match actual files
4. Check browser console for 404 errors

### Build Failures
1. Check GitHub Actions logs for specific errors
2. Test build locally: `npm run build`
3. Common issues:
   - Missing dependencies
   - Invalid JSON in manifest files
   - File permission issues

### Navigation Issues
The app uses React Router and should work correctly with the custom domain and HTTPS.

## Performance Tips

1. **Optimize Images:** Compress memes before adding them
   ```bash
   # Example using imagemin-cli
   npx imagemin public/memes/1/*.jpg --out-dir=public/memes/1/ --plugin=imagemin-mozjpeg
   ```

2. **Use WebP Format:** For better compression
3. **Keep File Sizes Small:** Under 2MB per image recommended

## Security & Privacy

- All files are publicly accessible via GitHub Pages
- HTTPS is enforced for the custom domain
- No server-side processing or databases
- Memes are served as static assets
- No user data collection or analytics

## Updates and Maintenance

- The site rebuilds automatically on every push to main
- Update memes by adding files and pushing changes
- No manual intervention needed for deployment
- Custom domain configuration persists across deployments via CNAME file 