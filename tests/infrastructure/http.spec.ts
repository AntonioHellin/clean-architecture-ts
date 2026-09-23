import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { buildServer } from '../../src/infrastructure/http/server.js';
import { FastifyInstance } from 'fastify';

describe('HTTP Endpoints', () => {
    let app: FastifyInstance;

    beforeEach(async () => {
        app = await buildServer();
    });

    afterEach(async () => {
        await app.close();
    });

    it('GET /health returns 200 with status ok', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/health'
        });

        expect(response.statusCode).toBe(200);
        const body = JSON.parse(response.body);
        expect(body.status).toBe('ok');
        expect(body.timestamp).toBeDefined();
    });

    it('POST /orders succeeds with valid payload', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/orders',
            payload: {
                orderId: 'HTTP-ORD-1',
                customerId: 'HTTP-CUST-1',
                items: [
                    { productId: 'ITEM-1', quantity: 2, unitPrice: 15.0 }
                ]
            }
        });

        expect(response.statusCode).toBe(201);
        const body = JSON.parse(response.body);
        expect(body.orderId).toBe('HTTP-ORD-1');
        expect(body.total).toBe(30.0);
    });

    it('POST /orders returns 400 when body or fields are missing', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/orders',
            payload: {}
        });

        expect(response.statusCode).toBe(400);
        const body = JSON.parse(response.body);
        expect(body.error).toBe('Bad Request');
    });

    it('POST /orders returns 400 when items array contains invalid quantity or price', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/orders',
            payload: {
                orderId: 'HTTP-ORD-INVALID',
                customerId: 'HTTP-CUST-1',
                items: [
                    { productId: 'ITEM-1', quantity: -1, unitPrice: 15.0 }
                ]
            }
        });

        expect(response.statusCode).toBe(400);
        const body = JSON.parse(response.body);
        expect(body.error).toBe('Bad Request');
    });
});
