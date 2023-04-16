import { FastifyReply, FastifyRequest } from 'fastify';

import { server } from '../../index';
import { ACCESS_TOKEN_COOKIE_MAX_AGE, ACCESS_TOKEN_COOKIE_NAME } from '../constants/auth.constants';
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

    return reply
      .code(200)
      .setCookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
        secure: false,
        httpOnly: true,
        sameSite: true,
        maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE,
      })
      .send({ accessToken: accessToken });
  } catch (e) {
    if (e instanceof ServiceError) {
      return reply.code(401).send(e.message);
    } else {
      throw e;
    }
  }
};
