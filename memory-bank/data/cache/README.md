# Cache Directory

This directory contains cached data for the Protocol project. Cached data is used to improve performance by storing frequently accessed data locally.

## Guidelines

1. Cache files should include metadata about when they were created and when they expire
2. Cache files should be organized by their purpose (e.g., API responses, rendered templates)
3. Cache files should be automatically cleaned up when they expire
4. Cache files should be versioned to prevent using outdated cache formats

## Example Cache File Structure

```json
{
  "metadata": {
    "createdAt": "2025-04-02T15:30:00Z",
    "expiresAt": "2025-04-02T16:30:00Z",
    "version": "1.0.0",
    "source": "api/users/123"
  },
  "data": {
    // The actual cached data
  }
}
```

## Cache Types

- `api/` - Cached API responses
- `templates/` - Cached rendered templates
- `queries/` - Cached database query results
- `assets/` - Cached static assets
