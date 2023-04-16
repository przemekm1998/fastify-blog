import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateProductInput } from '../schema/product.schema';
import * as productServices from '../services/product.services';

export const createProductHandler = async (
  request: FastifyRequest<{
    Body: CreateProductInput;
  }>
) => {
  const product = await productServices.createProduct({ ...request.body, ownerId: request.user.id });
  return product;
};

export const listProductsHandler = async () => {
  return await productServices.listProducts();
};
