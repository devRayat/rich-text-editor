import fp from "fastify-plugin";
import type { FastifyStaticOptions } from "fastify-static";
import { join } from "path";
/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp<FastifyStaticOptions>(async (fastify, _opts) => {
  fastify.register(import("fastify-static"), {
    root: join(process.cwd(), "src", "view"),
    prefix: "/view/",
  });

  fastify.register(import("fastify-static"), {
    root: join(process.cwd(), "node_modules", "socket.io"),
    prefix: "/node_modules/",
    decorateReply: false,
  });
});
