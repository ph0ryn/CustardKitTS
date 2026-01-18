export class CustardKitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustardKitError";
  }
}

export class ValidationError extends CustardKitError {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class InvalidIdentifierError extends CustardKitError {
  constructor(identifier: string) {
    super(`Invalid identifier: ${identifier}`);
    this.name = "InvalidIdentifierError";
  }
}
