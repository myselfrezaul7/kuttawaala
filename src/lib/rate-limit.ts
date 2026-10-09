/**
 * Simple in-memory sliding window rate limiter for client-side / service operations.
 */

interface RateLimitEntry {
    tokens: number;
    lastRefill: number;
}

interface LockoutState {
    failures: number[];
    lockedUntil: number;
}

class RateLimiter {
    private store: Map<string, RateLimitEntry> = new Map();
    private lockouts: Map<string, LockoutState> = new Map();

    private getLockoutState(key: string): LockoutState {
        let state = this.lockouts.get(key);
        if (!state && typeof window !== "undefined" && window.sessionStorage) {
            try {
                const stored = window.sessionStorage.getItem(`ratelimit_lockout_${key}`);
                if (stored) {
                    state = JSON.parse(stored);
                }
            } catch {
                // Ignore storage errors
            }
        }
        return state || { failures: [], lockedUntil: 0 };
    }

    private saveLockoutState(key: string, state: LockoutState): void {
        this.lockouts.set(key, state);
        if (typeof window !== "undefined" && window.sessionStorage) {
            try {
                window.sessionStorage.setItem(`ratelimit_lockout_${key}`, JSON.stringify(state));
            } catch {
                // Ignore storage errors
            }
        }
    }

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

    /**
     * Checks if a key is currently locked out under a cooldown period.
     */
    public isLocked(key: string): { locked: boolean; remainingMs: number } {
        const now = Date.now();
        const state = this.getLockoutState(key);
        if (state.lockedUntil > now) {
            return { locked: true, remainingMs: state.lockedUntil - now };
        }
        return { locked: false, remainingMs: 0 };
    }

    /**
     * Records a failure attempt. If failures reach maxFailures within windowMs,
     * enforces a cooldown for cooldownMs.
     */
    public recordFailure(
        key: string,
        maxFailures: number = 5,
        windowMs: number = 5 * 60 * 1000,
        cooldownMs: number = 60 * 1000
    ): { locked: boolean; remainingMs: number; failureCount: number } {
        const now = Date.now();
        const state = this.getLockoutState(key);

        // Filter out failures outside the sliding window
        state.failures = (state.failures || []).filter(ts => now - ts < windowMs);
        state.failures.push(now);

        if (state.failures.length >= maxFailures) {
            state.lockedUntil = now + cooldownMs;
            state.failures = []; // Reset failures after triggering cooldown
            this.saveLockoutState(key, state);
            return { locked: true, remainingMs: cooldownMs, failureCount: maxFailures };
        }

        this.saveLockoutState(key, state);
        return { locked: false, remainingMs: 0, failureCount: state.failures.length };
    }

    /**
     * Resets rate limiting tokens and failure lockouts for a specific key.
     */
    public reset(key: string): void {
        this.store.delete(key);
        this.lockouts.delete(key);
        if (typeof window !== "undefined" && window.sessionStorage) {
            try {
                window.sessionStorage.removeItem(`ratelimit_lockout_${key}`);
            } catch {
                // Ignore storage errors
            }
        }
    }
}

export const rateLimiter = new RateLimiter();
