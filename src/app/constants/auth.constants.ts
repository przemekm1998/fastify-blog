export enum Errors {
  InvalidCredentials = 'User with given e-mail and password does not exist.',
}

export const ACCESS_TOKEN_COOKIE_NAME = 'token';
export const ACCESS_TOKEN_COOKIE_MAX_AGE = 60 * 2 * 100; // milliseconds
