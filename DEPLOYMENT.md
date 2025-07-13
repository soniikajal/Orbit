# Deployment Guide

## Environment Variables Setup

### For Vercel Deployment:

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Set Environment Variables**:
   ```bash
   vercel env add NEXTAUTH_URL
   # Enter: https://your-domain.vercel.app

   vercel env add NEXTAUTH_SECRET
   # Enter: a-strong-random-string-for-production

   vercel env add GOOGLE_CLIENT_ID
   # Enter: your-google-client-id

   vercel env add GOOGLE_CLIENT_SECRET
   # Enter: your-google-client-secret
   ```

4. **Deploy**:
   ```bash
   vercel --prod
   ```

### For Other Hosting Platforms:

#### Netlify:
- Go to Site settings → Environment variables
- Add the same environment variables

#### Heroku:
- Go to App settings → Config Vars
- Add the same environment variables

#### Railway/Render:
- Go to your project settings
- Add environment variables in the dashboard

## Google OAuth Setup for Production

1. **Go to Google Cloud Console**:
   - https://console.cloud.google.com/

2. **Update OAuth Consent Screen**:
   - Add your production domain to authorized domains

3. **Update OAuth 2.0 Client**:
   - Go to Credentials → Your OAuth 2.0 Client ID
   - Add authorized redirect URI: `https://your-domain.com/api/auth/callback/google`

4. **Test the authentication** on your live site

## Security Best Practices

- **Never commit `.env.local`** to version control
- **Use different OAuth credentials** for development and production (recommended)
- **Rotate secrets regularly** in production
- **Use strong, unique NEXTAUTH_SECRET** for each environment
