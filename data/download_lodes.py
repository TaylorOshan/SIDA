import requests

BASE = "https://lehd.ces.census.gov/data/lodes/LODES7/"

def download_lodes(state, contained=True, year=2018):
    ''' 
    Get data from the LODES database. Designed to be run from this directory.
    Inputs:
        - state = single string of state to get
        - year  = year for data to be queried from

    Resources:
        See https://lehd.ces.census.gov/data/lodes/LODES7/LODESTechDoc7.5.pdf
        for more details.
    '''
    if contained:
        prefix = 'main'
        filenames = dict.fromkeys(['od', 'wac', 'rac'])
    else:
        prefix = 'aux'
        filenames = dict.fromkeys(['od'])

    ending = str(year) + '.csv.gz'  # ending of all filenames
    
    for kind in filenames.keys():
        qrystart = BASE + '/' + state + '/' + kind + '/'
        datafile = state + '_' + kind + '_'

        if kind == 'od':
            datafile += prefix + '_JT00_' + ending
        if kind == 'rac' or kind == 'wac':
            datafile += 'S000_JT00_' + ending
        filenames[kind] = datafile

        r = requests.get(qrystart + datafile)

        with open(datafile, 'wb') as f:
            f.write(r.content)

    return filenames
