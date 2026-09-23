/**
 * Interface representing the service health status response.
 */
export interface HealthStatus {
    status: string;
    timestamp: Date;
}

/**
 * Checks service health and returns the current operational status and server timestamp.
 */
export function checkHealth(): HealthStatus {
    return {
        status: "ok",
        timestamp: new Date()
    };
}
