FROM node:14

WORKDIR ./

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8021

CMD [ "node", "src/app.js"]
