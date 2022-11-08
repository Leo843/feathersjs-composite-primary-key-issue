FROM node:16 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY src src
COPY test test
COPY config config
CMD ["node", "."]
