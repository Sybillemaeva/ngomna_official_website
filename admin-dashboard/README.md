# nGomna Admin Dashboard

A comprehensive admin dashboard for managing the nGomna website content, media, users, and analytics.

## Features

- **Content Management**: Edit website content across all pages and sections
- **Media Library**: Upload and manage images, videos, and other media files
- **User Management**: Manage website users and permissions
- **Analytics Dashboard**: View website performance metrics
- **Settings**: Configure system preferences

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3001`

4. Login with demo credentials:
   - Email: admin@ngomna.com
   - Password: admin123

## Project Structure

```
admin-dashboard/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts (Auth, etc.)
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── styles/         # CSS and styling files
│   └── main.jsx        # Application entry point
├── public/             # Static assets
└── package.json        # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Authentication

The dashboard includes a simple authentication system. In production, replace the mock authentication with your actual authentication service.

## Deployment

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.