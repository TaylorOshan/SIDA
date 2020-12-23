FROM python:3.8

LABEL maintainer="Matthew Tralka"
LABEL version="0.1.0"

EXPOSE 8080

# Create new user
#RUN useradd -ms /bin/bash admin
#USER admin

WORKDIR /SIDSaaS

COPY requirements.txt ./
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

COPY ./app /app

CMD flask run
