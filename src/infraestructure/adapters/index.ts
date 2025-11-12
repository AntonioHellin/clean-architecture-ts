/**
 * Adapters Barrel Export
 *
 * This file provides a centralized export point for all infrastructure adapters.
 * Benefits:
 * - Cleaner imports: import { EmailAdapter } from '@infraestructure/adapters'
 * - Single source of truth for available adapters
 * - Easier refactoring and reorganization
 *
 * Clean Architecture: Infrastructure Layer
 */

// Email adapters
export {
  EmailAdapter,
  MockEmailAdapter,
  type IEmailService,
  type OrderEmailData,
} from "./EmailAdapter";

/**
 * TODO: Export other adapters as you create them:
 *
 * // Payment adapters
 * export { PaymentAdapter, MockPaymentAdapter } from './PaymentAdapter';
 *
 * // Cache adapters
 * export { RedisAdapter, InMemoryCacheAdapter } from './CacheAdapter';
 *
 * // Message queue adapters
 * export { RabbitMQAdapter, InMemoryQueueAdapter } from './MessageQueueAdapter';
 *
 * // Storage adapters
 * export { S3Adapter, LocalStorageAdapter } from './StorageAdapter';
 *
 * // Notification adapters
 * export { PushNotificationAdapter } from './NotificationAdapter';
 */
