# nGomna Project

A comprehensive government services platform consisting of three main components:

## Project Structure

```
├── front_end/          # Main website (React + Vite)
├── admin-dashboard/    # Admin CMS (React + Vite)
├── back_end/          # API server (Node.js + Express)
└── README.md
```

## Quick Start

### Frontend (Port 5173)
```bash
cd front_end
npm install
npm run dev
```

### Admin Dashboard (Port 3001)
```bash
cd admin-dashboard
npm install
npm run dev
```

### Backend API (Port 5000)
```bash
cd back_end
npm install
node server.js
```

## Features

- **Frontend**: Modern React website with multi-language support
- **Admin Dashboard**: Content management system for website administration
- **Backend API**: RESTful API with PostgreSQL database integration

## Database Setup

The backend uses PostgreSQL. Make sure you have PostgreSQL running on:
- Host: localhost
- Port: 5433
- Database: ngomna
- Username: postgres
- Password: 12345

## Environment Variables

Each component may require environment variables. Check individual directories for `.env.example` files.

## Development

1. Start the backend server first
2. Start the frontend development server
3. Start the admin dashboard (optional)

## Production Build

```bash
# Frontend
cd front_end && npm run build

# Admin Dashboard
cd admin-dashboard && npm run build
```

## Contributing

1. Keep components modular and under 200 lines
2. Follow the established file organization
3. Use proper imports/exports
4. Maintain consistent styling with Tailwind CSS

## License

© 2025 nGomna. All rights reserved.