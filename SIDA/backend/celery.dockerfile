FROM python:3.7

LABEL maintainer="Matthew Tralka"
LABEL version="0.0.0"

WORKDIR /SIDA

RUN apt-get update -y && \
    apt-get install -y python-pip python-dev

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY worker-start.sh /worker-start.sh

COPY ./app /app

RUN chmod +x /worker-start.sh

CMD ["bash", "/worker-start.sh"]