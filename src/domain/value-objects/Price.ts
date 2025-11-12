export class Price {
  constructor(readonly value: number, readonly currency: "USD" | "EUR") {}

  static create(amount: number, currency: "USD" | "EUR"): Price {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new Error("Invalid price amount");
    }
    const rounded = Math.round(amount * 100) / 100;
    return new Price(rounded, currency);
  }
}