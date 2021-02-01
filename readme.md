# Spatial Interaction Decision Analytics

Our vision is to streamline spatial interaction analysis through SIDA, a lightweight, flexible platform that allows users of all backgrounds to leverage predefined sets of organized results and visualizations for spatial interaction modelling. 

## Dependencies

- Docker
- Docker-compose

## Development Usage

- Clone repo locally
- Navigate to `SIDA/frontend`
  - `cd SIDA/frontend`
- adjust `docker-compose-dev.yml` env variables as needed
- Run `docker-compose -f "docker-compose-dev.yml" up -d --build`
- That's it!
  - Frontend - `http://localhost:8080`
  - Backend API documentation - `http://localhost:8000/docs`

## Production Usage (alpha)

- Clone repo locally
- Navigate to `SIDA/frontend`
  - `cd SIDA/frontend`
- adjust `docker-compose.yml` env variables as needed
- Run `docker-compose up -d --build`
- That's it!
  - Frontend - `http://localhost:8080`
  - Backend API documentation - `http://localhost:8000/docs`