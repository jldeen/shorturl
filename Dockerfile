FROM node:lts-alpine3.16

RUN apk update && apk add fontconfig

COPY ./ ./ 

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
