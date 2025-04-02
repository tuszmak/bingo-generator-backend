import { NotFoundError } from "./errors.js";

export class UserNotFoundError extends NotFoundError {
  constructor(message: string) {
    super(message);
    this.name = "UserNotFoundError";
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}
