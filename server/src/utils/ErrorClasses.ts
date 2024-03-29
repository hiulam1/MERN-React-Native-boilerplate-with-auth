export class ExternalServiceError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "ExternalServiceError";
    this.statusCode = 503; // Service Unavailable
  }
}

export class ValidationError extends Error {
  statusCode: number; // Add the statusCode property
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400; // Bad Request
  }
}

export class InternalServerError extends Error {
  statusCode: number; // Add the statusCode property
  constructor(message = "An unexpected error occurred") {
    super(message);
    this.name = "InternalServerError";
    this.statusCode = 500; // Internal Server Error
  }
}

export class AuthenticationError extends Error {
  statusCode: number;
  constructor(message: string) {
    // Add type annotation to 'message' parameter
    super(message);
    this.name = "AuthenticationError";
    this.statusCode = 401;
  }
}

export class InvalidSessionError extends Error {
  statusCode: number;
  constructor(message: string) {
    // Add type annotation to 'message' parameter
    super(message);
    this.name = "InvalidSessionError";
    this.statusCode = 401;
  }
}
