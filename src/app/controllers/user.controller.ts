import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateUserSchemaInput } from '../schema/user.schema';
import * as userServices from '../services/user.services';

export const registerUserHandler = async (
  request: FastifyRequest<{
    Body: CreateUserSchemaInput;
  }>,
  reply: FastifyReply
) => {
  const body = request.body;

  const user = await userServices.createUser(body);

  return reply.code(201).send(user);
};
