# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a full-stack government services platform with three main components:

- **Frontend** (`front_end/`): React + Vite application with multi-language support (English/French)
- **Admin Dashboard** (`admin-dashboard/`): React + Vite CMS for content management
- **Backend** (`back_end/`): Node.js + Express API with PostgreSQL database

All frontend applications use:
- React 18 with TypeScript support
- Material-UI and Tailwind CSS for styling
- React Router for navigation
- Vite as the build tool

## Development Commands

### Frontend (Port 5173)
```bash
cd front_end
npm install
npm run dev      # Development server
npm run build    # Production build
npm run lint     # ESLint
```

### Admin Dashboard (Port 3001)
```bash
cd admin-dashboard
npm install
npm run dev      # Development server
npm run build    # Production build
npm run lint     # ESLint
```

### Backend (Port 5000)
```bash
cd back_end
npm install
node server.js   # Start server (no dev script available)
```

## Database Configuration

PostgreSQL setup required:
- Host: localhost
- Port: 5433
- Database: ngomna
- Username: postgres
- Password: 12345

## Key Architecture Details

### Frontend Structure
- **Multi-language support**: `src/translations/` contains `en.js` and `fr.js`
- **Page-based routing**: Individual pages in `src/pages/` for each government service
- **Component library**: Reusable components in `src/components/`
- **Context API**: State management in `src/contexts/`
- **Services**: API interaction layer in `src/services/`

### Backend Structure
- **MVC Pattern**: Controllers in `controllers/`, routes in `Routes/`
- **Database**: Sequelize ORM with PostgreSQL (`config/Database.js`)
- **API Documentation**: Swagger integration (`swagger.js`)
- **Controllers**: Separate controllers for content, links, media, menu, and pages

### Admin Dashboard
- **CMS functionality**: Content management for the main website
- **Same tech stack**: React + Material-UI + Tailwind CSS
- **Service layer**: API integration in `src/services/`

## Development Workflow

1. Start backend server first (`node server.js` in `back_end/`)
2. Start frontend (`npm run dev` in `front_end/`)  
3. Start admin dashboard if needed (`npm run dev` in `admin-dashboard/`)

## Code Standards

- Components should be under 200 lines
- Use proper ES6 imports/exports
- Follow established file organization patterns
- Use Tailwind CSS for styling consistency