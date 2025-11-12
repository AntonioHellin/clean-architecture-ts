import { OrderRepository } from '../../application/ports/OrderRepository';
import { Order } from '../../application/domain/Order';

export class InMemoryOrderRepository implements OrderRepository {
    private store = new Map<string, Order>();

    async findById(id: string) {
        return this.store.get(id) ?? null;
    }
    async save(order: Order) {
        this.store.set(order.id, order);
    }
}