import numpy as np
from predict import predict

def modify_loc(id, attrs, factors):
    '''
    Predicts new flows when the given attributes of location id are changed
    by the given factors.
    ---------------
    INPUTS
    - id: location id in the attribute dataframe
    - attrs: 
    - factors: 
    ---------------
    OUTPUTS
    - predicted flows with the given attributes modified by the given factors
    '''

    # query attributes database
    # query flows database

    if attrs == 'all':
        attrs = []  # figure out some way to get all the attribute columns
    
    for i in range(len(attrs)):
        # multiply attribute by given factor:
        # - in attributes database, just change the row
        # - in flows database, change all relevant rows
        # could use two lists (attrs and factors)
        # could use a dict (pythonic)
        # could just do scalars and call this each time
        pass
    
    # return predict(o_attrs, d_attrs, cost) in the flow dataframe slice
    

def remove(id):
    '''
    Removes location id from the flow calculation by setting its attributes
    to 0 and recomputing predicted flows.
    ---------------
    INPUTS
    - id: location id in the attribute dataframe
    ---------------
    OUTPUTS
    - predicted flows with location id removed
    '''

    return modify_loc(id, attrs='all', factors=0)