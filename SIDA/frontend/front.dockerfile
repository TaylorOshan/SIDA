
FROM node:lts-alpine

LABEL maintainer="Matthew Tralka"
LABEL version="0.0.0"

COPY package*.json /SIDA/

WORKDIR /SIDA

RUN npm install

COPY . .

# PROD
# RUN npm run build

#DEV
# RUN npm run dev

# EXPOSE 3000