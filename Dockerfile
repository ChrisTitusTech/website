FROM node:24-bookworm-slim

RUN corepack enable

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN chown -R node:node /app
USER node

EXPOSE 4321
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
