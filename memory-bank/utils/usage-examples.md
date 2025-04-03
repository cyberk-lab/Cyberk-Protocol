# Memory Bank Usage Examples

This document provides examples of how to use the Memory Bank utility in your application.

## Server-side Usage

### Basic Usage

```typescript
import { memoryBank } from '../memory-bank/utils/memory-bank';

// Get server configuration
const serverConfig = memoryBank.getServerConfig();
console.log(`Database host: ${serverConfig.database.host}`);

// Read a template
const welcomeEmailTemplate = memoryBank.getTemplate('emails/welcome.html');

// Cache API response
const users = [
  { id: 'user-001', name: 'John Doe' },
  { id: 'user-002', name: 'Jane Doe' }
];
memoryBank.cacheApiResponse('users', users, 3600); // Cache for 1 hour

// Get cached API response
const cachedUsers = memoryBank.getCachedApiResponse('users');
```

### Configuration Management

```typescript
import { memoryBank } from '../memory-bank/utils/memory-bank';

// In your configuration service
class ConfigService {
  private config: any;

  constructor() {
    // Load configuration from memory bank
    this.config = memoryBank.getServerConfig();
  }

  getDatabaseConfig() {
    return this.config.database;
  }

  getApiConfig() {
    return this.config.api;
  }

  getSecurityConfig() {
    return this.config.security;
  }
}
```

### User Preferences

```typescript
import { memoryBank } from '../memory-bank/utils/memory-bank';

// In your user service
class UserService {
  getUserPreferences(userId: string) {
    return memoryBank.getUserPreferences(userId);
  }

  updateUserPreferences(userId: string, preferences: any) {
    memoryBank.saveUserPreferences(userId, preferences);
  }

  getUserTheme(userId: string) {
    const preferences = this.getUserPreferences(userId);
    return preferences.theme;
  }
}
```

### Logging

```typescript
import { memoryBank } from '../memory-bank/utils/memory-bank';

// In your logger service
class LoggerService {
  debug(message: string, context: any = {}, tags: string[] = []) {
    memoryBank.log('debug', message, context, tags);
  }

  info(message: string, context: any = {}, tags: string[] = []) {
    memoryBank.log('info', message, context, tags);
  }

  warn(message: string, context: any = {}, tags: string[] = []) {
    memoryBank.log('warn', message, context, tags);
  }

  error(message: string, context: any = {}, tags: string[] = []) {
    memoryBank.log('error', message, context, tags);
  }

  fatal(message: string, context: any = {}, tags: string[] = []) {
    memoryBank.log('fatal', message, context, tags);
  }
}
```

### Email Templates

```typescript
import { memoryBank } from '../memory-bank/utils/memory-bank';
import Handlebars from 'handlebars';

// In your email service
class EmailService {
  sendWelcomeEmail(user: any) {
    // Get the welcome email template
    const templateSource = memoryBank.getTemplate('emails/welcome.html');
    
    // Compile the template
    const template = Handlebars.compile(templateSource);
    
    // Render the template with data
    const html = template({
      name: user.name,
      email: user.email,
      verificationUrl: `https://example.com/verify?token=${user.verificationToken}`,
      supportEmail: 'support@example.com',
      logoUrl: 'https://example.com/logo.png',
      currentYear: new Date().getFullYear()
    });
    
    // Send the email
    this.sendEmail({
      to: user.email,
      subject: 'Welcome to Protocol',
      html
    });
  }

  private sendEmail(options: any) {
    // Implementation of sending email
  }
}
```

## Web-side Usage

### Configuration

```typescript
// In your configuration hook
import { useEffect, useState } from 'react';

export function useConfig() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    // Fetch configuration from API
    fetch('/api/config')
      .then(response => response.json())
      .then(data => setConfig(data));
  }, []);

  return config;
}
```

### User Preferences

```typescript
// In your user preferences hook
import { useEffect, useState } from 'react';

export function useUserPreferences(userId: string) {
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    // Fetch user preferences from API
    fetch(`/api/users/${userId}/preferences`)
      .then(response => response.json())
      .then(data => setPreferences(data));
  }, [userId]);

  const updatePreferences = async (newPreferences: any) => {
    // Update user preferences via API
    const response = await fetch(`/api/users/${userId}/preferences`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPreferences)
    });
    
    const data = await response.json();
    setPreferences(data);
  };

  return { preferences, updatePreferences };
}
```

## Integration with NestJS

### Module

```typescript
// src/memory-bank/memory-bank.module.ts
import { Module, Global } from '@nestjs/common';
import { MemoryBankService } from './memory-bank.service';

@Global()
@Module({
  providers: [MemoryBankService],
  exports: [MemoryBankService],
})
export class MemoryBankModule {}
```

### Service

```typescript
// src/memory-bank/memory-bank.service.ts
import { Injectable } from '@nestjs/common';
import { memoryBank } from '../../memory-bank/utils/memory-bank';

@Injectable()
export class MemoryBankService {
  getServerConfig<T = any>(): T {
    return memoryBank.getServerConfig<T>();
  }

  getWebConfig<T = any>(): T {
    return memoryBank.getWebConfig<T>();
  }

  getTemplate(templatePath: string): string {
    return memoryBank.getTemplate(templatePath);
  }

  getUserPreferences<T = any>(userId: string): T {
    return memoryBank.getUserPreferences<T>(userId);
  }

  saveUserPreferences(userId: string, preferences: any): void {
    memoryBank.saveUserPreferences(userId, preferences);
  }

  cacheApiResponse(key: string, data: any, ttl = 3600): void {
    memoryBank.cacheApiResponse(key, data, ttl);
  }

  getCachedApiResponse<T = any>(key: string): T | null {
    return memoryBank.getCachedApiResponse<T>(key);
  }

  log(level: 'debug' | 'info' | 'warn' | 'error' | 'fatal', message: string, context: any = {}, tags: string[] = []): void {
    memoryBank.log(level, message, context, tags);
  }
}
```

### Usage in Controllers and Services

```typescript
// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { MemoryBankService } from '../memory-bank/memory-bank.service';

@Injectable()
export class UsersService {
  constructor(private readonly memoryBankService: MemoryBankService) {}

  getUserPreferences(userId: string) {
    return this.memoryBankService.getUserPreferences(userId);
  }

  updateUserPreferences(userId: string, preferences: any) {
    this.memoryBankService.saveUserPreferences(userId, preferences);
    this.memoryBankService.log('info', 'User preferences updated', { userId }, ['user', 'preferences']);
  }
}
```

## Integration with Next.js

### API Route

```typescript
// pages/api/config.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { memoryBank } from '../../memory-bank/utils/memory-bank';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const webConfig = memoryBank.getWebConfig();
  
  // Remove sensitive information
  delete webConfig.analytics.trackingId;
  
  res.status(200).json(webConfig);
}
```

### User Preferences API

```typescript
// pages/api/users/[userId]/preferences.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { memoryBank } from '../../../../memory-bank/utils/memory-bank';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  
  if (req.method === 'GET') {
    const preferences = memoryBank.getUserPreferences(userId as string);
    res.status(200).json(preferences);
  } else if (req.method === 'PUT') {
    memoryBank.saveUserPreferences(userId as string, req.body);
    const updatedPreferences = memoryBank.getUserPreferences(userId as string);
    res.status(200).json(updatedPreferences);
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
