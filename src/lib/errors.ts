export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode = 400, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 422);
    }
}

export class AuthError extends AppError {
    constructor(message = "Unauthorized access") {
        super(message, 401);
    }
}

export class RateLimitError extends AppError {
    constructor(message = "Too many requests. Please try again later.") {
        super(message, 429);
    }
}

export function handleServiceError(error: unknown): string {
    if (error instanceof AppError) {
        return error.message;
    }
    if (error instanceof Error) {
        // Sanitize database or internal firebase errors before returning to user
        if (error.message.includes("permission-denied")) {
            return "You do not have permission to perform this action.";
        }
        if (error.message.includes("quota-exceeded")) {
            return "Service capacity reached. Please try again later.";
        }
        return error.message;
    }
    return "An unexpected error occurred. Please try again.";
}
