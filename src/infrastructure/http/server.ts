import Fastify, { FastifyInstance } from 'fastify';
import { OrdersController } from './OrdersController.js';
import { checkHealth } from '../../shared/health.js';

/**
 * Builds and configures the Fastify server instance.
 * Registers routing endpoints for health checks and order operations.
 *
 * @returns Configured Fastify instance ready for listening.
 */
export async function buildServer(): Promise<FastifyInstance> {
    const app = Fastify({
        logger: false
    });

    // Health check endpoint
    app.get('/health', async () => {
        return checkHealth();
    });

    // Orders endpoint
    app.post('/orders', OrdersController.create);

    return app;
}
