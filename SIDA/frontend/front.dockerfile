
FROM node:lts-alpine

LABEL maintainer="Matthew Tralka"
LABEL version="0.0.0"

WORKDIR /SIDA

COPY package*.json /
RUN npm install

CMD npm run serve