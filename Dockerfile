FROM node:lts-alpine3.9

RUN mkdir /var/www
RUN mkdir /var/www/app

WORKDIR /var/www/app

COPY package.json .
RUN npm install

RUN npm -g install nodemon
RUN npm -g install sequelize-cli

COPY . .

RUN sequelize db:migrate

CMD [ "npm", "run", "dev" ]