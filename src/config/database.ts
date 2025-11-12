/**
 * Database Configuration
 *
 * Centralized database configuration for the application.
 * Keeps connection details and settings in one place.
 *
 * Clean Architecture: Configuration Layer
 *
 * TODO: Implement actual database connection logic using:
 * - TypeORM
 * - Prisma
 * - Mongoose (for MongoDB)
 * - Sequelize
 * - Raw database drivers (pg, mysql2, etc.)
 */

/**
 * Database configuration interface
 */
export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  // TODO: Add more configuration options
  // ssl?: boolean;
  // maxConnections?: number;
  // connectionTimeout?: number;
  // logging?: boolean;
}

/**
 * Get database configuration from environment variables
 *
 * TODO: Use a validation library like zod or joi to validate config
 */
export function getDatabaseConfig(): DatabaseConfig {
  return {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    database: process.env.DB_NAME || "clean_architecture_db",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
  };
}

/**
 * Database connection interface
 *
 * TODO: Move to @application/ports/ for proper dependency inversion
 */
export interface IDatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  // TODO: Add query methods or transaction support
  // query<T>(sql: string, params?: unknown[]): Promise<T[]>;
  // transaction<T>(callback: (tx: Transaction) => Promise<T>): Promise<T>;
}

/**
 * Example Database Connection Implementation
 *
 * TODO: Implement actual connection logic based on your chosen database
 */
export class DatabaseConnection implements IDatabaseConnection {
  private connected: boolean = false;
  private config: DatabaseConfig;

  constructor(config: DatabaseConfig) {
    this.config = config;
  }

  async connect(): Promise<void> {
    // TODO: Implement actual database connection
    console.log(`[Database] Connecting to ${this.config.host}:${this.config.port}/${this.config.database}`);

    // Example with TypeORM:
    // await createConnection({
    //   type: 'postgres',
    //   host: this.config.host,
    //   port: this.config.port,
    //   database: this.config.database,
    //   username: this.config.username,
    //   password: this.config.password,
    //   entities: [/* entity classes */],
    //   synchronize: process.env.NODE_ENV === 'development',
    // });

    this.connected = true;
    console.log("[Database] Connected successfully");
  }

  async disconnect(): Promise<void> {
    // TODO: Implement actual disconnection logic
    console.log("[Database] Disconnecting...");
    this.connected = false;
    console.log("[Database] Disconnected");
  }

  isConnected(): boolean {
    return this.connected;
  }
}

/**
 * Database connection singleton instance
 *
 * TODO: Consider using dependency injection instead of singleton
 */
let dbInstance: DatabaseConnection | null = null;

export function getDatabaseConnection(): DatabaseConnection {
  if (!dbInstance) {
    const config = getDatabaseConfig();
    dbInstance = new DatabaseConnection(config);
  }
  return dbInstance;
}

/**
 * TODO: Add database migration utilities
 * - runMigrations(): Promise<void>
 * - rollbackMigration(): Promise<void>
 * - seedDatabase(): Promise<void>
 */

/**
 * TODO: Add database health check
 * export async function checkDatabaseHealth(): Promise<boolean>
 */
