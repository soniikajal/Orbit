# NSUT Survival Kit - Authentication Setup

This project now includes a complete authentication system using NextAuth.js with Google OAuth, restricted to NSUT and NSIT email domains.

## Features

- ✅ Google OAuth authentication with domain restrictions (@nsut.ac.in and @nsit.ac.in)
- ✅ Custom sign-in and error pages
- ✅ Protected routes using middleware
- ✅ Auth buttons in header
- ✅ Dashboard for authenticated users
- ✅ Session management with NextAuth.js

## Setup Instructions

### 1. Install Dependencies (Already Done)

The following packages are already installed:
- `next-auth`
- `@auth/prisma-adapter`
- `prisma`
- `@prisma/client`

### 2. Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create OAuth 2.0 Client IDs
5. Set authorized redirect URIs to: `http://localhost:4028/api/auth/callback/google`
6. Copy the Client ID and Client Secret

### 3. Environment Variables

Update the `.env.local` file with your actual values:

```env
NEXTAUTH_URL=http://localhost:4028
NEXTAUTH_SECRET=your-secret-key-here-replace-with-a-strong-secret
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

### 4. Generate NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Copy the output and use it as your `NEXTAUTH_SECRET`.

## File Structure

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts  # NextAuth API route
│   ├── auth/
│   │   ├── signin/page.tsx              # Custom sign-in page
│   │   └── error/page.tsx               # Custom error page
│   ├── dashboard/page.tsx               # Protected dashboard
│   └── layout.tsx                       # Root layout with AuthProvider
├── components/
│   ├── auth/
│   │   ├── AuthProvider.tsx             # Session provider wrapper
│   │   ├── SignInButton.tsx             # Sign-in button component
│   │   └── SignOutButton.tsx            # Sign-out button component
│   └── common/
│       └── Header.tsx                   # Updated header with auth buttons
├── lib/
│   └── auth.ts                          # NextAuth configuration
└── middleware.ts                        # Route protection middleware
```

## Usage

### Sign In
- Users can sign in using the "Sign In" button in the header
- Only emails ending with `@nsut.ac.in` or `@nsit.ac.in` are allowed
- Redirected to custom sign-in page at `/auth/signin`

### Protected Routes
- `/dashboard` - Protected dashboard page
- Add more protected routes by updating the middleware `matcher` config

### Error Handling
- Custom error page at `/auth/error` handles authentication errors
- Specific messages for access denied (domain restriction)

## Development

1. Start the development server:
```bash
npm run dev
```

2. The app will be available at `http://localhost:4028`

3. Test the authentication:
   - Try signing in with a non-NSUT/NSIT email (should be denied)
   - Try signing in with a valid NSUT/NSIT email (should succeed)
   - Visit `/dashboard` to test protected routes

## Production Deployment

1. Update `NEXTAUTH_URL` in `.env.local` to your production URL
2. Update Google OAuth redirect URIs to include your production callback URL
3. Ensure all environment variables are set in your production environment

## Next Steps

- Add more protected pages/features
- Implement user profiles
- Add database integration with Prisma (optional)
- Customize the UI to match your design system
- Add more OAuth providers if needed
