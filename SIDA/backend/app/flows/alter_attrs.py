import numpy as np
import pandas as pd
from predict import predict

def modify_loc(name, flowsrows, attrs):
    '''
    Predicts new flows when the given attributes of location id are changed
    by the given factors.
    ---------------
    INPUTS
    - name: name of the location
    - flowsrows: rows of the flows dataframe for the location
    - attrs: dictionary of k-v pairs (attribute, factor)
    ---------------
    OUTPUTS
    - predicted flows with the given attributes modified by the given factors
    '''
    
    # Modify attributes
    for attr, factor in attrs.items():
        if attr.startswith('o_'):  # origin attribute
            flowsrows[flowsrows['origin'] == name, attr] *= factor
        if attr.startswith('d_'):  # destination attribute
            flowsrows[flowsrows['dest'] == name] *= factor
    
    # Get all origin/dest attribute columns
    o_attrs = [x for x in flowsrows.columns if x.startswith('o_')]
    d_attrs = [x for x in flowsrows.columns if x.startswith('d_')]

    return predict(flowsrows[o_attrs], flowsrows[d_attrs], flowsrows['cost']) # prediction of the flow dataframe slice
    

def remove(name, flowsrows):
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