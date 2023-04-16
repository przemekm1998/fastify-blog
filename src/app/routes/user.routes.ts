import { FastifyInstance } from 'fastify';

import { registerUserHandler } from '../controllers/user.controller';
import { $ref } from '../schema/user.schema';

export default async (server: FastifyInstance) => {
  server.post(
    '/',
    {
      schema: {
        body: $ref('createUserSchema'),
        response: { 201: $ref('readUserSchema') },
      },
    },
    registerUserHandler
  );
};
