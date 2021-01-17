from typing import Dict
from typing import List

import numpy as np
import pandas as pd

from .predict import predict


def modify_loc(name: str, flowsrows: List, attrs: Dict):
    '''
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
    '''

    types_dict = {"origin": str, "destination": str, "cost" : float,
        "count": int, "id": int, "o_attr": float, "d_attr": float}
    flowsrows = pd.DataFrame.from_records(flowsrows)
    flowsrows.o_attr = flowsrows.o_attr.astype(float)
    flowsrows.d_attr = flowsrows.d_attr.astype(float)
    flowsrows = flowsrows.astype(types_dict)

    print(flowsrows.dtypes)
    print(flowsrows.head())

    # Modify attributes
    for attr, factor in attrs.items():
        print(attr, factor)
        print(factor / 100)
        if attr.startswith('o_'):  # origin attribute
            flowsrows.loc[flowsrows.origin == name, [attr]] *= (factor / 100)
        elif attr.startswith('d_'):  # destination attribute
            flowsrows.loc[flowsrows.destination == name, [attr]] *= (factor / 100)
    print(flowsrows.head())

    # Get all origin/dest attribute columns
    o_attrs = [x for x in flowsrows.columns if x.startswith('o_')]
    d_attrs = [x for x in flowsrows.columns if x.startswith('d_')]

    return predict(flowsrows[o_attrs], flowsrows[d_attrs], flowsrows['cost']) # prediction of the flow dataframe slice
    

def remove(name: str, flowsrows):
    '''
    Removes location name from the flow calculation by setting its attributes
    to 0 and recomputing predicted flows.
    ---------------
    INPUTS
    - name: name of the location
    - flowsrows: rows of the flows dataframe for the location
    ---------------
    OUTPUTS
    - predicted flows with location name removed
    '''

    return modify_loc(name, flowsrows, attrs={'o_attr' : 0, 'd_attr' : 0})
