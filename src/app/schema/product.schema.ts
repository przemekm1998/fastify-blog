import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

import { readUserSchema } from './user.schema';

const productBase = {
  title: z.string(),
  price: z.number(),
  content: z.string().optional(),
};

const productRead = {
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  owner: readUserSchema,
  ...productBase,
};

const createProductSchema = z.object({ ...productBase });
const productReadSchema = z.object({ ...productRead });
const productListSchema = z.array(productReadSchema);

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const { schemas: productSchemas, $ref } = buildJsonSchemas(
  {
    createProductSchema,
    productReadSchema,
    productListSchema,
  },
  { $id: 'ProductSchemas' }
);
