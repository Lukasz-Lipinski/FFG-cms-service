FROM node

WORKDIR /src/app

ARG name=ffg-service

COPY package*.json ./

RUN npm install

COPY . .

COPY .env ./

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
