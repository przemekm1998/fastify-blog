import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

import { CreateUserSchemaInput } from '../schema/user.schema';
import { prisma } from './db.services';

export const createUser = async (userInput: CreateUserSchemaInput): Promise<User> => {
  const { password, ...rest } = userInput;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: { ...rest, salt, password: hashedPassword },
  });

  return user;
};
