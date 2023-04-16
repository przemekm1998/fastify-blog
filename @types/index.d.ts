export interface IUser {
  id: number;
  email: string;
  name: string;
}

declare module 'fastify' {
  export interface FastifyInstance {
    auth: any;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: IUser;
  }
}
