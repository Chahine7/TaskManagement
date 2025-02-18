
FROM node:20.13.1-alpine3.19 as build
WORKDIR /app/src
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM node:20.13.1-alpine3.19
RUN addgroup -S manager && adduser -S manager -G manager
USER manager
WORKDIR /usr/app
COPY --from=build /app/src/dist/task-manager-app/ ./
CMD node server/server.mjs
EXPOSE 4000
