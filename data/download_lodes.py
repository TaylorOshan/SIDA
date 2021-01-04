import requests
import pandas as pd

BASE = "https://lehd.ces.census.gov/data/lodes/LODES7/"


def download_lodes(states, kind="od", year=2018):
    """
    Get data from the LODES database. Designed to be run from this directory.
    Inputs:
        - states = single string or list of strings of states to get
        - kind   = 'od', 'rac', or 'wac' -- the kind of file to get
        - year   = year for data to be queried from

    Resources:
        See https://lehd.ces.census.gov/data/lodes/LODES7/LODESTechDoc7.5.pdf
        for more details.
    """

    for state in states:
        qrystart = BASE + "/" + state + "/" + kind + "/"
        datafile = state + "_" + kind + "_main_JT00_" + year + ".csv.gz"
        r = requests.get(qrystart + datafile)

        with open(datafile, "wb") as f:
            f.write(r.content)
