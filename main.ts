import { buildServer } from "./src/infrastructure/http/server.js";

/**
 * Parses and validates port configuration.
 * Defaults safely to 3000 if invalid or out of range.
 */
function getPort(): number {
  const rawPort = process.env.PORT;
  if (!rawPort) return 3000;
  const parsed = parseInt(rawPort, 10);
  if (isNaN(parsed) || parsed < 1 || parsed > 65535) {
    console.warn(`[Server] Warning: Invalid PORT "${rawPort}" provided. Defaulting to 3000.`);
    return 3000;
  }
  return parsed;
}

const port = getPort();
const host = process.env.HOST || "0.0.0.0";

buildServer()
  .then(app => {
    app.listen({ port, host }, (err, address) => {
      if (err) {
        console.error("[Server] Failed to start server:", err);
        process.exit(1);
      }
      console.log(`[Server] Server listening on ${address}`);
    });

    const shutdown = async (signal: string) => {
      console.log(`[Server] Received ${signal}. Shutting down gracefully...`);
      try {
        await app.close();
        console.log("[Server] Server closed successfully.");
        process.exit(0);
      } catch (closeErr) {
        console.error("[Server] Error during server shutdown:", closeErr);
        process.exit(1);
      }
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  })
  .catch(err => {
    console.error("[Server] Error building server:", err);
    process.exit(1);
  });