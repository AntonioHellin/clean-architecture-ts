import { Order } from '@domain/entities/Order.js';

/**
 * OrderRepository Port
 *
 * Defines the persistence abstraction for Order entities.
 * In Clean Architecture, this port resides in the Application layer,
 * adhering to the Dependency Inversion Principle so that persistence details
 * depend on domain/application abstractions rather than the reverse.
 */
export interface OrderRepository {
  /**
   * Retrieves an Order by its unique identifier.
   *
   * @param id - The unique identifier of the order.
   * @returns The Order entity if found, or null otherwise.
   */
  findById(id: string): Promise<Order | null>;

  /**
   * Persists an Order entity.
   *
   * @param order - The Order entity to be saved.
   */
  save(order: Order): Promise<void>;
}
