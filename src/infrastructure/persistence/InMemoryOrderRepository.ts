import { OrderRepository } from '@application/ports/OrderRepository.js';
import { Order } from '@domain/entities/Order.js';

/**
 * InMemoryOrderRepository
 *
 * In-memory adapter implementation of the OrderRepository port.
 * Suitable for unit/integration testing and rapid local prototyping without database dependencies.
 */
export class InMemoryOrderRepository implements OrderRepository {
    private readonly store = new Map<string, Order>();

    /**
     * Looks up an order by its ID from the internal map.
     */
    async findById(id: string): Promise<Order | null> {
        return this.store.get(id) ?? null;
    }

    /**
     * Saves or updates an order in the internal map.
     */
    async save(order: Order): Promise<void> {
        this.store.set(order.id, order);
    }

    /**
     * Clears all stored orders (useful in test setups).
     */
    clear(): void {
        this.store.clear();
    }
}