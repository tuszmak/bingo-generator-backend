export class NoTableFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NoTableFoundError";
    Object.setPrototypeOf(this, NoTableFoundError.prototype);
  }
}

export class NoDetailsFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NoDetailsFoundError";
    Object.setPrototypeOf(this, NoDetailsFoundError.prototype);
  }
}
