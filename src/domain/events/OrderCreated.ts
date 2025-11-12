import { Order } from "@domain/entities/Order";

/**
 * OrderCreated Domain Event
 *
 * Domain events represent something that happened in the domain that domain experts care about.
 * They are immutable facts about state changes.
 *
 * Clean Architecture: Domain Layer (Enterprise Business Rules)
 *
 * TODO: Implement a base DomainEvent interface/abstract class if you have multiple events
 * TODO: Consider adding event versioning for event sourcing compatibility
 */
export class OrderCreated {
  public readonly occurredAt: Date;
  public readonly eventType = "OrderCreated" as const;

  constructor(
    public readonly orderId: string,
    public readonly customerId: string,
    public readonly totalAmount: number,
    public readonly orderData?: Partial<Order> // TODO: Define specific event payload structure
  ) {
    this.occurredAt = new Date();

    // TODO: Add validation
    // - Ensure orderId is valid UUID/identifier format
    // - Ensure totalAmount is positive
  }

  /**
   * TODO: Add methods for event serialization/deserialization
   * - toJSON(): Record<string, unknown>
   * - static fromJSON(data: Record<string, unknown>): OrderCreated
   */

  /**
   * TODO: Add event metadata
   * - aggregateId: string (the Order ID)
   * - version: number (for event versioning)
   * - correlationId: string (for tracing across microservices)
   * - causationId: string (the ID of the event that caused this event)
   */
}

/**
 * Example of a base interface for all domain events
 *
 * TODO: Move to a separate DomainEvent.ts file and extend it in all events
 */
export interface BaseDomainEvent {
  eventType: string;
  occurredAt: Date;
  aggregateId: string;
  // TODO: Add common event properties
  // version: number;
  // correlationId?: string;
  // causationId?: string;
}

/**
 * TODO: Create more domain events as needed:
 * - OrderConfirmed.ts
 * - OrderShipped.ts
 * - OrderCancelled.ts
 * - OrderItemAdded.ts
 * - OrderItemRemoved.ts
 */
