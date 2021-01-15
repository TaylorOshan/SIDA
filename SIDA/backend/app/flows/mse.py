import numpy as np

def mse(observed, predicted):
    return ((observed - predicted)**2).sum()/observed.shape[0]