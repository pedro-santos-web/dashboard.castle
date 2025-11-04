# Dashboard Castle

Laravel dashboard application built with React, TypeScript, and Tailwind CSS.

## Features

### Authentication & Security
- **Authentication System** with Laravel Fortify
  - Regular authentication features (register user, login, reset password, etc)
  - Password confirmation for sensitive operations
  - Rate limiting and security measures
  - Two-factor authentication (2FA) with QR codes
  - Recovery codes for 2FA backup

### User Interface
- **Responsive Frontend** with React, TypeScript and Tailwind CSS
- **Inertia.js** for SPA experience
- **Dark/Light Mode** theme support

### Development Experience
- **TypeScript** for type safety
- **Vite** for fast development and building
- **Hot Module Replacement** for rapid development
- **Server-Side Rendering (SSR)** support

## Technology Stack

### Backend
- **PHP 8.4+** - Modern PHP features
- **Laravel 12** - PHP framework
- **Laravel Fortify** - Authentication backend
- **Inertia.js** - Server-side adapter

### Frontend
- **React 18** - UI library with modern hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool

## Requirements

- **PHP**: 8.4 or higher
- **Node.js**: 18 or higher
- **Composer**: Latest version
- **Database**: MySQL, PostgreSQL, SQLite, or SQL Server

## Build your own

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd dashboard-castle

# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install
```

### 2. Environment Setup

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure your database in .env file
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=dashboard_castle
# DB_USERNAME=root
# DB_PASSWORD=
```

### 3. Database Setup

```bash
# Run migrations
php artisan migrate

# (Optional) Seed the database
php artisan db:seed
```

### 4. Build Assets

```bash
# Development build
npm run dev

# Production build
npm run build

# With SSR support
npm run build:ssr
```

### 5. Start Development Server

```bash
# Start Laravel development server
php artisan serve

# In another terminal, start Vite dev server
npm run dev
```

Visit `http://localhost:8000` to see your application.

## Available Scripts

### PHP/Laravel Scripts
```bash
# Start development server
php artisan serve

# Run migrations
php artisan migrate

# Run tests
php artisan test
# or
./vendor/bin/pest

# Code style fixing
./vendor/bin/pint
```

### Node.js Scripts
```bash
# Development server
npm run dev

# Production build
npm run build

# SSR build
npm run build:ssr

# Code formatting
npm run format
npm run format:check

# Linting
npm run lint

# Type checking
npm run types
```

### Composer Scripts
```bash
# Complete setup (install, configure, build)
composer run setup

# Development setup
composer run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test
5. Commit your changes: `git commit -m "Add feature"`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Laravel](https://laravel.com/) - The PHP framework for web artisans
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Inertia.js](https://inertiajs.com/) - The modern monolith
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework

---

**Author**: [Pedro Santos](https://github.com/pedro-santos-web)
