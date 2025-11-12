/**
 * Configuration Barrel Export
 *
 * This file provides a centralized export point for all configuration modules.
 * Benefits:
 * - Cleaner imports: import { getEnvironmentConfig } from '@config'
 * - Single source of truth for configuration
 * - Easier refactoring and reorganization
 *
 * Clean Architecture: Configuration Layer
 */

// Environment configuration
export {
  loadEnvironmentConfig,
  getEnvironmentConfig,
  isProduction,
  isDevelopment,
  isTest,
  type EnvironmentConfig,
  type NodeEnv,
} from "./environment";

// Database configuration
export {
  getDatabaseConfig,
  getDatabaseConnection,
  DatabaseConnection,
  type DatabaseConfig,
  type IDatabaseConnection,
} from "./database";

/**
 * TODO: Export other configuration modules as you create them:
 *
 * // Logging configuration
 * export { getLoggingConfig, type LoggingConfig } from './logging';
 *
 * // Cache configuration
 * export { getCacheConfig, type CacheConfig } from './cache';
 *
 * // Feature flags
 * export { getFeatureFlags, type FeatureFlags } from './featureFlags';
 *
 * // API configuration
 * export { getApiConfig, type ApiConfig } from './api';
 *
 * // Security configuration
 * export { getSecurityConfig, type SecurityConfig } from './security';
 */
