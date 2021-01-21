import numpy as np


PARAMS = np.array([-10.72759531, 0.85008358, 0.69287354, -0.34175847])


def predict(o_attrs, d_attrs, cost):
    """
    Using the parameters above, predict new flows for the LODES dataset.
    ---------------
    INPUTS
    - o_attrs: list of origin attributes for the desired loc
    - d_attrs: list of dest attributes for the desired loc
    - cost:    list of costs (edge weights) for the desired loc
    Each of these must be sliced from the database for any flow with the
    given location as either an origin or a destination.
    ---------------
    OUTPUTS
    - predicted flows in and out of the given location
    """

    cost = cost.reshape(-1, 1)

    intercept, o_params, d_params, dist_param = PARAMS

    rhs = (
        intercept
        + np.multiply(o_params, np.log(o_attrs))
        + np.multiply(d_params, np.log(d_attrs))
        + np.multiply(dist_param, np.log(cost))
    )

    return np.exp(rhs)
