/**
 * Supported currency types for financial transactions.
 */
export type SupportedCurrency = "USD" | "EUR";

/**
 * Price Value Object
 *
 * Encapsulates financial value and currency with domain invariants:
 * - Amount must be a finite, non-negative number.
 * - Value is rounded to two decimal places.
 * - Invariant enforcement prevents invalid state within the domain layer.
 */
export class Price {
  constructor(readonly value: number, readonly currency: SupportedCurrency) {}

  /**
   * Factory method to instantiate and validate a Price value object.
   *
   * @param amount - The numerical amount. Must be non-negative and finite.
   * @param currency - The currency code ("USD" or "EUR").
   * @throws {Error} If the amount is negative or non-finite.
   */
  static create(amount: number, currency: SupportedCurrency): Price {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new Error("Invalid price amount");
    }
    const rounded = Math.round(amount * 100) / 100;
    return new Price(rounded, currency);
  }
}