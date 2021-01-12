import time
from typing import List
from typing import Optional

from fastapi import APIRouter

from ..db.db import db
from ..db.models import Flows as FlowModel
from ..db.models import Locations as LocationModel
from ..db.schema import Flow as FlowSchema
from ..db.schema import Location as LocationSchema
from ..worker import celery_app


router = APIRouter()


@router.get("/api/v1/{dataset_name}/{x}/{y}/{z}")
async def get_tile_flows(dataset_name: str, x: float, y: float, z: float ):
    print(f"Getting {dataset_name} -x {x} -y {y} -z {z}")
    
    # locations = [
    #     {"id": 1, "name": "New York", "lat": 40.713543, "lon": -74.011219},
    #     {"id": 2, "name": "London", "lat": 51.507425, "lon": -0.127738},
    #     {"id": 3, "name": "Rio de Janeiro", "lat": -22.906241, "lon": -43.180244},
    # ]
    # flows = [
    #     {"origin": 1, "dest": 2, "count": 42},
    #     {"origin": 2, "dest": 1, "count": 51},
    #     {"origin": 3, "dest": 1, "count": 50},
    #     {"origin": 2, "dest": 3, "count": 40},
    #     {"origin": 1, "dest": 3, "count": 22},
    #     {"origin": 3, "dest": 2, "count": 42},
    #     {"origin": 1, "dest": 2, "count": 42},
    #     {"origin": 2, "dest": 1, "count": 51},
    #     {"origin": 3, "dest": 1, "count": 50},
    #     {"origin": 2, "dest": 3, "count": 40},
    #     {"origin": 1, "dest": 3, "count": 22},
    #     {"origin": 3, "dest": 2, "count": 42},
    # ]
    flows = await FlowModel.get(0)
    return {"flows": flows}


@router.get("/api/v1/{dataset_name}/{point_name}/flows")
async def get_flows_from_point(dataset_name: str, point_name: str):

    print(f"Getting {dataset_name} from point {point_name}")

    flows = await FlowModel.get_flows_from_point(0, point_name)

    return {"flows": flows}


@router.get("/api/v1/{dataset_name}/locations")
async def get_locations(
        dataset_name: str, start_index: Optional[int] = None, items: Optional[int] = None):
    
    if start_index:
        locations = \
            await LocationModel.get_from_index(0, start_index, limit=items)
    else:
        locations = await LocationModel.get(0)

    return {"locations": locations}





# @router.get("/data/locations")
# async def get_locations():
#     start = time.time()
#     location = await LocationModel.get(0)
#     print("took", time.time() - start)
#     return location

# @router.get("/data/flows")
# async def get_flows():
#     start = time.time()
#     flow = await FlowModel.get(0)
#     print("took", time.time() - start)
#     return { "flows": flow}
