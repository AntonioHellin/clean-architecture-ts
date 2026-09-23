import { Order, OrderItem } from "@domain/entities/Order.js";
import { OrderRepository } from "@application/ports/OrderRepository.js";
import { Price } from "@domain/value-objects/Price.js";

/**
 * Input DTO for creating a new order.
 */
export interface CreateOrderInputItem {
    productId: string;
    quantity: number;
    unitPrice: number;
}

export interface CreateOrderInput {
    orderId: string;
    customerId: string;
    items: CreateOrderInputItem[];
}

/**
 * Output DTO returned upon successful order creation.
 */
export interface CreateOrderOutput {
    orderId: string;
    total: number;
}

/**
 * CreateOrder Use Case
 *
 * Implements application-specific business rules for placing an order:
 * 1. Checks that an order with the provided ID does not already exist.
 * 2. Instantiates domain value objects (Price) and entities (Order).
 * 3. Persists the validated order via the OrderRepository port.
 * 4. Returns confirmation output data.
 */
export class CreateOrder {
    constructor(private readonly repo: OrderRepository) {}

    /**
     * Executes the order creation workflow.
     *
     * @param input - The validated order details.
     * @returns The created order ID and computed total price.
     * @throws {Error} If an order with the same ID already exists.
     */
    async execute({ orderId, customerId, items }: CreateOrderInput): Promise<CreateOrderOutput> {
        const exists = await this.repo.findById(orderId);
        if (exists) {
            throw new Error("Order with this ID already exists");
        }

        // Convert input items to OrderItem with Price value objects
        const orderItems: OrderItem[] = items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: Price.create(item.unitPrice, "USD")
        }));

        // Calculate total price
        const totalAmount = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
        const totalPrice = Price.create(totalAmount, "USD");

        const order = new Order(orderId, customerId, orderItems, totalPrice);
        await this.repo.save(order);
        return { orderId: order.id, total: totalPrice.value };
    }
}