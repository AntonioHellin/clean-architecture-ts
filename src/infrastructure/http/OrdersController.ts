import { FastifyRequest, FastifyReply } from 'fastify';
import { createOrder } from "@composition/container";

export const OrdersController = {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { orderId, customerId, items } = request.body as any;
        const out = await createOrder.execute({ orderId, customerId, items });
        reply.code(201).send(out);
    }
};