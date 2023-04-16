import { FastifyReply, FastifyRequest } from 'fastify';

import { server } from '../../index';
import { ServiceError } from '../errors/common.errors';
import { LoginInputSchema } from '../schema/auth.schema';
import * as authServices from '../services/auth.services';

export const loginHandler = async (
  request: FastifyRequest<{
    Body: LoginInputSchema;
  }>,
  reply: FastifyReply
) => {
  const body = request.body;

  try {
    const user = await authServices.authUser(body);
    const { password, salt, ...userData } = user;
    const accessToken = server.jwt.sign(userData);

    return reply.code(200).send({ accessToken: accessToken });
  } catch (e) {
    if (e instanceof ServiceError) {
      return reply.code(401).send(e.message);
    } else {
      throw e;
    }
  }
};
