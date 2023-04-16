import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

import { Errors } from '../constants/auth.constants';
import { ServiceError } from '../errors/common.errors';
import { LoginInputSchema } from '../schema/auth.schema';
import { prisma } from './db.services';

export const authUser = async (input: LoginInputSchema): Promise<User> => {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) {
    throw new ServiceError(Errors.InvalidCredentials);
  }

  if (!bcrypt.compare(input.password, user.password)) {
    throw new ServiceError(Errors.InvalidCredentials);
  }

  return user;
};
