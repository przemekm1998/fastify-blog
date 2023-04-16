import { FastifyInstance } from 'fastify';

import { createProductHandler, listProductsHandler } from '../controllers/product.controller';
import { $ref } from '../schema/product.schema';

export default async (server: FastifyInstance) => {
  server.post(
    '/',
    {
      schema: {
        body: $ref('createProductSchema'),
        response: {
          201: $ref('productReadSchema'),
        },
      },
      preHandler: [server.auth],
    },
    createProductHandler
  );

  server.get(
    '/',
    {
      schema: {
        response: {
          200: $ref('productListSchema'),
        },
      },
    },
    listProductsHandler
  );
};
