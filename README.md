# Fluxon - SaaS Hosting Platform

A clean minimal SaaS hosting dashboard built with Next.js, shadcn/ui, TailwindCSS, and PWA capabilities.

## Features

- **Next.js App Router** - Modern React framework with server-side rendering
- **shadcn/ui Components** - Beautiful, accessible UI components
- **TailwindCSS** - Utility-first CSS framework for rapid styling
- **PWA Support** - Progressive Web App with offline capabilities
- **Responsive Design** - Mobile-first, works great on all devices
- **Clean Dashboard** - Intuitive interface for managing hosting projects

## Pages

- `/` - Landing page with hero section and features
- `/auth/login` - Login page (GitHub OAuth placeholder)
- `/dashboard` - Main dashboard with project statistics
- `/dashboard/projects` - Projects list with add new project dialog
- `/dashboard/projects/[id]` - Individual project details and management
- `/dashboard/settings` - Account and team settings

## Components

- **Navbar** - Top navigation with brand and user menu
- **Sidebar** - Left navigation with dashboard links
- **ProjectCard** - Reusable project display component
- **AddProjectDialog** - Modal for creating new projects

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** JavaScript
- **Styling:** TailwindCSS + shadcn/ui
- **PWA:** next-pwa + manifest.json
- **Icons:** Emojis (easily replaceable with icon libraries)

## Project Structure

```
fluxon/
├── app/
│   ├── auth/login/page.js          # Login page
│   ├── dashboard/
│   │   ├── layout.js               # Dashboard layout
│   │   ├── page.js                 # Dashboard home
│   │   ├── projects/
│   │   │   ├── page.js             # Projects list
│   │   │   └── [id]/page.js        # Project details
│   │   └── settings/page.js        # Settings page
│   ├── globals.css                 # Global styles
│   ├── layout.js                   # Root layout
│   └── page.js                     # Landing page
├── components/
│   ├── navbar.jsx                  # Navigation component
│   ├── sidebar.jsx                 # Sidebar component
│   └── ui/                         # shadcn/ui components
├── public/
│   └── manifest.json               # PWA manifest
└── lib/
    └── utils.js                    # Utility functions
```

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy with one click

## PWA Features

- **Offline Support** - Works without internet connection
- **App-like Experience** - Can be installed on mobile devices
- **Fast Loading** - Optimized for performance
- **Responsive** - Adapts to any screen size

## Customization

### Colors & Branding

- Update the brand name in `components/navbar.jsx`
- Modify colors in `tailwind.config.js`
- Replace emoji icons with your preferred icon library

### Adding Features

- **Authentication:** Integrate with NextAuth.js for GitHub OAuth
- **Database:** Add Prisma or Supabase for data persistence
- **Real-time Updates:** Implement with Socket.io or Pusher
- **Analytics:** Integrate with Vercel Analytics or Google Analytics

## License

MIT License - feel free to use this project as a starting point for your own SaaS platform!
