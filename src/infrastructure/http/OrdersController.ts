import { FastifyRequest, FastifyReply } from 'fastify';
import { createOrder } from '../../composition/container.js';

/**
 * Payload interface for incoming order creation requests.
 */
export interface CreateOrderItemPayload {
    productId: string;
    quantity: number;
    unitPrice: number;
}

export interface CreateOrderBody {
    orderId?: string;
    customerId?: string;
    items?: CreateOrderItemPayload[];
}

/**
 * OrdersController handles incoming HTTP requests related to orders.
 * Follows Clean Architecture by delegating domain logic to use cases.
 */
export const OrdersController = {
    /**
     * Handles POST /orders to create a new order.
     * Performs strict input validation and boundary checks before invoking the use case.
     */
    async create(request: FastifyRequest<{ Body: CreateOrderBody }>, reply: FastifyReply) {
        const body = request.body;

        if (!body || typeof body !== 'object') {
            return reply.code(400).send({
                error: 'Bad Request',
                message: 'Request body must be a valid JSON object'
            });
        }

        const { orderId, customerId, items } = body;

        if (typeof orderId !== 'string' || orderId.trim().length === 0) {
            return reply.code(400).send({
                error: 'Bad Request',
                message: 'Field "orderId" must be a non-empty string'
            });
        }

        if (typeof customerId !== 'string' || customerId.trim().length === 0) {
            return reply.code(400).send({
                error: 'Bad Request',
                message: 'Field "customerId" must be a non-empty string'
            });
        }

        if (!Array.isArray(items) || items.length === 0) {
            return reply.code(400).send({
                error: 'Bad Request',
                message: 'Field "items" must be a non-empty array'
            });
        }

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (
                !item ||
                typeof item.productId !== 'string' ||
                item.productId.trim().length === 0 ||
                typeof item.quantity !== 'number' ||
                !Number.isInteger(item.quantity) ||
                item.quantity <= 0 ||
                typeof item.unitPrice !== 'number' ||
                !Number.isFinite(item.unitPrice) ||
                item.unitPrice < 0
            ) {
                return reply.code(400).send({
                    error: 'Bad Request',
                    message: `Item at index ${i} has invalid productId, quantity (must be positive integer), or unitPrice (must be non-negative number)`
                });
            }
        }

        try {
            const out = await createOrder.execute({
                orderId: orderId.trim(),
                customerId: customerId.trim(),
                items: items.map(item => ({
                    productId: item.productId.trim(),
                    quantity: item.quantity,
                    unitPrice: item.unitPrice
                }))
            });
            return reply.code(201).send(out);
        } catch (error: unknown) {
            const err = error as Error;
            if (err.message?.includes('already exists')) {
                return reply.code(409).send({ error: 'Conflict', message: err.message });
            }
            return reply.code(400).send({
                error: 'Bad Request',
                message: err.message || 'Failed to create order'
            });
        }
    }
};