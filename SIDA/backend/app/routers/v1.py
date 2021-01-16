from typing import Dict
from typing import List
from typing import Optional

from fastapi import APIRouter
from pydantic import BaseModel

from ..db.classes import Flows as FlowModel
from ..db.classes import Locations as LocationModel
from ..db.schema import EditedFlow as EditedFlowModel
from ..db.schema import Flow as FlowSchema
from ..db.schema import Location as LocationSchema
from ..flows.alter_attrs import *
from ..worker import celery_app


router = APIRouter()


@router.post("/api/v1/{dataset_name}/predict/")
async def get_predicted_flows(dataset_name: str, edits: EditedFlowModel):
    location_name = edits.location_name
    flow_edits = edits.edits
    
    print(location_name, flow_edits)
   

   
    return flow_edits


@router.get("/api/v1/{dataset_name}/{x}/{y}/{z}")
async def get_tile_flows(dataset_name: str, x: float, y: float, z: float):
    print(f"Getting {dataset_name} -x {x} -y {y} -z {z}")
    flows = await FlowModel.get(0)
    return {"flows": flows}


@router.get("/api/v1/{dataset_name}/{point_name}/flows")
async def get_flows_from_point(dataset_name: str, point_name: str):

    print(f"Getting {dataset_name} from point {point_name}")

    flows = await FlowModel.get_flows_from_point(dataset_name, point_name)

    return {"flows": flows}


@router.get("/api/v1/{dataset_name}/locations")
async def get_locations(
        dataset_name: str, start_index: Optional[int] = None, items: Optional[int] = None):

    if start_index:
        locations = \
            await LocationModel.get_from_index(
                dataset_name, start_index, limit=items)
    else:
        locations = await LocationModel.get(dataset_name)

    return {"locations": locations}
