import Fastify from 'fastify';
import FastifyStatic from '@fastify/static';
import path from 'node:path';

const fastify = Fastify({
  logger: true,
});

fastify.register(FastifyStatic, {
  root: path.join(__dirname, 'public'),
});

fastify.post('/shorten', async function handler(request, reply) {
  console.log(request.body);
  return { hello: 'world' };
});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
