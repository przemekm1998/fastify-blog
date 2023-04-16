import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  password: z.string(),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
});

export type LoginInputSchema = z.infer<typeof loginSchema>;
export type LoginResponseSchema = z.infer<typeof loginResponseSchema>;

export const { schemas: authSchemas, $ref } = buildJsonSchemas(
  {
    loginSchema,
    loginResponseSchema,
  },
  { $id: 'AuthSchema' }
);
