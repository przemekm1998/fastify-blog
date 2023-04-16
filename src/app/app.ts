import fcookie from '@fastify/cookie';
import fjwt from '@fastify/jwt';
import fastify from 'fastify';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import { authSchemas } from './schema/auth.schema';
import { userSchemas } from './schema/user.schema';

export const createServer = (): FastifyInstance => {
  const server = fastify({ logger: true });

  server.register(fjwt, {
    secret: 'secret',
  });
  server.register(fcookie, {
    secret: 'secret',
  });

  server.decorate('auth', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (e) {
      return reply.send(e);
    }
  });

  const schemas = [userSchemas, authSchemas];
  for (const schema of schemas) {
    for (const s of schema) {
      server.addSchema(s);
    }
  }

  server.get('/health', async () => {
    return { status: 'OK' };
  });

  server.register(userRoutes, { prefix: 'users' });
  server.register(authRoutes, { prefix: 'auth' });

  return server;
};
