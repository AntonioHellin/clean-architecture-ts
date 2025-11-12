/**
 * Environment Configuration
 *
 * Centralized environment variables management.
 * Provides type-safe access to configuration values.
 *
 * Clean Architecture: Configuration Layer
 *
 * TODO: Install and use dotenv package for .env file support
 * npm install dotenv
 *
 * TODO: Consider using validation libraries:
 * - zod (recommended)
 * - joi
 * - envalid
 */

/**
 * Node environment types
 */
export type NodeEnv = "development" | "production" | "test";

/**
 * Application configuration interface
 *
 * TODO: Add more configuration sections as your app grows
 */
export interface EnvironmentConfig {
  // Application
  nodeEnv: NodeEnv;
  port: number;
  appName: string;

  // Database
  database: {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
  };

  // External Services
  email: {
    apiKey: string;
    fromEmail: string;
  };

  // TODO: Add more configuration sections
  // jwt: {
  //   secret: string;
  //   expiresIn: string;
  // };
  // aws: {
  //   region: string;
  //   accessKeyId: string;
  //   secretAccessKey: string;
  // };
  // redis: {
  //   host: string;
  //   port: number;
  // };
}

/**
 * Load and validate environment configuration
 *
 * TODO: Add proper validation using zod or joi
 * TODO: Throw errors for missing required variables
 */
export function loadEnvironmentConfig(): EnvironmentConfig {
  // TODO: Load .env file in development
  // import * as dotenv from 'dotenv';
  // dotenv.config();

  const config: EnvironmentConfig = {
    // Application
    nodeEnv: (process.env.NODE_ENV as NodeEnv) || "development",
    port: parseInt(process.env.PORT || "3000", 10),
    appName: process.env.APP_NAME || "clean-architecture-app",

    // Database
    database: {
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432", 10),
      name: process.env.DB_NAME || "clean_architecture_db",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
    },

    // External Services
    email: {
      apiKey: process.env.EMAIL_API_KEY || "test-api-key",
      fromEmail: process.env.EMAIL_FROM || "noreply@example.com",
    },
  };

  // TODO: Validate configuration
  // validateConfig(config);

  return config;
}

/**
 * Example validation function using zod
 *
 * TODO: Uncomment and implement when zod is installed
 */
// import { z } from 'zod';
//
// const envSchema = z.object({
//   nodeEnv: z.enum(['development', 'production', 'test']),
//   port: z.number().min(1).max(65535),
//   appName: z.string().min(1),
//   database: z.object({
//     host: z.string().min(1),
//     port: z.number().min(1).max(65535),
//     name: z.string().min(1),
//     user: z.string().min(1),
//     password: z.string().min(1),
//   }),
//   email: z.object({
//     apiKey: z.string().min(1),
//     fromEmail: z.string().email(),
//   }),
// });
//
// function validateConfig(config: unknown): EnvironmentConfig {
//   return envSchema.parse(config);
// }

/**
 * Singleton instance of environment configuration
 */
let configInstance: EnvironmentConfig | null = null;

/**
 * Get environment configuration
 *
 * @returns The application configuration
 */
export function getEnvironmentConfig(): EnvironmentConfig {
  if (!configInstance) {
    configInstance = loadEnvironmentConfig();
  }
  return configInstance;
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return getEnvironmentConfig().nodeEnv === "production";
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return getEnvironmentConfig().nodeEnv === "development";
}

/**
 * Check if running in test environment
 */
export function isTest(): boolean {
  return getEnvironmentConfig().nodeEnv === "test";
}

/**
 * TODO: Add feature flags configuration
 * export interface FeatureFlags {
 *   enableNewCheckout: boolean;
 *   enableBetaFeatures: boolean;
 * }
 */

/**
 * TODO: Add logging configuration
 * export interface LoggingConfig {
 *   level: 'debug' | 'info' | 'warn' | 'error';
 *   format: 'json' | 'pretty';
 * }
 */
