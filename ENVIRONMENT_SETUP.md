# ========================================
# REJLERS Frontend - Environment Setup Guide
# ========================================
# This file provides instructions for setting up environment variables
# Follow this guide to configure your local development environment securely

## 🔐 Security First!
**NEVER commit `.env.local` or any file containing real API keys, passwords, or secrets to Git!**

## 📁 Environment Files Structure

### `.env.example` (✅ Safe to commit)
- Contains placeholder values for all required environment variables
- Serves as documentation for team members
- Use this as a template for your local environment

### `.env.local` (❌ NEVER commit)
- Your personal environment file with real values
- Copy from `.env.example` and replace placeholders with actual secrets
- Automatically ignored by Git (see .gitignore)

### `.env.production` (❌ NEVER commit)
- Production environment variables
- Should only exist on production servers
- Use your hosting platform's environment variable settings

## 🚀 Quick Setup Instructions

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local` with your real values:**
   - Replace `your_nextauth_secret_key_here` with a secure random string
   - Add your actual API keys for external services
   - Update database URLs with real credentials
   - Configure email service credentials

3. **Restart your development server:**
   ```bash
   npm run dev
   ```

## 🔑 Required Environment Variables

### Authentication
- `NEXTAUTH_SECRET`: Generate with: `openssl rand -base64 32`
- `NEXT_PUBLIC_AUTH_CLIENT_ID`: OAuth client ID from your provider
- `NEXT_PUBLIC_AUTH_REDIRECT_URI`: Your app's callback URL

### External Services
- `NEXT_PUBLIC_MAPS_API_KEY`: Google Maps or Mapbox API key
- `NEXT_PUBLIC_ANALYTICS_ID`: Google Analytics measurement ID

### Database (Optional - only if using API routes)
- `DATABASE_URL`: PostgreSQL connection string

### Email Service (Optional)
- `EMAIL_SMTP_*`: SMTP server configuration for sending emails

### File Storage (Optional)
- `AWS_*`: AWS credentials for file uploads

## ⚠️ Security Best Practices

1. **Never share `.env.local` files**
2. **Use different secrets for development, staging, and production**
3. **Regularly rotate API keys and secrets**
4. **Use your hosting platform's built-in environment variable management**
5. **Audit environment variables before deployments**

## 🛠️ Soft Coding Approach

This project uses a soft coding approach for environment management:
- All variables are centralized in `src/config/index.ts`
- Default values are provided for development
- Environment variables override defaults when present
- Type-safe configuration with proper fallbacks

## 🚨 Emergency Checklist

Before pushing to GitHub, ensure:
- [ ] `.env.local` is in `.gitignore`
- [ ] No real secrets in committed files
- [ ] `.env.example` contains only placeholder values
- [ ] All team members have access to this setup guide

## 📞 Need Help?

If you encounter issues with environment setup:
1. Check that your `.env.local` file exists in the root directory
2. Verify all required variables are set
3. Restart your development server
4. Check the console for any environment-related errors

---
**Remember: Security is everyone's responsibility! 🔒**