# 🚀 ARCC Website Deployment Guide

## Overview
This guide covers deploying your ARCC website to Web Hosting Canada shared hosting using various CI/CD approaches.

## 🎯 Deployment Options

### Option 1: GitHub Actions (Recommended - Full CI/CD)
**Best for:** Professional development, automatic deployments, team collaboration

#### Setup Steps:
1. **Push your code** to GitHub
2. **Add GitHub Secrets:**
   - Go to: Repository → Settings → Secrets and variables → Actions
   - Add: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`
3. **Automatic deployment** on every push to `develop` or `main`

#### Benefits:
- ✅ Automatic deployment on code changes
- ✅ Build validation before deployment
- ✅ Deployment history and rollback
- ✅ Team collaboration
- ✅ Professional workflow

---

### Option 2: Manual Deployment Script
**Best for:** More control, custom deployment logic

#### Usage:
```powershell
.\scripts\deploy.ps1 -FtpServer "yourdomain.com" -FtpUsername "username" -FtpPassword "password"
```

#### Benefits:
- ✅ Full control over deployment process
- ✅ Custom validation and checks
- ✅ Can integrate with other tools

---

### Option 3: Simple Package Scripts
**Best for:** Quick deployment, simple workflow

#### Commands:
```bash
npm run deploy:build      # Build only
npm run deploy:prepare    # Build + deployment instructions
npm run deploy:test       # Build + local test server
```

#### Benefits:
- ✅ Simple and quick
- ✅ No external dependencies
- ✅ Easy to remember

---

## 📋 Pre-Deployment Checklist

### ✅ Code Quality
- [ ] All tests pass
- [ ] No linting errors
- [ ] Build successful locally
- [ ] Blog posts reviewed

### ✅ Build Verification
- [ ] `npm run build` completes successfully
- [ ] `out/` directory contains all files
- [ ] Blog pages generated correctly
- [ ] Images and assets included

### ✅ Content Review
- [ ] Homepage content updated
- [ ] Blog posts ready
- [ ] Contact information current
- [ ] SEO meta tags complete

---

## 🚀 Deployment Process

### Step 1: Build the Project
```bash
npm run build
```

### Step 2: Verify Build Output
Check the `out/` directory contains:
- `index.html` (homepage)
- `blog/` directory with posts
- `_next/` directory with JavaScript
- All images and assets

### Step 3: Upload to Hosting
**Method A: File Manager (Web Hosting Canada)**
1. Login to your hosting control panel
2. Navigate to File Manager
3. Go to `public_html/` directory
4. Upload contents of `out/` folder

**Method B: FTP Client**
1. Use FileZilla, WinSCP, or similar
2. Connect to your hosting FTP
3. Navigate to `public_html/`
4. Upload `out/` folder contents

**Method C: GitHub Actions (Automatic)**
1. Push to `develop` or `main` branch
2. GitHub Actions will build and deploy automatically

---

## 🧪 Testing After Deployment

### ✅ Functionality Tests
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Blog listing page accessible
- [ ] Individual blog posts load
- [ ] Contact form functional
- [ ] Mobile responsive

### ✅ Performance Tests
- [ ] Page load speed
- [ ] Image optimization
- [ ] JavaScript bundle size
- [ ] Core Web Vitals

### ✅ SEO Tests
- [ ] Meta tags present
- [ ] Structured data
- [ ] Sitemap accessible
- [ ] Robots.txt configured

---

## 🔄 Update Process

### For Content Updates (Blog Posts):
1. **Add new `.mdx` files** to `content/blog/`
2. **Commit and push** to GitHub
3. **Automatic deployment** (if using GitHub Actions)
4. **Manual deployment** (if using scripts)

### For Code Updates:
1. **Make changes** to components
2. **Test locally** with `npm run dev`
3. **Build and test** with `npm run build`
4. **Deploy** using your chosen method

---

## 🚨 Troubleshooting

### Common Issues:

#### Build Fails
```bash
# Check for errors
npm run build

# Fix linting issues
npm run lint

# Clear cache
rm -rf .next out
npm run build
```

#### Deployment Issues
- **FTP Connection Failed**: Check credentials and server details
- **Files Not Uploading**: Verify directory permissions
- **Website Not Loading**: Check file paths and .htaccess

#### Blog Not Working
- **Posts Not Showing**: Verify MDX files are in `content/blog/`
- **Build Errors**: Check for syntax errors in MDX files
- **Routing Issues**: Verify `next.config.js` configuration

---

## 📚 Additional Resources

### Web Hosting Canada Specific:
- [Hosting Control Panel Guide](https://www.webhostingcanada.com/support/)
- [FTP Connection Details](https://www.webhostingcanada.com/support/ftp/)
- [File Manager Tutorial](https://www.webhostingcanada.com/support/file-manager/)

### Next.js Static Export:
- [Static Export Documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Deployment Best Practices](https://nextjs.org/docs/app/building-your-application/deploying)

---

## 🎉 Success Metrics

After deployment, you should have:
- ✅ **Fast-loading website** (< 3 seconds)
- ✅ **Fully functional blog** with MDX support
- ✅ **Mobile-responsive design**
- ✅ **SEO-optimized content**
- ✅ **Professional appearance**

---

## 📞 Support

If you encounter issues:
1. **Check the logs** in your hosting control panel
2. **Verify file permissions** (usually 644 for files, 755 for directories)
3. **Test locally** before deploying
4. **Contact support** if hosting-related issues persist

---

**Happy Deploying! 🚀**
