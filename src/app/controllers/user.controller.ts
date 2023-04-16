import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateUserSchemaInput } from '../schema/user.schema';
import { prisma } from '../services/db.services';
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

export const listUsersHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  return await prisma.user.findMany({
    select: {
      email: true,
      name: true,
      id: true,
    },
  });
};
