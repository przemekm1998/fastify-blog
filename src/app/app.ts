import fastify from 'fastify';
import { FastifyInstance } from 'fastify';

import userRoutes from './routes/user.routes';
import { userSchemas } from './schema/user.schema';

export const createServer = (): FastifyInstance => {
  const server = fastify({ logger: true });

  for (const schema of userSchemas) {
    server.addSchema(schema);
  }

  server.get('/health', async () => {
    return { status: 'OK' };
  });

  server.register(userRoutes, { prefix: 'users' });

  return server;
};
