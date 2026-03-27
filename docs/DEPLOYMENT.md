# Deployment Guide - Cuts & Comb Salon Website

This document provides instructions for deploying the Cuts & Comb salon website to production.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git repository access
- Hosting platform account (Vercel, Netlify, or AWS)

## Environment Variables

Before deploying, you need to configure the following environment variables. These should be set in your hosting platform's environment configuration or in a `.env.production` file.

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BOOKING_URL` | URL to your booking system (Fresha, Calendly, or Square) | `https://booking.fresha.com/your-salon` |
| `VITE_PHONE_NUMBER` | Salon phone number for click-to-call | `9994421126` |
| `VITE_WHATSAPP_NUMBER` | WhatsApp number with country code | `919994421126` |
| `VITE_INSTAGRAM_URL` | Instagram profile URL | `https://instagram.com/cutsandcomb` |
| `VITE_FACEBOOK_URL` | Facebook page URL | `https://facebook.com/cutsandcomb` |
| `VITE_GOOGLE_MAPS_EMBED_URL` | Google Maps embed URL | `https://maps.google.com/maps?q=Porur&output=embed` |
| `VITE_SALON_ADDRESS` | Salon address | `Porur, Chennai` |
| `VITE_SALON_CITY` | City name | `Chennai` |
| `VITE_SALON_STATE` | State name | `Tamil Nadu` |

### Getting Google Maps Embed URL

