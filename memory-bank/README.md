# Memory Bank

This directory serves as a persistent storage location for the Protocol project. It stores configuration, data, and other information that needs to be accessed across the application.

## Structure

- `config/` - Configuration files
- `data/` - Persistent data storage
- `templates/` - Reusable templates

## Usage

The memory bank can be accessed by both the server and web applications to retrieve and store persistent information.

### Server Access

```typescript
// Example server access
import { readFileSync } from 'fs';
import { join } from 'path';

const configPath = join(__dirname, '../../../memory-bank/config/server-config.json');
const config = JSON.parse(readFileSync(configPath, 'utf8'));
```

### Web Access

```typescript
// Example web access
import serverConfig from '../../../memory-bank/config/server-config.json';

function useServerConfig() {
  return serverConfig;
}
```

## Guidelines

1. Keep sensitive information out of the memory bank (use environment variables instead)
2. Use appropriate file formats (.json, .md, etc.) based on the type of data
3. Organize files in appropriate subdirectories
4. Document any changes to the memory bank structure
