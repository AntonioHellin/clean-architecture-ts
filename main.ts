import { buildServer } from "@infraestructure/http/server";

const port = Number(process.env.PORT) ?? 3000;
buildServer().then(app => app.listen({ port }))