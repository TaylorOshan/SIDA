
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

async function getDatasetTile(datasetName, x, y, z) {
  const CORE_URL = 'http://127.0.0.1:8000'

  const data = fetch(`${CORE_URL}/api/v1/${datasetName}/${x}/${y}/${z}`, {
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

async function getFlowFromPoint(datasetName, point) {
  const CORE_URL = 'http://127.0.0.1:8000'

  const data = fetch(`${CORE_URL}/api/v1/${datasetName}/${point}/flows`, {
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

async function getLocations(datasetName) {
  const CORE_URL = 'http://127.0.0.1:8000'

  const data = fetch(`${CORE_URL}/api/v1/${datasetName}/locations`, {
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

async function getEditedFlows(datasetName, locationName, sliders) {
  const CORE_URL = 'http://127.0.0.1:8000'

  let edits = {};
  for (let i in sliders) {
    let key = sliders[i].label;
    let val = sliders[i].val
    edits[key] = val;
  }

  const data = fetch(`${CORE_URL}/api/v1/${datasetName}/predict/`, {
    method: 'POST',
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

export { getDatasetTile, getLocations, getFlowFromPoint, getEditedFlows }

