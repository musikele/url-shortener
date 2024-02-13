import path from 'node:path';

import Fastify from 'fastify';
import FastifyStatic from '@fastify/static';
import FastifyFormbody from '@fastify/formbody';

import { saveUrl, getUrl } from './db';

const fastify = Fastify({
  logger: true,
});

fastify.register(FastifyStatic, {
  root: path.join(__dirname, 'public'),
});

fastify.register(FastifyFormbody);

fastify.post('/shorten', async function handler(request, reply) {
  const { url } = request.body as { url: string };
  console.log('1st step: ', url);
  const slug = Math.random().toString(36).slice(2);
  await saveUrl(url, slug);
  reply.redirect('/url-shortened.html?shortened=' + slug);
});

fastify.get('/s/:slug', async function handler(request, reply) {
  const { slug } = request.params as { slug: string };
  const result = await getUrl(slug);
  console.log('2nd step: ', result);
  if (result?.url) {
    reply.redirect(result.url);
  }
});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
