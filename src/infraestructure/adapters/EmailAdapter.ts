/**
 * EmailAdapter - Infrastructure Adapter
 *
 * Adapters connect the application to external services/frameworks.
 * This keeps external dependencies isolated from business logic.
 *
 * Clean Architecture: Infrastructure Layer (Frameworks & Drivers)
 *
 * TODO: Implement actual email sending logic using a library like:
 * - nodemailer
 * - sendgrid
 * - aws-ses
 * - resend
 */

/**
 * Email Port (Interface)
 *
 * TODO: Move this interface to @application/ports/ for proper dependency inversion
 * The application layer should define the interface, infrastructure implements it
 */
export interface IEmailService {
  sendEmail(to: string, subject: string, body: string): Promise<void>;
  sendOrderConfirmation(orderData: OrderEmailData): Promise<void>;
  // TODO: Add more email methods as needed
}

/**
 * Email data structure for order confirmations
 */
export interface OrderEmailData {
  customerEmail: string;
  orderId: string;
  orderTotal: number;
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
  }>;
  // TODO: Add more order details as needed
}

/**
 * EmailAdapter Implementation
 *
 * This is the concrete implementation that uses a real email service
 */
export class EmailAdapter implements IEmailService {
  constructor(
    private readonly apiKey: string,
    private readonly fromEmail: string
  ) {
    // TODO: Initialize email service client
    // Example: this.client = new SendGridClient(apiKey);
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    // TODO: Implement email sending logic
    console.log(`[EmailAdapter] Sending email to ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);

    // Example implementation:
    // try {
    //   await this.client.send({
    //     to,
    //     from: this.fromEmail,
    //     subject,
    //     html: body,
    //   });
    // } catch (error) {
    //   throw new EmailSendError(`Failed to send email: ${error.message}`);
    // }
  }

  async sendOrderConfirmation(orderData: OrderEmailData): Promise<void> {
    // TODO: Create email template for order confirmation
    const subject = `Order Confirmation #${orderData.orderId}`;
    const body = this.buildOrderConfirmationEmail(orderData);

    await this.sendEmail(orderData.customerEmail, subject, body);
  }

  private buildOrderConfirmationEmail(orderData: OrderEmailData): string {
    // TODO: Use a proper email template engine (handlebars, pug, etc.)
    return `
      <h1>Order Confirmation</h1>
      <p>Order ID: ${orderData.orderId}</p>
      <p>Total: $${orderData.orderTotal}</p>
      <!-- TODO: Add full order details -->
    `;
  }
}

/**
 * Mock Email Adapter for testing
 *
 * TODO: Move to tests/ folder or create a separate MockEmailAdapter.ts file
 */
export class MockEmailAdapter implements IEmailService {
  public sentEmails: Array<{
    to: string;
    subject: string;
    body: string;
  }> = [];

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    this.sentEmails.push({ to, subject, body });
    console.log(`[MockEmailAdapter] Email logged (not sent): ${to}`);
  }

  async sendOrderConfirmation(orderData: OrderEmailData): Promise<void> {
    await this.sendEmail(
      orderData.customerEmail,
      `Order Confirmation #${orderData.orderId}`,
      JSON.stringify(orderData)
    );
  }

  clear(): void {
    this.sentEmails = [];
  }
}

/**
 * TODO: Create more adapters as needed:
 * - PaymentAdapter.ts (Stripe, PayPal integration)
 * - NotificationAdapter.ts (Push notifications, SMS)
 * - CacheAdapter.ts (Redis, Memcached)
 * - MessageQueueAdapter.ts (RabbitMQ, Kafka)
 * - StorageAdapter.ts (S3, Azure Blob Storage)
 */
