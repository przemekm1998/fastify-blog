import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

const userCore = {
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  name: z.string(),
};

const readUserSchema = z.object({
  ...userCore,
  id: z.number(),
});

const createUserSchema = z.object({
  ...userCore,
  password: z.string(),
});

export type CreateUserSchemaInput = z.infer<typeof createUserSchema>;
export type ReadUserSchema = z.infer<typeof readUserSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  readUserSchema,
});
