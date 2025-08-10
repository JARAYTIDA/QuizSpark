# replit.md

## Overview

QuizMaster Pro is a modern, interactive learning platform that provides comprehensive quiz experiences across multiple subjects. The application features a React-based frontend with a Node.js/Express backend, designed to support educational assessments from Class 1 through Class 12 and competitive examinations. The platform offers subject-specific quizzes with real-time scoring, progress tracking, and an intuitive user interface built with modern web technologies.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **UI Framework**: Shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for consistent theming
- **Animations**: Framer Motion for smooth transitions and interactive animations
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js for the web server
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **API Design**: RESTful API endpoints following conventional HTTP methods
- **Session Management**: Express session handling with PostgreSQL session store
- **Development**: Hot module replacement and development middleware integration

### Database Schema
- **Users**: Authentication and user profile management
- **Subjects**: Educational subjects with metadata (Hindi, English, Math, Science, etc.)
- **Question Banks**: Organized collections of questions by subject and class level
- **Questions**: Multiple-choice questions with options, correct answers, and explanations
- **Quiz Attempts**: User quiz sessions with scores, timing, and answer tracking

### Component Architecture
- **Layout Components**: Reusable navbar, footer, and page layout wrappers
- **UI Components**: Atomic design pattern with base components from Shadcn/ui
- **Page Components**: Feature-complete pages for different application routes
- **Animation Components**: Motion-enhanced wrappers for engaging user interactions
- **Form Components**: Type-safe form handling with validation

### Development Workflow
- **TypeScript**: Comprehensive type checking across frontend, backend, and shared schemas
- **Hot Reload**: Development server with instant updates for rapid iteration
- **Path Aliases**: Organized import system with @ and @shared aliases for clean code structure
- **Build Process**: Separate client and server builds with optimized production output

## External Dependencies

### Core Dependencies
- **Neon Database**: Serverless PostgreSQL hosting for scalable data storage
- **Radix UI**: Accessible UI primitives for consistent component behavior
- **TanStack React Query**: Robust data fetching and caching solution
- **Drizzle ORM**: Type-safe database operations with PostgreSQL support
- **Framer Motion**: Animation library for enhanced user experience

### Development Tools
- **Vite**: Modern build tool with development server and HMR
- **PostCSS**: CSS processing with Tailwind CSS integration
- **ESBuild**: Fast JavaScript bundling for production builds
- **TypeScript**: Static type checking and development tooling

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Inter Font**: Modern typography through Google Fonts integration
- **Lucide React**: Consistent icon system throughout the application
- **Class Variance Authority**: Dynamic CSS class generation for component variants

### Backend Services
- **Express.js**: Web application framework for API routes and middleware
- **Connect-pg-simple**: PostgreSQL session store for user authentication
- **Zod**: Runtime type validation for API endpoints and data schemas