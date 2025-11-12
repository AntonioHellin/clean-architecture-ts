/**
 * Use Cases Barrel Export
 *
 * This file provides a centralized export point for all application use cases.
 * Benefits:
 * - Cleaner imports: import { CreateOrder, UpdateOrder } from '@application/use-cases'
 * - Single source of truth for available use cases
 * - Easier refactoring and reorganization
 *
 * Clean Architecture: Application Layer (Application Business Rules)
 */

// Order use cases
export { CreateOrder } from "./CreateOrder";

/**
 * TODO: Export other use cases as you create them:
 *
 * // Order management
 * export { UpdateOrder } from './UpdateOrder';
 * export { CancelOrder } from './CancelOrder';
 * export { GetOrderById } from './GetOrderById';
 * export { ListOrders } from './ListOrders';
 *
 * // Customer management
 * export { RegisterCustomer } from './RegisterCustomer';
 * export { UpdateCustomer } from './UpdateCustomer';
 * export { GetCustomerById } from './GetCustomerById';
 *
 * // Product management
 * export { CreateProduct } from './CreateProduct';
 * export { UpdateProduct } from './UpdateProduct';
 * export { GetProductById } from './GetProductById';
 * export { ListProducts } from './ListProducts';
 *
 * // Payment processing
 * export { ProcessPayment } from './ProcessPayment';
 * export { RefundPayment } from './RefundPayment';
 *
 * // Inventory management
 * export { UpdateInventory } from './UpdateInventory';
 * export { CheckInventory } from './CheckInventory';
 */

/**
 * Use Case Pattern
 *
 * Each use case should:
 * 1. Have a single public execute() method
 * 2. Depend on abstractions (ports/interfaces), not implementations
 * 3. Contain application-specific business rules
 * 4. Be independent of frameworks and UI
 * 5. Be testable in isolation
 *
 * Example use case structure:
 *
 * export class MyUseCase {
 *   constructor(
 *     private readonly myRepository: IMyRepository,
 *     private readonly myService: IMyService
 *   ) {}
 *
 *   async execute(input: MyUseCaseInput): Promise<MyUseCaseOutput> {
 *     // 1. Validate input
 *     // 2. Fetch/create domain entities
 *     // 3. Apply business rules
 *     // 4. Persist changes via repository
 *     // 5. Return output
 *   }
 * }
 */
