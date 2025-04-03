import fs from 'fs';
import path from 'path';

/**
 * MemoryBank utility for accessing and managing data in the memory bank
 */
export class MemoryBank {
  private readonly basePath: string;

  /**
   * Create a new MemoryBank instance
   * @param basePath The base path to the memory bank directory
   */
  constructor(basePath?: string) {
    this.basePath = basePath || path.resolve(process.cwd(), '../memory-bank');
  }

  /**
   * Get the path to a file in the memory bank
   * @param relativePath The relative path to the file
   * @returns The absolute path to the file
   */
  getPath(relativePath: string): string {
    return path.resolve(this.basePath, relativePath);
  }

  /**
   * Read a file from the memory bank
   * @param relativePath The relative path to the file
   * @returns The file contents as a string
   */
  readFile(relativePath: string): string {
    const filePath = this.getPath(relativePath);
    return fs.readFileSync(filePath, 'utf8');
  }

  /**
   * Read a JSON file from the memory bank
   * @param relativePath The relative path to the file
   * @returns The parsed JSON data
   */
  readJson<T = any>(relativePath: string): T {
    const content = this.readFile(relativePath);
    return JSON.parse(content) as T;
  }

  /**
   * Write a file to the memory bank
   * @param relativePath The relative path to the file
   * @param content The content to write
   */
  writeFile(relativePath: string, content: string): void {
    const filePath = this.getPath(relativePath);
    const dirPath = path.dirname(filePath);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
  }

  /**
   * Write a JSON file to the memory bank
   * @param relativePath The relative path to the file
   * @param data The data to write
   * @param pretty Whether to pretty-print the JSON
   */
  writeJson(relativePath: string, data: any, pretty = true): void {
    const content = pretty 
      ? JSON.stringify(data, null, 2) 
      : JSON.stringify(data);
    
    this.writeFile(relativePath, content);
  }

  /**
   * Check if a file exists in the memory bank
   * @param relativePath The relative path to the file
   * @returns Whether the file exists
   */
  fileExists(relativePath: string): boolean {
    const filePath = this.getPath(relativePath);
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
  }

  /**
   * Delete a file from the memory bank
   * @param relativePath The relative path to the file
   */
  deleteFile(relativePath: string): void {
    const filePath = this.getPath(relativePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  /**
   * Get the server configuration
   * @returns The server configuration
   */
  getServerConfig<T = any>(): T {
    return this.readJson<T>('config/server-config.json');
  }

  /**
   * Get the web configuration
   * @returns The web configuration
   */
  getWebConfig<T = any>(): T {
    return this.readJson<T>('config/web-config.json');
  }

  /**
   * Get a template from the memory bank
   * @param templatePath The relative path to the template
   * @returns The template content
   */
  getTemplate(templatePath: string): string {
    return this.readFile(`templates/${templatePath}`);
  }

  /**
   * Get user preferences
   * @param userId The user ID
   * @returns The user preferences
   */
  getUserPreferences<T = any>(userId: string): T {
    const preferencesPath = `data/user/preferences-${userId}.json`;
    
    if (this.fileExists(preferencesPath)) {
      return this.readJson<T>(preferencesPath);
    }
    
    // Return default preferences if user-specific preferences don't exist
    return this.readJson<T>('data/user/preferences.json');
  }

  /**
   * Save user preferences
   * @param userId The user ID
   * @param preferences The user preferences
   */
  saveUserPreferences(userId: string, preferences: any): void {
    const preferencesPath = `data/user/preferences-${userId}.json`;
    this.writeJson(preferencesPath, {
      userId,
      preferences,
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: '1.0.0'
      }
    });
  }

  /**
   * Cache API response
   * @param key The cache key
   * @param data The data to cache
   * @param ttl The time-to-live in seconds
   */
  cacheApiResponse(key: string, data: any, ttl = 3600): void {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + ttl * 1000);
    
    this.writeJson(`data/cache/api/${key}.json`, {
      metadata: {
        createdAt: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
        version: '1.0.0',
        source: key
      },
      data
    });
  }

  /**
   * Get cached API response
   * @param key The cache key
   * @returns The cached data or null if not found or expired
   */
  getCachedApiResponse<T = any>(key: string): T | null {
    const cachePath = `data/cache/api/${key}.json`;
    
    if (!this.fileExists(cachePath)) {
      return null;
    }
    
    const cache = this.readJson(cachePath);
    const expiresAt = new Date(cache.metadata.expiresAt);
    
    if (expiresAt < new Date()) {
      // Cache has expired
      this.deleteFile(cachePath);
      return null;
    }
    
    return cache.data as T;
  }

  /**
   * Log an event
   * @param level The log level
   * @param message The log message
   * @param context The log context
   * @param tags The log tags
   */
  log(level: 'debug' | 'info' | 'warn' | 'error' | 'fatal', message: string, context: any = {}, tags: string[] = []): void {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const logPath = `data/logs/server/${level}/${date}.jsonl`;
    
    const logEntry = {
      timestamp: now.toISOString(),
      level,
      message,
      context,
      tags,
      traceId: `trace-${Math.random().toString(36).substring(2, 15)}`
    };
    
    // Append to log file
    const logLine = JSON.stringify(logEntry) + '\n';
    this.appendToFile(logPath, logLine);
  }

  /**
   * Append to a file in the memory bank
   * @param relativePath The relative path to the file
   * @param content The content to append
   */
  private appendToFile(relativePath: string, content: string): void {
    const filePath = this.getPath(relativePath);
    const dirPath = path.dirname(filePath);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    fs.appendFileSync(filePath, content, 'utf8');
  }
}

// Export a singleton instance
export const memoryBank = new MemoryBank();

export default memoryBank;
