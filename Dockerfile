FROM node:12-alpine

COPY . .

RUN npm i

CMD ["npm", "start"]