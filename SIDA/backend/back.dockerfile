FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

LABEL maintainer="Matthew Tralka"
LABEL version="0.0.0"

WORKDIR /SIDA

RUN apt-get update -y && \
    apt-get install -y python-pip python-dev

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY ./app /app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000","--reload"]
