# System Patterns

## Architecture Overview
The Cyberk DApp follows a modern microservices architecture with clear separation of concerns:

### Frontend Layer
- Single Page Application (SPA) built with Vite + React
- Modern UI components using shadcn/ui and Radix UI
- State management with React Query and React Hook Form
- Responsive design with Tailwind CSS

### Backend Layer
- NestJS-based REST API service
- Support for both relational (PostgreSQL) and document (MongoDB) databases
- Authentication with JWT, Google, and Metamask
- File storage with AWS S3
- Email service integration

### Blockchain Layer
- Smart contracts for token management
- Integration with Ethereum network
- Web3 connectivity for wallet operations

## Design Patterns
### Frontend Patterns
- Component-based architecture using React
- Atomic design system with shadcn/ui
- Custom hooks for reusable logic
- Route-based code splitting
- Responsive design patterns

### Backend Patterns
- Repository pattern for data access
- Dependency injection with NestJS
- DTO pattern for data validation
- Service layer pattern
- Guard pattern for authentication
- Interceptor pattern for response transformation

### Smart Contract Patterns
- ERC20 token standard for $CBK
- ERC721 for NFT badges
- Factory pattern for token creation
- Access control patterns

## Component Relationships
### Frontend Components
- UI Components → Business Logic → API Client → Backend Services
- Authentication Flow → Wallet Integration → Smart Contracts
- State Management → Component Updates → UI Rendering

### Backend Services
- Controllers → Services → Repositories → Database
- Authentication → Guards → Protected Routes
- File Upload → S3 Storage → URL Generation

### Cross-cutting Concerns
- Logging and Monitoring
- Error Handling
- Performance Optimization
- Security Measures

## Technical Decisions
### Frontend
- Vite for fast development and optimized builds
- React 18 for modern features and concurrent rendering
- Tailwind CSS for utility-first styling
- shadcn/ui + Radix for accessible components
- React Query for server state management
- React Hook Form for form handling
- TypeScript for type safety
- React Router for navigation
- Recharts for data visualization

### Backend
- NestJS 11 for scalable architecture
- TypeORM for database operations
- Mongoose for MongoDB integration
- JWT for authentication
- Passport for auth strategies
- Swagger for API documentation
- Docker for containerization
- TypeScript for type safety
- AWS S3 for file storage

### Database
- Dual database support (PostgreSQL & MongoDB)
- Migration system for schema changes
- Seeding system for initial data
- Auto-population features
- Relationship management
- Data validation

## System Constraints
- Smart contract gas optimization requirements
- Real-time data synchronization needs
- Blockchain transaction speed limitations
- Authentication service dependencies
- File storage size limits
- API rate limiting
- Database performance considerations

## Performance Considerations
- Code splitting for optimized loading
- Caching strategies for API responses
- Database query optimization
- Smart contract gas optimization
- CDN usage for static assets
- Lazy loading for components
- Real-time updates optimization

## Security Patterns
- JWT-based authentication
- Role-based access control
- Input validation and sanitization
- Smart contract security patterns
- API rate limiting
- CORS configuration
- Environment variable protection
- File upload validation

## Integration Patterns
- RESTful API integration
- Web3 wallet integration
- OAuth2 for Google auth
- Smart contract interaction
- AWS S3 integration
- Email service integration
- Blockchain network integration

## Monitoring & Logging
- API request logging
- Error tracking and reporting
- Performance monitoring
- Smart contract event logging
- User activity tracking
- System health monitoring
- Security audit logging

## Revision History
- Initial creation: April 5, 2024
- Updated with technical stack details: April 5, 2024 