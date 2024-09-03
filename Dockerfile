FROM node:18.11.11-alpine3.15

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [npm run dev]