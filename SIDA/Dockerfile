# FOR PROD
# NEEDS dependency: aiofiles
# REF: https://fastapi.tiangolo.com/tutorial/static-files/
FROM node:lts-alpine as build
WORKDIR /SIDA
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend ./
RUN npm run build

FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

RUN apt-get update -y && \
    apt-get install -y python-pip python-dev

WORKDIR /SIDA

COPY ./backend/requirements.txt .

RUN pip install -r requirements.txt

COPY ./backend/app /app
COPY --from=build /SIDA/dist /app/dist
