from operator import mul
from typing import MutableMapping
from typing import Optional

from fastapi import APIRouter

from ..db.classes import Dataset as DatasetModel
from ..db.classes import Flows as FlowModel
from ..db.classes import Locations as LocationModel
from ..db.schema import EditedFlow as EditedFlowModel
from ..flows.alter_attrs import modify_loc


# from ..worker import celery_app


router = APIRouter()


@router.get("/api/v1/datasets")
async def get_possible_datasets():

    print("Getting all datasets")
    info = await DatasetModel.get_all()

    return {"data": info}


@router.get("/api/v1/dataset/{dataset_id}/")
async def get_dataset_info(dataset_id: str):

    print(f"Getting {dataset_id} info")
    info = await DatasetModel.get(dataset_id)

    return {"data": info}


@router.post("/api/v1/{dataset_name}/predict/")
async def get_predicted_flows(dataset_name: str, edit: EditedFlowModel):

    flows = await FlowModel.get_flows_from_point(dataset_name, edit.location_name)
    altered_flows, mse, abs_error, mult_diffs = modify_loc(
        edit.location_name, flows, edit.edits
    )

    return {
        "flows": altered_flows,
        "mse": mse,
        "absError": abs_error,
        "multDiffs": mult_diffs,
    }


@router.get("/api/v1/{dataset_name}/{x}/{y}/{z}")
async def get_tile_flows(dataset_name: str, x: float, y: float, z: float):
    print(f"Getting {dataset_name} -x {x} -y {y} -z {z}")
    flows = await FlowModel.get(0)
    return {"flows": flows}


@router.get("/api/v1/{dataset_name}/{point_name}/flows")
async def get_flows_from_point(dataset_name: str, point_name: str):

    print(f"Getting {dataset_name} from point {point_name}")

    flows = await FlowModel.get_flows_from_point(dataset_name, point_name)
    altered_flows, _, _, _ = modify_loc(
        point_name, flows, {"o_attr": 100, "d_attr": 100}
    )

    return {"flows": altered_flows}


@router.get("/api/v1/{dataset_name}/locations")
async def get_locations(
    dataset_name: str, start_index: Optional[int] = None, items: Optional[int] = None
):

    if start_index:
        locations = await LocationModel.get_from_index(
            dataset_name, start_index, limit=items
        )
    else:
        locations = await LocationModel.get(dataset_name)

    return {"locations": locations}
