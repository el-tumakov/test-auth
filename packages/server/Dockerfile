FROM node:18-alpine as builder

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine as runner

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --production

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/*.env.* ./

CMD yarn mikro-orm migration:up; node dist/src/main
