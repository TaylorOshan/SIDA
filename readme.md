# Workflows

## Dev

- clone repo
- build docker-compose-dev
- run docker-compose-dev

### launch

- [Frontend](http://localhost:3000)
- [Backend_Docs](http://localhost:8000/docs)

## Prod

- *wip,see SIDA/Dockerfile*
- Essentially the same, but we run a staged Dockerfile that builds src and copies to a nginx instance
- CORS in frontend/app/main needs to be modified accordingly
- ^^ optimally, this should be done with the DOCKER .env tag
