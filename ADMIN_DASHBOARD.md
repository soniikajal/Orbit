# Admin Dashboard

This document provides information about the admin dashboard functionality for the NSUT Survival Kit application.

## Overview

The admin dashboard is a protected interface that allows designated administrators (developers) to manage users, monitor contact form submissions, and view application analytics.

## Admin Access

### Admin Users
The following email addresses have admin privileges:
- kajal.soni@nsut.ac.in
- manik.bhushan@nsut.ac.in
- parkhi.mudgal@nsut.ac.in
- aastha.pandey@nsut.ac.in
- kushagra.kataria@nsut.ac.in

### Access Points
Admins can access the admin dashboard through:
1. **Header Navigation**: Admin button appears in the header for admin users
2. **Main Page**: "Admin Panel" button appears on the homepage for admin users
3. **Direct URL**: `/admin`

## Features

### 1. User Management
- View all registered users
- See user roles (admin/user)
- Monitor last login times
- User statistics

### 2. Contact Form Submissions
- View all contact form submissions
- Filter by type: Query, Feedback, Bug Report
- Update submission status (Pending, In Progress, Resolved)
- Track submission timestamps

### 3. Analytics Dashboard
- Total users count
- Total submissions count
- Pending issues count
- Resolved issues count
- Recent activity timeline

## Security

### Authentication
- Only authenticated users with valid @nsut.ac.in or @nsit.ac.in emails can access
- Admin role is checked at both JWT token and session levels
- Protected routes use NextAuth.js middleware

### Authorization
- Admin dashboard requires admin role
- Non-admin users are redirected to regular dashboard
- Role-based UI components (admin buttons only show for admins)

## File Structure

```
src/
├── app/
│   └── admin/
│       └── page.tsx           # Admin dashboard component
├── lib/
│   ├── admin.ts               # Admin utilities and mock data
│   └── auth.ts                # NextAuth configuration with admin logic
├── middleware.ts              # Route protection
└── types/
    └── next-auth.d.ts         # NextAuth type extensions
```

## Adding New Admins

To add a new admin user:
1. Open `src/lib/admin.ts`
2. Add the email address to the `ADMIN_EMAILS` array
3. The system will automatically grant admin privileges on next login

## Development

### Mock Data
The admin dashboard currently uses mock data for demonstration purposes. In a production environment, this would be replaced with actual database queries and APIs.

### API Integration
Future enhancements could include:
- Real-time user management
- Database integration for submissions
- Email notifications for new submissions
- Advanced analytics and reporting

## Usage

1. **Sign in** with an admin email address
2. **Navigate** to the admin dashboard via header button or main page
3. **Manage users** in the Users tab
4. **Review submissions** in the Contact Submissions tab
5. **Monitor analytics** in the Analytics tab

## Troubleshooting

If you cannot access the admin dashboard:
1. Ensure you're signed in with an admin email
2. Check that your email is in the `ADMIN_EMAILS` array
3. Clear browser cache and re-authenticate
4. Check server logs for authentication errors
