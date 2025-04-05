# Technical Context

## Technology Stack
### Frontend
- Framework: Vite + React 18
- UI Library: shadcn/ui with Radix UI components
- Styling: Tailwind CSS with animations
- State Management: 
  * @tanstack/react-query for server state
  * React Hook Form for form management
- Routing: React Router DOM
- Charts: Recharts
- Type Safety: TypeScript
- Build Tools: Vite, SWC
- Code Quality: ESLint, Prettier
- Date Handling: date-fns
- Animations: Framer Motion

### Backend
- Framework: NestJS 11
- Language: TypeScript
- Database ORMs:
  * TypeORM for PostgreSQL
  * Mongoose for MongoDB
- Authentication:
  * Passport.js
  * JWT
  * Google Auth
  * Apple Sign-in
  * Facebook Auth
- File Storage: AWS S3
- Email: Nodemailer
- API Documentation: Swagger/OpenAPI
- Internationalization: nestjs-i18n
- Testing: Jest

### Database
- Primary: PostgreSQL for relational data
- Secondary: MongoDB for document data
- Migration Tools: TypeORM CLI
- Seeding System: Custom seeds via Hygen

### Infrastructure
- Containerization: Docker
- CI/CD: Docker Compose configurations
- Version Control: Git
- Package Management: npm/bun
- Process Management: Node.js
- File Storage: AWS S3
- Email Services: SMTP/Nodemailer
- Monitoring: Built-in NestJS tools

## Development Setup
### Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0
- Docker and Docker Compose
- Git
- PostgreSQL (for local development)
- MongoDB (for local development)
- AWS Account (for S3 storage)
- Metamask Wallet
- Code Editor (VSCode recommended)

### Installation Steps
1. Clone the repository
2. Frontend Setup:
   ```bash
   cd frontend
   npm install
   cp .env.example .env.local
   npm run dev
   ```
3. Backend Setup:
   ```bash
   cd backend
   npm install
   cp env-example-relational .env
   docker-compose up -d
   npm run migration:run
   npm run seed:run:relational
   npm run start:dev
   ```

### Configuration
#### Frontend Configuration
- Environment Variables:
  * VITE_API_URL: Backend API URL
  * VITE_WEB3_PROVIDER: Ethereum network provider
  * VITE_CONTRACT_ADDRESS: Smart contract address
  * VITE_GOOGLE_CLIENT_ID: Google OAuth client ID

#### Backend Configuration
- Database Configuration:
  * DATABASE_HOST
  * DATABASE_PORT
  * DATABASE_USERNAME
  * DATABASE_PASSWORD
  * DATABASE_NAME

- AWS S3 Configuration:
  * AWS_S3_ACCESS_KEY_ID
  * AWS_S3_SECRET_ACCESS_KEY
  * AWS_S3_BUCKET_NAME
  * AWS_S3_REGION

- Authentication:
  * JWT_SECRET
  * JWT_EXPIRES_IN
  * GOOGLE_CLIENT_ID
  * GOOGLE_CLIENT_SECRET

## Technical Constraints
### Performance Requirements
- Frontend:
  * First Contentful Paint < 1.5s
  * Time to Interactive < 3s
  * Bundle size optimization
  * Image optimization
  * Code splitting implementation

- Backend:
  * API response time < 500ms
  * Database query optimization
  * Caching implementation
  * Rate limiting configuration

### Security Requirements
- Authentication:
  * JWT token implementation
  * OAuth2 integration
  * Role-based access control
  * Input validation
  * XSS protection
  * CSRF protection

- Data Protection:
  * Encryption at rest
  * Secure communication (HTTPS)
  * Environment variable protection
  * File upload validation
  * Smart contract security

### Scalability Requirements
- Horizontal scaling capability
- Database connection pooling
- Caching strategies
- Load balancing support
- Microservices architecture readiness
- Smart contract gas optimization

## Dependencies
### Frontend Dependencies
- Core: react, react-dom
- Routing: react-router-dom
- UI Components: @radix-ui/* components
- Forms: react-hook-form, @hookform/resolvers
- State: @tanstack/react-query
- Styling: tailwindcss, tailwind-merge
- Utilities: clsx, date-fns, zod
- Charts: recharts
- Animations: framer-motion

### Backend Dependencies
- Core: @nestjs/* packages
- Database: typeorm, mongoose
- Authentication: passport, jwt, bcryptjs
- File Storage: @aws-sdk/client-s3
- Email: nodemailer
- Validation: class-validator, class-transformer
- Documentation: @nestjs/swagger
- Testing: jest, supertest

### External Services
- AWS S3 for file storage
- SMTP server for email
- Google OAuth for authentication
- Facebook OAuth for authentication
- Apple Sign-in for authentication
- Ethereum network for smart contracts
- MongoDB Atlas (optional for production)

## Development Workflow
1. Feature Branch Creation
2. Local Development
   - Frontend hot-reload
   - Backend development server
   - Database migrations
3. Testing
   - Unit tests
   - E2E tests
   - Contract testing
4. Code Review
5. CI/CD Pipeline
6. Deployment

## Deployment Process
1. Environment Setup
   - Configure environment variables
   - Setup database connections
   - Configure AWS services

2. Backend Deployment
   ```bash
   npm run build
   npm run migration:run
   npm run start:prod
   ```

3. Frontend Deployment
   ```bash
   npm run build
   # Deploy dist folder to hosting service
   ```

4. Infrastructure
   - Docker container deployment
   - Database migration execution
   - Smart contract deployment
   - DNS configuration
   - SSL certificate setup

## Revision History
- Initial creation: April 5, 2024
- Updated with comprehensive technical details: April 5, 2024 