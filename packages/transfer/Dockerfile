FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

EXPOSE 3010

CMD ["npm", "run", "dev"]