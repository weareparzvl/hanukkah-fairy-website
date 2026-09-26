# Deploy to Vercel

**Repo:** https://github.com/weareparzvl/hanukkah-fairy-website  
**Status:** Ready to deploy

---

## Quick Deploy

### Option 1: Vercel Dashboard (Recommended)

1. **Go to Vercel:** https://vercel.com/new
2. **Import Git Repository:**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Authorize GitHub (if needed)
   - Choose: `weareparzvl/hanukkah-fairy-website`
3. **Configure Project:**
   - **Framework Preset:** Other (static HTML)
   - **Root Directory:** `./` (leave as-is)
   - **Build Command:** (leave empty — no build needed)
   - **Output Directory:** `./` (leave as-is)
4. **Deploy:**
   - Click "Deploy"
   - Wait ~30 seconds
   - Site live at `hanukkah-fairy-website.vercel.app`

### Option 2: Vercel CLI

```bash
cd /Users/parzvl/hanukkah-fairy-website/site

# Install Vercel CLI (if needed)
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? weareparzvl (or your account)
# - Link to existing project? N
# - Project name? hanukkah-fairy-website
# - Directory? ./ (press Enter)
# - Override settings? N
```

---

## Custom Domain Setup

### After Initial Deploy:

1. **Go to project settings:**
   - Vercel Dashboard → Your project → Settings → Domains
2. **Add custom domain:**
   - Enter: `hanukkahfairy.com` (or your domain)
   - Click "Add"
3. **Configure DNS:**
   - **If using Cloudflare:**
     - Add CNAME: `@` → `cname.vercel-dns.com`
     - Add CNAME: `www` → `cname.vercel-dns.com`
   - **If using other DNS:**
     - Follow Vercel's specific instructions (shown after adding domain)
4. **SSL:**
   - Vercel auto-provisions SSL (Let's Encrypt)
   - Wait ~5 minutes for cert to provision

### Recommended Domain Settings:

- **Primary domain:** `hanukkahfairy.com`
- **Redirect:** `www.hanukkahfairy.com` → `hanukkahfairy.com`
- **SSL:** Automatic (Vercel handles)
- **Git branch:** `main` (production)

---

## Environment Variables

**None needed yet.**

When you add Mailchimp:
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add: `MAILCHIMP_API_KEY` (if using server-side integration)

For now, `MC_URL` goes directly in `js/site.js` (client-side JSONP).

---

## Deployment Settings

**Configured in `vercel.json`:**

```json
{
  "cleanUrls": true,           // /story instead of /story.html
  "trailingSlash": false,      // hanukkahfairy.com/story (no trailing /)
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"  // 1 year cache
        }
      ]
    },
    {
      "source": "/(.*\\.webp)",
      "headers": [
        {
          "key": "Content-Type",
          "value": "image/webp"
        }
      ]
    }
  ]
}
```

**What this does:**
- ✓ Assets cached for 1 year (immutable)
- ✓ WebP images served with correct MIME type
- ✓ Clean URLs (no `.html` extension)

---

## Post-Deploy Checklist

### Immediate (after deploy succeeds):

- [ ] **Visit site:** `https://hanukkah-fairy-website.vercel.app`
- [ ] **Test countdown:** Verify Oct 26, 2026 7:00am ET countdown works
- [ ] **Test mobile sticky CTA:** Scroll on mobile, verify bar appears
- [ ] **Check WebP images:** Open Network tab, verify `.webp` files load
- [ ] **Test scroll reveals:** Scroll down, verify sections fade in
- [ ] **Check animations:** Sparkles, bridge glow, menorah flicker
- [ ] **Test character cards:** Hover over cards, verify lift effect

### Before Custom Domain:

- [ ] **Update canonical URL:** Edit `index.html` line 14
  ```html
  <link rel="canonical" href="https://hanukkahfairy.com/">
  ```
- [ ] **Update OG/Twitter image URLs:** Make them absolute
  ```html
  <meta property="og:image" content="https://hanukkahfairy.com/assets/cover.webp">
  <meta name="twitter:image" content="https://hanukkahfairy.com/assets/cover.webp">
  ```
- [ ] **Commit + push changes**
- [ ] **Vercel auto-deploys** (connected to GitHub)

### Before Launch (Oct 26):

- [ ] **Add Mailchimp `MC_URL`** to `js/site.js`
- [ ] **Test email form** with real submission
- [ ] **Lighthouse audit:** Target 90+ performance, 100 accessibility
- [ ] **Mobile device testing:** iPhone, Android
- [ ] **Social preview test:** https://cards-dev.twitter.com/validator
- [ ] **Analytics setup:** Google Analytics or Plausible

---

## GitHub → Vercel Auto-Deploy

**Every push to `main` triggers:**
1. Vercel builds (instant — no build step)
2. Deploys to production
3. Invalidates CDN cache
4. Site live in ~10 seconds

**To deploy changes:**
```bash
cd /Users/parzvl/hanukkah-fairy-website/site
git add -A
git commit -m "Add Mailchimp integration"
git push origin main
# Vercel auto-deploys
```

**To preview changes first:**
```bash
git checkout -b feature/mailchimp
# make changes
git add -A
git commit -m "Add Mailchimp integration"
git push origin feature/mailchimp
# Vercel creates preview deployment
# Review at preview URL
# Merge to main when ready
```

---

## Rollback (if needed)

**Vercel Dashboard:**
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

**Git:**
```bash
git revert HEAD
git push origin main
```

---

## Monitoring

**Vercel Dashboard shows:**
- Deployment status (success/failed)
- Build logs
- Analytics (visits, top pages)
- Web Vitals (Core Web Vitals scores)

**Recommended additions:**
- Google Analytics or Plausible (privacy-focused)
- Sentry (error tracking, optional)
- Hotjar (heatmaps, optional)

---

## Performance Budget

**Current (production-ready):**
- HTML: 18KB ✓
- CSS: 20KB ✓
- JS: 7.3KB ✓
- Images: 1.2MB (WebP) ✓
- **Total:** ~1.3MB

**After Mailchimp:**
- Mailchimp embed script: ~15KB
- **Total:** ~1.32MB (still excellent)

**Lighthouse targets:**
- Performance: 90+ ✓
- Accessibility: 100 ✓
- Best Practices: 100 ✓
- SEO: 100 ✓

---

## Next Steps

1. **Deploy now:** Follow "Option 1: Vercel Dashboard" above
2. **Get deploy URL:** Copy from Vercel (e.g., `hanukkah-fairy-website.vercel.app`)
3. **Test site:** Run through post-deploy checklist
4. **Add custom domain:** (optional, can wait)
5. **Add Mailchimp:** When ready (doesn't block launch)

**Estimated time to live site:** 5 minutes

---

## Support

**Vercel Docs:** https://vercel.com/docs  
**Vercel Support:** https://vercel.com/help

**Common Issues:**

**Q: Assets not loading?**  
A: Check `vercel.json` is in root. Assets should be in `assets/` folder.

**Q: WebP images not working in Safari?**  
A: Safari 14+ supports WebP. Fallbacks (PNG/JPG) load automatically for older browsers via `<picture>` tags.

**Q: Countdown timer wrong timezone?**  
A: Timer uses `2026-10-26T07:00:00-04:00` (EDT). Browsers convert to user's local time.

**Q: Sticky CTA not appearing?**  
A: Mobile-only (hidden on desktop via CSS). Test at <768px width.

---

**Ready to deploy.** No build step, no dependencies, instant deploys.
