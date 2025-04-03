# Apps Directory Structure

```
apps/
├── server/                        # Backend server application
│   ├── src/                      # Source code directory
│   │   ├── api/                  # API layer
│   │   │   ├── controllers/      # Request handlers
│   │   │   ├── middlewares/      # Custom middlewares
│   │   │   ├── routes/           # Route definitions
│   │   │   └── validators/       # Request validation
│   │   ├── config/               # Configuration files
│   │   │   ├── database/         # Database config
│   │   │   ├── logger/           # Logging config
│   │   │   └── env/             # Environment variables
│   │   ├── models/               # Data models
│   │   │   ├── entities/        # Database entities
│   │   │   ├── interfaces/      # TypeScript interfaces
│   │   │   └── dtos/           # Data transfer objects
│   │   ├── services/            # Business logic
│   │   │   ├── auth/           # Authentication services
│   │   │   ├── user/           # User management
│   │   │   └── core/           # Core business logic
│   │   └── utils/              # Helper functions
│   │       ├── constants/      # Constant values
│   │       ├── helpers/        # Utility functions
│   │       └── types/         # Custom type definitions
│   └── tests/                 # Test files
│       ├── unit/             # Unit tests
│       ├── integration/      # Integration tests
│       └── fixtures/         # Test data
├── web/                      # Frontend application
│   ├── src/                 # Source code directory
│   │   ├── assets/         # Static assets
│   │   │   ├── images/    # Image files
│   │   │   ├── styles/    # Global styles
│   │   │   └── fonts/     # Font files
│   │   ├── components/    # React components
│   │   │   ├── common/    # Shared components
│   │   │   ├── layouts/   # Layout components
│   │   │   └── features/  # Feature components
│   │   ├── hooks/         # Custom React hooks
│   │   │   ├── api/      # API integration hooks
│   │   │   └── common/   # Shared hooks
│   │   ├── pages/        # Page components
│   │   │   ├── auth/     # Authentication pages
│   │   │   ├── dashboard/# Dashboard pages
│   │   │   └── public/   # Public pages
│   │   ├── services/     # Frontend services
│   │   │   ├── api/     # API client
│   │   │   └── auth/    # Auth service
│   │   └── utils/       # Helper functions
│   │       ├── constants/# Constants
│   │       └── helpers/ # Utility functions
│   └── tests/          # Test files
│       ├── unit/      # Unit tests
│       └── e2e/      # End-to-end tests
```

## Directory Explanations

### Server Application (/server)
- **src/api/**: API layer implementation
  - `controllers/`: Handle HTTP requests and responses
  - `middlewares/`: Custom middleware functions
  - `routes/`: API route definitions
  - `validators/`: Request validation logic

- **src/config/**: Configuration management
  - `database/`: Database connection and settings
  - `logger/`: Logging configuration
  - `env/`: Environment variables management

- **src/models/**: Data modeling
  - `entities/`: Database entity definitions
  - `interfaces/`: TypeScript type definitions
  - `dtos/`: Data transfer objects

- **src/services/**: Business logic implementation
  - `auth/`: Authentication and authorization
  - `user/`: User-related operations
  - `core/`: Core business logic

- **src/utils/**: Utility functions and helpers
  - `constants/`: Application constants
  - `helpers/`: Common helper functions
  - `types/`: Custom type definitions

### Web Application (/web)
- **src/assets/**: Static resources
  - `images/`: Image files
  - `styles/`: Global CSS/SCSS
  - `fonts/`: Custom fonts

- **src/components/**: React components
  - `common/`: Reusable components
  - `layouts/`: Page layout components
  - `features/`: Feature-specific components

- **src/hooks/**: Custom React hooks
  - `api/`: API integration hooks
  - `common/`: Shared custom hooks

- **src/pages/**: Page components
  - `auth/`: Authentication pages
  - `dashboard/`: Dashboard views
  - `public/`: Public-facing pages

- **src/services/**: Frontend services
  - `api/`: API client configuration
  - `auth/`: Authentication service

- **src/utils/**: Utility functions
  - `constants/`: Frontend constants
  - `helpers/`: Helper functions

## Key Features
- Clean separation of concerns
- Modular architecture
- Type safety with TypeScript
- Testing infrastructure
- Scalable folder structure

## Best Practices
- Keep components small and focused
- Use consistent naming conventions
- Maintain separation of concerns
- Write tests for critical functionality
- Document complex logic and configurations
