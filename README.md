# Mavenberg Backend

A Node.js backend application built with Express.js and Sequelize ORM for managing sales, engineering logs, and user data. The application provides role-based access control and comprehensive analytics for sales and engineering data.

## Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Sales, Engineering)
- Secure password hashing with bcrypt
- Protected API endpoints

### Data Management
- Sales data tracking and analytics
- Engineering logs management
- Regional data organization
- Status-based tracking
- User management system

### Analytics & Visualization
- Time-series data analysis
- Regional performance metrics
- Status distribution analysis
- Cross-functional data comparison
- Role-specific dashboards

## Tech Stack

### Core Technologies
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Sequelize**: ORM for database operations
- **MySQL**: Database system

### Security & Authentication
- **JWT**: Token-based authentication
- **bcrypt**: Password hashing
- **CORS**: Cross-origin resource sharing

### Development Tools
- **nodemon**: Development server with hot reload
- **sequelize-cli**: Database migration and seeding

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/vikrantshitole/mavenberg-backend.git
cd mavenberg-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
PORT=3000
JWT_SECRET=your_jwt_secret
```

4. Run database migrations:
```bash
npm run migrate
```

5. Seed the database (optional):
```bash
npm run seed
```

## Available Scripts

- `npm start`: Start development server with nodemon
- `npm run migrate`: Run database migrations
- `npm run migrate:undo`: Undo last migration
- `npm run migrate:undo:all`: Undo all migrations
- `npm run seed`: Seed database with initial data
- `npm run seed:undo`: Remove seeded data

## Project Structure

```
mavenberg-backend/
├── config/           # Database and app configuration
├── controllers/      # Request handlers
│   ├── authController.js    # Authentication logic
│   └── userController.js    # User and data management
├── middleware/       # Custom middleware
├── migrations/       # Database migrations
├── models/          # Sequelize models
│   ├── users.js     # User model
│   ├── sales.js     # Sales model
│   ├── engineering_logs.js  # Engineering logs model
│   ├── regions.js   # Region model
│   └── statuses.js  # Status model
├── routes/          # API routes
│   ├── auth.js      # Authentication routes
│   └── users.js     # User and data routes
├── services/        # Business logic
│   ├── authService.js       # Authentication service
│   ├── userService.js       # User management service
│   ├── saleService.js       # Sales data service
│   └── engineeringLogsService.js  # Engineering logs service
├── utils/           # Utility functions
├── app.js           # Application entry point
└── package.json     # Project dependencies
```

## Data Models

### Users
- UUID primary key
- First name and last name
- Email (unique)
- Phone number
- Role association
- Password (hashed)

### Sales
- UUID primary key
- Sales amount
- Date
- Region association
- Status tracking
- User association
- Timestamps

### Engineering Logs
- UUID primary key
- Project details
- Region association
- Status tracking
- User association
- Timestamps

### Regions
- UUID primary key
- Region name
- Associated sales and engineering logs

### Statuses
- UUID primary key
- Status name
- Associated sales and engineering logs


## Error Handling

The application implements a centralized error handling system with:
- Standardized error responses
- HTTP status codes
- Error logging
- Custom error messages
- Error types:
  - Authentication errors
  - Authorization errors
  - Validation errors
  - Database errors
  - Server errors

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation
- Role-based access control
- Protected API endpoints

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 