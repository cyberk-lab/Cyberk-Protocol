# Logs Directory

This directory contains logs for the Protocol project. Logs are organized by date and type to make it easier to find and analyze specific events.

## Structure

- `server/` - Server-side logs
  - `error/` - Error logs
  - `access/` - Access logs
  - `audit/` - Audit logs
- `client/` - Client-side logs
  - `error/` - Error logs
  - `performance/` - Performance logs
  - `analytics/` - Analytics logs

## Log Format

Logs are stored in JSON format with the following structure:

```json
{
  "timestamp": "2025-04-02T15:30:00.123Z",
  "level": "info",
  "message": "User logged in",
  "context": {
    "userId": "user-001",
    "ip": "192.168.1.1",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  },
  "tags": ["auth", "login"],
  "traceId": "trace-123456"
}
```

## Log Levels

- `debug` - Detailed information for debugging purposes
- `info` - General information about system operation
- `warn` - Warning events that might cause issues
- `error` - Error events that might still allow the application to continue running
- `fatal` - Very severe error events that will likely lead to application termination

## Retention Policy

- Error logs: 90 days
- Access logs: 30 days
- Audit logs: 1 year
- Performance logs: 30 days
- Analytics logs: 90 days

## Guidelines

1. Do not log sensitive information (passwords, tokens, etc.)
2. Include relevant context with each log entry
3. Use appropriate log levels
4. Include a trace ID for distributed tracing
5. Rotate logs regularly to prevent large file sizes
