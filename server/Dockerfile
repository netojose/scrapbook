FROM node:14

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY . ./

RUN npm ci

CMD ["npm", "run", "dev"]