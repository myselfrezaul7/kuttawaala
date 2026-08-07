/**
 * Simple in-memory sliding window rate limiter for client-side / service operations.
 */

interface RateLimitEntry {
    tokens: number;
    lastRefill: number;
}

class RateLimiter {
    private store: Map<string, RateLimitEntry> = new Map();

    /**
     * Checks if an action is allowed based on key, max requests, and window duration in ms.
     */
    public check(key: string, maxRequests: number, windowMs: number): { success: boolean; resetMs: number } {
        const now = Date.now();
        const entry = this.store.get(key) || { tokens: maxRequests, lastRefill: now };

        // Calculate refilled tokens based on time elapsed
        const timePassed = now - entry.lastRefill;
        if (timePassed >= windowMs) {
            entry.tokens = maxRequests;
            entry.lastRefill = now;
        }

        if (entry.tokens > 0) {
            entry.tokens -= 1;
            this.store.set(key, entry);
            return { success: true, resetMs: windowMs - (now - entry.lastRefill) };
        }

        return { success: false, resetMs: windowMs - (now - entry.lastRefill) };
    }
}

export const rateLimiter = new RateLimiter();
