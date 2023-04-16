import fcookie from '@fastify/cookie';
import fjwt from '@fastify/jwt';
import fastify from 'fastify';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import * as authConstants from './constants/auth.constants';
import { authRoutes, productRoutes, userRoutes } from './routes';
import { authSchemas, productSchemas, userSchemas } from './schema';
import { SIGNING_SECRET } from './settings';

export const createServer = (): FastifyInstance => {
  const server = fastify({ logger: true });

  registerPlugins(server);
  registerDecorators(server);
  registerSchemas(server);
  registerRoutes(server);

  return server;
};

const registerPlugins = (server: FastifyInstance): void => {
  server.register(fjwt, {
    secret: SIGNING_SECRET,
    cookie: {
      cookieName: authConstants.ACCESS_TOKEN_COOKIE_NAME,
      signed: false,
    },
  });
  server.register(fcookie, {
    secret: SIGNING_SECRET,
  });
};

const registerDecorators = (server: FastifyInstance): void => {
  server.decorate('auth', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (e) {
      return reply.send(e);
    }
  });
};

const registerSchemas = (server: FastifyInstance): void => {
  const schemas = [...userSchemas, ...authSchemas, ...productSchemas];

  for (const schema of schemas) {
    server.addSchema(schema);
  }
};

const registerRoutes = (server: FastifyInstance): void => {
  server.get('/health', async () => {
    return { status: 'OK' };
  });

  server.register(userRoutes, { prefix: 'users' });
  server.register(authRoutes, { prefix: 'auth' });
  server.register(productRoutes, { prefix: 'products' });
};
