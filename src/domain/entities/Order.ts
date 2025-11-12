import { Price } from "@domain/value-objects/Price";

/**
 * Order Entity
 *
 * Represents a business order in the domain layer.
 * Entities have identity and lifecycle - they are defined by their ID, not their attributes.
 *
 * Clean Architecture: Domain Layer (Enterprise Business Rules)
 */
export class Order {
  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly items: OrderItem[],
    public readonly totalPrice: Price,
    public readonly status: OrderStatus = OrderStatus.PENDING,
    public readonly createdAt: Date = new Date()
  ) {
    // TODO: Add domain validation rules
    // - Validate that order has at least one item
    // - Validate that totalPrice matches sum of item prices
    // - Validate that customerId is not empty
  }

  /**
   * TODO: Implement domain methods that encapsulate business logic
   * Examples:
   * - confirm(): void - Transition order to CONFIRMED status
   * - cancel(): void - Cancel the order with business rules
   * - addItem(item: OrderItem): void - Add item with validation
   * - calculateTotal(): Price - Recalculate total price
   */

  // Example domain method
  public isConfirmed(): boolean {
    return this.status === OrderStatus.CONFIRMED;
  }

  // TODO: Add method to emit domain events
  // public getDomainEvents(): DomainEvent[] { ... }
}

/**
 * OrderItem Value Object
 *
 * TODO: Move to separate file in value-objects/ if it grows in complexity
 */
export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: Price;
  // TODO: Add more properties as needed
  // - productName: string
  // - discount?: Discount
}

/**
 * OrderStatus Enum
 *
 * TODO: Consider moving to a separate enums/ folder if you have many enums
 */
export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED"
}
