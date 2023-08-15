FROM node:20-alpine3.17

WORKDIR /ajaxchat/frontend

COPY package.json /ajaxchat/frontend/

RUN npm install

COPY . /ajaxchat/frontend/

EXPOSE 3000

CMD [ "npm", "start" ]