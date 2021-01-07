# Useful Links for Dev

- [Frontend](http://localhost:3000)
- [Backend_Docs](http://localhost:8000/docs)

- Color
    - VOID : #0E0B16
    - FUSCHIA : #A239CA
    - JEWEL : #4717F6
    - STARK : #E7DFDD

- Start FastAPI
    - `uvicorn app.main:app --reload`
- Send revision to Alembic (db) - run from fastapi container
    - `alembic revision --autogenerate -m "$MESSAGE"`
- Upgrade DB (after revision send)
    - `alembic upgrade head` - run from fastapi container

- FLOWMAP.gl
    -[Storybook](https://teralytics.github.io/flowmap.gl/index.html?path=/story/basic--basic-as-layer)
- DECK.gl
    -[API](https://deck.gl/docs/api-reference/core/deck)
- VUEX
    -[API](https://vuex.vuejs.org/)
- VUE 3
    -[API](https://v3.vuejs.org/api/)
- VUE ROUTER
    -[API](https://router.vuejs.org/api/)
- Mapbox
    -[API](https://docs.mapbox.com/mapbox-gl-js/api/)
    -[Styles](https://docs.mapbox.com/api/maps/styles/)
- FastAPI
    -[API](https://fastapi.tiangolo.com/)