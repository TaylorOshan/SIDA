from typing import Dict
from typing import List

import pandas as pd

from .predict import predict


def modify_loc(name: str, flowsrows: List, attrs: Dict):
    """
    Predicts new flows when the given attributes of location id are changed
    by the given factors.
    ---------------
    INPUTS
    - name: name of the location
    - flowsrows: list of DB objects for the given location
    - attrs: dictionary of k-v pairs (attribute, factor)
    ---------------
    OUTPUTS
    - predicted flows with the given attributes modified by the given factors
    """

    types_dict = {
        "origin": str,
        "destination": str,
        "cost": float,
        "count": int,
        "id": int,
        "o_attr": float,
        "d_attr": float,
    }
    flowsrows = pd.DataFrame.from_records(flowsrows).astype(types_dict)

    for attr, factor in attrs.items():
        if attr.startswith("o_"):
            flowsrows.loc[flowsrows.origin == name, [attr]] *= factor / 100
        elif attr.startswith("d_"):
            flowsrows.loc[flowsrows.destination == name, [attr]] *= factor / 100

    o_attrs = [x for x in flowsrows.columns if x.startswith("o_")]
    d_attrs = [x for x in flowsrows.columns if x.startswith("d_")]

    flowsrows["count"] = predict(
        flowsrows[o_attrs].values, flowsrows[d_attrs].values, flowsrows["cost"].values
    )
 
    return flowsrows.to_dict(orient="records")


def remove(name: str, flowsrows):
    """
    Removes location name from the flow calculation by setting its attributes
    to 0 and recomputing predicted flows.
    ---------------
    INPUTS
    - name: name of the location
    - flowsrows: rows of the flows dataframe for the location
    ---------------
    OUTPUTS
    - predicted flows with location name removed
    """

    return modify_loc(name, flowsrows, attrs={"o_attr": 0, "d_attr": 0})
