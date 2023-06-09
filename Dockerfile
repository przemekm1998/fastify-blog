FROM node:18 as builder

RUN apt-get update && \
    npm i -g npm@^8 pnpm@^7.25.0 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json pnpm*.yaml ./
RUN pnpm install

COPY . .
RUN npx prisma generate
RUN pnpm run build

EXPOSE 3000
CMD [ "pnpm", "run", "dev" ]