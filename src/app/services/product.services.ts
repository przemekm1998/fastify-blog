import { Product } from '@prisma/client';

import { CreateProductInput } from '../schema/product.schema';
import { prisma } from './db.services';

export const createProduct = async (input: CreateProductInput & { ownerId: number }): Promise<Product> => {
  return prisma.product.create({ data: input });
};

export const listProducts = async () => {
  return prisma.product.findMany({
    select: {
      content: true,
      title: true,
      price: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      owner: {
        select: {
          name: true,
          id: true,
          email: true,
        },
      },
    },
  });
};
