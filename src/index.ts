import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/api/", (c) => {
  return c.text("Hello Hono!");
});

app.get("api/board/:id", (c) => {
  c.req.param("id");
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
