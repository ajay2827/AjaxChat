FROM node:lastest

WORKDIR /ajaxchat/backend

COPY package.json  /ajaxchat/backend/

RUN npm install

COPY . /ajaxchat/backend/

EXPOSE 5500

CMD [ "nodemon", "app" ]
