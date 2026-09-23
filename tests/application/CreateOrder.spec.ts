import { describe, it, expect, beforeEach } from 'vitest';
import { CreateOrder } from '../../src/application/use-cases/CreateOrder';
import { InMemoryOrderRepository } from '../../src/infrastructure/persistence/InMemoryOrderRepository';

describe('CreateOrder Use Case', () => {
    let repo: InMemoryOrderRepository;
    let createOrder: CreateOrder;

    beforeEach(() => {
        repo = new InMemoryOrderRepository();
        createOrder = new CreateOrder(repo);
    });

    it('creates an order and calculates the total price correctly', async () => {
        const result = await createOrder.execute({
            orderId: 'ORDER-001',
            customerId: 'CUST-001',
            items: [
                { productId: 'PROD-A', quantity: 2, unitPrice: 25.5 },
                { productId: 'PROD-B', quantity: 1, unitPrice: 10 }
            ]
        });

        expect(result.orderId).toBe('ORDER-001');
        expect(result.total).toBe(61);

        const saved = await repo.findById('ORDER-001');
        expect(saved).not.toBeNull();
        expect(saved?.customerId).toBe('CUST-001');
        expect(saved?.items.length).toBe(2);
    });

    it('throws an error if an order with the same ID already exists', async () => {
        await createOrder.execute({
            orderId: 'ORDER-DUPE',
            customerId: 'CUST-001',
            items: [{ productId: 'PROD-A', quantity: 1, unitPrice: 50 }]
        });

        await expect(createOrder.execute({
            orderId: 'ORDER-DUPE',
            customerId: 'CUST-002',
            items: [{ productId: 'PROD-B', quantity: 1, unitPrice: 30 }]
        })).rejects.toThrow('Order with this ID already exists');
    });

    it('throws an error if item price is negative', async () => {
        await expect(createOrder.execute({
            orderId: 'ORDER-ERR',
            customerId: 'CUST-001',
            items: [{ productId: 'PROD-A', quantity: 1, unitPrice: -10 }]
        })).rejects.toThrow('Invalid price amount');
    });
});
