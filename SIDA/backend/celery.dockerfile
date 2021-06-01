FROM python:3.9.5

LABEL maintainer="Matthew Tralka"
LABEL version="0.0.0"

WORKDIR /SIDA

RUN apt-get update -y && \
    apt-get install -y python-pip python-dev

COPY requirements.txt .

RUN pip install -r requirements.txt


COPY worker-start.sh /worker-start.sh

# COPY ..env /app

COPY ./app /app

RUN chmod +x /worker-start.sh

CMD ["bash", "/worker-start.sh"]