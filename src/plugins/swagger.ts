import fp from "fastify-plugin";
import swagger, { SwaggerOptions } from "fastify-swagger";

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp<SwaggerOptions>(async (fastify, _opts) => {
  fastify.register(swagger, {
    mode: "dynamic",
  });
});
