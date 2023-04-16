import { FastifyInstance } from 'fastify';

import { loginHandler } from '../controllers/auth.controller';
import { $ref } from '../schema/auth.schema';

export default async (server: FastifyInstance) => {
  server.post(
    '/login',
    {
      schema: {
        body: $ref('loginSchema'),
        response: {
          200: $ref('loginResponseSchema'),
        },
      },
    },
    loginHandler
  );
};
