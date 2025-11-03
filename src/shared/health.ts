export function checkHealth(): { status: string; timestamp: Date } {
    return {
        status: "ok",
        timestamp: new Date()
    };
}
