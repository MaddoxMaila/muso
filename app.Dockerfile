FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Run prisma migrations
RUN npm run p-mg

EXPOSE 3000

CMD ["node", "build/index.js"]