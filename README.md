# Dashboard Castle

A modern, full-featured Laravel dashboard application built with React, TypeScript, and Tailwind CSS. This project combines Laravel's powerful backend with a React-powered frontend using Inertia.js for seamless single-page application experience.

## 🚀 Features

### Authentication & Security
- **Complete Authentication System** with Laravel Fortify
  - User registration and login
  - Email verification
  - Password reset functionality
  - Two-factor authentication (2FA) with QR codes
  - Password confirmation for sensitive operations
  - Recovery codes for 2FA backup
  - Rate limiting and security measures

### User Interface
- **Modern React Frontend** with TypeScript
- **Responsive Design** with Tailwind CSS v4
- **Component Library** powered by Radix UI primitives
- **Inertia.js** for seamless SPA experience
- **Dark/Light Mode** theme support
- **Mobile-first Navigation** with sidebar layouts

### Development Experience
- **TypeScript** for type safety
- **ESLint & Prettier** for code formatting
- **Pest Testing Framework** for PHP tests
- **Vite** for fast development and building
- **Hot Module Replacement** for rapid development
- **Server-Side Rendering (SSR)** support

### Testing
- Comprehensive test suite with Pest
- Feature tests for authentication flows
- Settings management tests
- Two-factor authentication tests

## 🛠️ Technology Stack

### Backend
- **Laravel 12** - PHP framework
- **Laravel Fortify** - Authentication backend
- **Inertia.js Laravel Adapter** - Server-side adapter
- **PHP 8.2+** - Modern PHP features

### Frontend
- **React 18** - UI library with modern hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Headless UI** - Unstyled accessible components
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool

### Development Tools
- **Pest** - Testing framework
- **Laravel Pint** - Code style fixer
- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **React Compiler** - Optimize React performance

## 📋 Requirements

- **PHP**: 8.2 or higher
- **Node.js**: 18 or higher
- **Composer**: Latest version
- **Database**: MySQL, PostgreSQL, SQLite, or SQL Server

## 🚀 Quick Start

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

## 🔧 Available Scripts

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

## 📁 Project Structure

```
dashboard-castle/
├── app/                          # Laravel application code
│   ├── Actions/Fortify/         # Fortify action classes
│   ├── Http/Controllers/        # HTTP controllers
│   ├── Models/                  # Eloquent models
│   └── Providers/              # Service providers
├── config/                      # Configuration files
├── database/                    # Database migrations and seeders
├── resources/
│   ├── css/                    # Stylesheets
│   ├── js/                     # React/TypeScript frontend
│   │   ├── components/         # Reusable React components
│   │   ├── pages/             # Page components
│   │   ├── layouts/           # Layout components
│   │   ├── hooks/             # Custom React hooks
│   │   └── types/             # TypeScript type definitions
│   └── views/                 # Blade templates
├── routes/                     # Route definitions
├── tests/                      # Test files
└── public/                     # Public assets
```

## 🔐 Authentication Features

### Standard Authentication
- User registration with validation
- Secure login with rate limiting
- Email verification system
- Password reset via email
- Remember me functionality

### Two-Factor Authentication
- TOTP (Time-based One-Time Password) support
- QR code generation for authenticator apps
- Recovery codes for backup access
- Configurable confirmation requirements
- Secure setup and management interface

### Security Features
- Password confirmation for sensitive operations
- Rate limiting on authentication attempts
- CSRF protection
- Secure session management
- Input validation and sanitization

## 🎨 UI Components

The project includes a comprehensive set of UI components built with Radix UI:

- **Navigation**: Sidebar, breadcrumbs, navigation menus
- **Forms**: Input fields, selectors, checkboxes, labels
- **Feedback**: Alerts, tooltips, badges, spinners
- **Layout**: Cards, separators, sheets, dialogs
- **Data Display**: Avatars, icons, skeletons

## 🧪 Testing

Run the comprehensive test suite:

```bash
# Run all tests
./vendor/bin/pest

# Run specific test files
./vendor/bin/pest tests/Feature/Auth/
./vendor/bin/pest tests/Feature/Settings/

# Run with coverage
./vendor/bin/pest --coverage
```

Test coverage includes:
- Authentication flows
- Two-factor authentication
- Settings management
- User profile updates
- Password management

## 🚀 Deployment

### Production Build

```bash
# Install production dependencies
composer install --no-dev --optimize-autoloader

# Build production assets
npm ci
npm run build

# Optimize Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Environment Variables

Ensure these are set in production:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Database configuration
DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_DATABASE=your-db-name
DB_USERNAME=your-db-user
DB_PASSWORD=your-db-password

# Mail configuration for password resets
MAIL_MAILER=smtp
MAIL_HOST=your-mail-host
MAIL_PORT=587
MAIL_USERNAME=your-mail-username
MAIL_PASSWORD=your-mail-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yourdomain.com
MAIL_FROM_NAME="${APP_NAME}"
```

## 📖 Documentation

### Key Directories
- `resources/js/pages/` - Main page components
- `resources/js/components/ui/` - Reusable UI components  
- `resources/js/layouts/` - Layout wrapper components
- `app/Http/Controllers/Settings/` - Settings management
- `routes/settings.php` - Settings-related routes

### Customization
- Modify `tailwind.config.js` for design system changes
- Update `resources/js/components/ui/` for component styling
- Customize authentication views in `resources/js/pages/auth/`
- Add new settings in `resources/js/pages/settings/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run the test suite: `./vendor/bin/pest`
5. Commit your changes: `git commit -m "Add feature"`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Laravel](https://laravel.com/) - The PHP framework for web artisans
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Inertia.js](https://inertiajs.com/) - The modern monolith
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives
- [Pest](https://pestphp.com/) - An elegant PHP testing framework

---

Built with ❤️ using Laravel and React
