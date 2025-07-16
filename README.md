Set-Location : Cannot find path 'D:\[01] Kushagra\[02] University\[00] Projects\NSUTOrbit\Orbit' because it does not exist.
At line:1 char:1
+ Set-Location 'D:\[01] Kushagra\[02] University\[00] Projects\NSUTOrbi ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : ObjectNotFound: (D:\[01] Kushagr...NSUTOrbit\Orbit:String) [Set-Location], ItemNotFoundException
    + FullyQualifiedErrorId : PathNotFound,Microsoft.PowerShell.Commands.SetLocationCommand# Orbit - NSUT Campus Platform

A comprehensive web platform for NSUT students to navigate campus life, connect with peers, and collaborate on projects.

## What is Orbit?

Orbit is designed to be the central hub for NSUT students. Whether you're looking for your next class, want to join a project, or need campus information, Orbit has you covered. Built by students, for students.

## Key Features

### 🗺️ Campus Navigation
- Interactive campus map with building locations
- Real-time pathfinding between locations
- Marker-based navigation system
- Full-screen map view for detailed exploration

### 🚀 Project Launchpad
- Submit and discover student projects
- Connect with teams looking for collaborators
- Filter projects by category and skills
- Direct contact with project creators
- Admin-moderated project approval system

### � Event Board
- View all upcoming campus events
- Filter events by category and date
- Event details with location and timing
- RSVP functionality for event participation
- Event organizer contact information

### 📚 Study Hub
- Access curated study materials and resources
- Notes and assignments from seniors and faculty
- Subject-wise resource organization
- File sharing and collaboration tools
- Exam schedules and important academic dates

### �📱 Essential Campus Tools
- **Academic Calendar** - Never miss important dates
- **Timetable** - Quick access to class schedules
- **Phonebook** - Find contact information easily
- **Survival Kit** - Campus tips and resources

### 🔐 Secure Authentication
- Google OAuth integration for NSUT students
- Role-based access control
- Admin dashboard for platform management
- Session management and security

### � Admin Management
- User management system
- Project approval workflow
- Contact form submissions handling
- Analytics and reporting dashboard

## Getting Started

### Requirements
- Node.js 14+ 
- npm or yarn

### Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (see `.env.local` for Google OAuth setup)
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Visit `http://localhost:4028`

## Project Structure

```
src/
├── app/                    # Next.js 14 app router
│   ├── admin/             # Admin dashboard
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── Launchpad/         # Project collaboration hub
│   ├── navigation/        # Campus navigation tools
│   ├── events/            # Event board and management
│   ├── study-hub/         # Study resources and materials
│   └── api/               # API endpoints
├── components/            # Reusable UI components
│   ├── auth/             # Authentication components
│   ├── map/              # Interactive map components
│   ├── events/           # Event display components
│   ├── study/            # Study hub components
│   └── ui/               # UI building blocks
├── lib/                  # Utility functions and config
└── styles/               # Global styles and CSS
```

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with Google OAuth
- **Maps**: Leaflet.js for interactive campus navigation
- **Database**: Currently using mock data (ready for real DB integration)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linter
- `npm run lint:fix` - Auto-fix linting issues

## Contributing

This project is built for the NSUT community. If you're a student and want to contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Admin Access

Admin features are restricted to approved NSUT email addresses. Contact the development team for admin access.

## Future Enhancements

- Real-time notifications for events and deadlines
- Advanced event management with booking system
- Peer-to-peer study group formation
- Resource rating and review system
- Mobile app development
- Integration with university systems
- Course material version control
- Study progress tracking

---