1. Go to [Google Maps](https://maps.google.com)
2. Search for your salon location
3. Click the "Share" button
4. Select "Embed a map" tab
5. Copy the `src` URL from the iframe code
6. Use this URL for `VITE_GOOGLE_MAPS_EMBED_URL`

## Deployment Options

### Option 1: Deploy to Vercel (Recommended)

Vercel provides automatic deployments, SSL certificates, and global CDN.

#### Steps:

1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Configure environment variables in the dashboard
   - Click "Deploy"

3. **Deploy via CLI**:
   ```bash
   vercel
   ```

4. **Set Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add all required variables listed above
   - Redeploy to apply changes

#### Vercel Configuration

The project includes a `vercel.json` file (if needed):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Option 2: Deploy to Netlify

Netlify offers similar features to Vercel with easy Git integration.

#### Steps:

1. **Deploy via Netlify Dashboard**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Add environment variables in Site Settings → Environment Variables
   - Click "Deploy site"

2. **Deploy via Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

#### Netlify Configuration

Create a `netlify.toml` file:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: Deploy to AWS S3 + CloudFront

For custom AWS deployment with full control.

#### Steps:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Create S3 Bucket**:
   - Go to AWS S3 Console
   - Create a new bucket
   - Enable static website hosting
   - Set bucket policy for public read access

3. **Upload files**:
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

4. **Create CloudFront Distribution**:
   - Go to CloudFront Console
   - Create distribution with S3 bucket as origin
   - Configure SSL certificate
   - Set default root object to `index.html`

5. **Configure Environment Variables**:
   - Create `.env.production` file locally
   - Build with production environment:
     ```bash
     npm run build
     ```

## Build Process

### Local Build

To create a production build locally:

```bash
# Install dependencies
npm install

# Run tests
npm test

# Create production build
npm run build

# Preview production build locally
npm run preview
```

### Build Output

The build process creates the following:

- **dist/**: Production-ready files
  - `index.html`: Main HTML file
  - `assets/js/`: JavaScript bundles (code-split by route)
  - `assets/css/`: Minified CSS files
  - `assets/images/`: Optimized images
  - Compressed versions (`.gz` and `.br`) for faster loading

### Build Optimizations

The production build includes:

- ✅ Code splitting by route (lazy loading)
- ✅ Minification of JavaScript and CSS
- ✅ Tree shaking (removes unused code)
- ✅ Gzip and Brotli compression
- ✅ Image optimization
- ✅ Source maps for debugging
- ✅ Console.log removal in production

## Performance Metrics

Target performance metrics (Requirements 9.1-9.4):

- **Mobile 4G Load Time**: ≤ 3 seconds
- **First Contentful Paint**: ≤ 1.5 seconds
- **Time to Interactive**: ≤ 3.5 seconds
- **Lighthouse Score**: ≥ 90

### Verifying Performance

After deployment, test performance using:

1. **Lighthouse** (Chrome DevTools):
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Run audit for mobile and desktop

2. **WebPageTest**:
   - Go to [webpagetest.org](https://webpagetest.org)
   - Enter your deployed URL
   - Test with 4G connection

3. **Google PageSpeed Insights**:
   - Go to [pagespeed.web.dev](https://pagespeed.web.dev)
   - Enter your deployed URL

## Updating Content

### Updating Services and Pricing

1. Edit `src/data/services.json`
2. Commit and push changes
3. Deployment platform will automatically rebuild

### Updating Offers

1. Edit `src/data/offers.json`
2. Update offer details, dates, and pricing
3. Commit and push changes

### Adding Gallery Images

1. Add images to `public/images/gallery/`
2. Update `src/data/gallery.json` with new image metadata
3. Ensure images are optimized (WebP format, <200KB)
4. Commit and push changes

### Image Optimization

Before adding images:

```bash
# Convert to WebP format
cwebp input.jpg -o output.webp -q 80

# Or use online tools:
# - squoosh.app
# - tinypng.com
```

## Domain Configuration

### Custom Domain Setup

#### Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificate is automatically provisioned

#### Netlify:
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS records
4. SSL certificate is automatically provisioned

### DNS Records

Typical DNS configuration:

```
Type: A
Name: @
Value: [Your hosting provider's IP]

Type: CNAME
Name: www
Value: [Your hosting provider's domain]
```

## Monitoring and Maintenance

### Error Tracking

Consider integrating error tracking:

- **Sentry**: For JavaScript error monitoring
- **LogRocket**: For session replay and debugging

### Analytics

The website can be integrated with:

- **Google Analytics**: For traffic tracking
- **Google Tag Manager**: For event tracking
- **Facebook Pixel**: For ad campaign tracking

### Regular Maintenance

- **Weekly**: Check for broken links and images
- **Monthly**: Review and update offers
- **Quarterly**: Update dependencies and security patches
- **Annually**: Review and optimize performance

## Rollback Procedure

If issues occur after deployment:

### Vercel/Netlify:
1. Go to Deployments page
2. Find the last working deployment
3. Click "Promote to Production"

### AWS:
1. Restore previous S3 bucket version
2. Invalidate CloudFront cache

## Troubleshooting

### Build Fails

**Issue**: Build fails with TypeScript errors
**Solution**: Run `npm run build` locally to identify errors

**Issue**: Missing environment variables
**Solution**: Verify all required variables are set in hosting platform

### Images Not Loading

**Issue**: Images return 404 errors
**Solution**: Ensure images are in `public/` directory and paths are correct

### Routing Issues

**Issue**: Direct URL access returns 404
**Solution**: Configure redirect rules (see Netlify/Vercel configuration above)

### Performance Issues

**Issue**: Slow load times
**Solution**: 
- Verify compression is enabled
- Check image sizes (<200KB)
- Review bundle sizes in build output
- Enable CDN caching

## Support

For deployment issues or questions:

- Check the [Vite documentation](https://vitejs.dev/guide/static-deploy.html)
- Review hosting platform documentation
- Contact your development team

## Security Checklist

Before going live:

- [ ] All environment variables are set correctly
- [ ] HTTPS is enabled (SSL certificate)
- [ ] Content Security Policy headers are configured
- [ ] No sensitive data in client-side code
- [ ] Dependencies are up to date
- [ ] Error messages don't expose sensitive information

## Post-Deployment Checklist

After deployment:

- [ ] Test all pages load correctly
- [ ] Verify booking system integration works
- [ ] Test WhatsApp button functionality
- [ ] Check click-to-call links work on mobile
- [ ] Verify social media links open correctly
- [ ] Test navigation on mobile and desktop
- [ ] Run Lighthouse audit
- [ ] Test on multiple browsers (Chrome, Safari, Firefox, Edge)
- [ ] Verify Google Maps embed displays correctly
- [ ] Check all images load properly
- [ ] Test form submissions (if applicable)

---

**Last Updated**: January 2024
**Version**: 1.0.0
