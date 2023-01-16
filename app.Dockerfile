FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run p-mg

RUN npm run build

# Run prisma migrations

EXPOSE 2828

CMD ["node", "dist/server.js"]