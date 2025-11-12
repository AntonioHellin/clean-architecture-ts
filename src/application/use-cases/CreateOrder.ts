import { Order, OrderItem } from "@domain/entities/Order";
import { OrderRepository } from "@application/ports/OrderRepository";
import { Price } from "@domain/value-objects/Price";

export type CreateOrderInput = {
    orderId: string;
    customerId: string;
    items: Array<{ productId: string; quantity: number; unitPrice: number }>;
};
export type CreateOrderOutput = { orderId: string; total: number };

export class CreateOrder {
    constructor(private readonly repo: OrderRepository) {}

    async execute({ orderId, customerId, items }: CreateOrderInput): Promise<CreateOrderOutput> {
        const exists = await this.repo.findById(orderId)
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