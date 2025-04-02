import { NotFoundError } from "./errors.js";

export class TableNotFoundError extends NotFoundError {
  constructor(message: string) {
    super(message);
    this.name = "TableNotFoundError";
    Object.setPrototypeOf(this, TableNotFoundError.prototype);
  }
}

export class DetailsNotFoundError extends NotFoundError {
  constructor(message: string) {
    super(message);
    this.name = "DetailsNotFoundError";
    Object.setPrototypeOf(this, DetailsNotFoundError.prototype);
  }
}
