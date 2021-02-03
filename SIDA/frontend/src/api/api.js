
// const CORE_URL = "http://127.0.0.1:8000"

// async function getDatasetTile(dataset_name, x, y, z) {

//     response = fetch(`${CORE_URL}/api/v1/${dataset_name}/${x}/${y}/${z}`, {
//         method: "get",
//         headers: {
//             "content-type": "application/json",
//             "Accept-Encoding": "gzip",
//         },
//     }
//     )
//     // CORE_URL + dataset + tile + x + y
//     return response
// }

// export default {
//     getDatasetTile
// }

const CORE_URL = process.env.VUE_APP_BASE_URL

async function getDatasetInfo(datasetName) {

  const data = fetch(`${CORE_URL}/api/v1/dataset/${datasetName}`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      'Accept-Encoding': 'gzip'
    }
  })
    .then((res) => {
      if (!res.ok) {
        console.log('API response not OK... throwing error')
        const error = new Error(res.statusText)
        error.json = res.json()
        throw error
      }
      return res.json()
    })

  return data
}

async function getPossibleDatasets() {

  const data = fetch(`${CORE_URL}/api/v1/datasets`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      'Accept-Encoding': 'gzip'
    }
  })
    .then((res) => {
      if (!res.ok) {
        console.log('API response not OK... throwing error')
        const error = new Error(res.statusText)
        error.json = res.json()
        throw error
      }
      return res.json()
    })

  return data
}

async function getDatasetTile(datasetName, x, y, z) {

  const data = fetch(`${CORE_URL}/api/v1/${datasetName}/${x}/${y}/${z}`, {
    method: 'get',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      'Accept-Encoding': 'gzip'
    }
  })
    .then((res) => {
      if (!res.ok) {
        console.log('API response not OK... throwing error')
        const error = new Error(res.statusText)
        error.json = res.json()
        throw error
      }
      return res.json()
    })

  return data
}

async function getFlowFromPoint(datasetName, point) {


  const data = fetch(`${CORE_URL}/api/v1/${datasetName}/${point}/flows`, {
    method: 'get',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      'Accept-Encoding': 'gzip'
    }
  })
    .then((res) => {
      if (!res.ok) {
        console.log('API response not OK... throwing error')
        const error = new Error(res.statusText)
        error.json = res.json()
        throw error
      }
      return res.json()
    })

  return data
}

async function getLocations(datasetName) {

  const data = fetch(`${CORE_URL}/api/v1/${datasetName}/locations`, {
    method: 'get',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      'Accept-Encoding': 'gzip'
    }
  })
    .then((res) => {
      if (!res.ok) {
        console.log('API response not OK... throwing error')
        const error = new Error(res.statusText)
        error.json = res.json()
        throw error
      }
      return res.json()
    })

  return data
}

async function getEditedFlows(datasetName, locationName, sliders) {


  let edits = {};
  for (let i in sliders) {
    let key = sliders[i].label;
    let val = sliders[i].val
    edits[key] = val;
  }

  const data = fetch(`${CORE_URL}/api/v1/${datasetName}/predict/`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ "location_name": locationName, "edits": edits }),
    headers: {
      'content-type': 'application/json',
    }
  })
    .then((res) => {
      if (!res.ok) {
        console.log('API response not OK... throwing error')
        const error = new Error(res.statusText)
        error.json = res.json()
        throw error
      }
      return res.json()
    })

  return data
}

export { getDatasetTile, getLocations, getFlowFromPoint, getEditedFlows, getDatasetInfo, getPossibleDatasets }

