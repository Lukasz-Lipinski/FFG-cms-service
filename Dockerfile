FROM node:alpine

WORKDIR /

COPY package*.json ./

RUN npm ci

COPY . .

COPY .env ./

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
