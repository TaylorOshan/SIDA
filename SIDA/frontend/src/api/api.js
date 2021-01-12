
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

async function getDatasetTile (name, x, y, z) {
  const CORE_URL = 'http://127.0.0.1:8000'

  const data = fetch(`${CORE_URL}/api/v1/${name}/${x}/${y}/${z}`, {
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

async function getFlowFromPoint (datasetName, point) {
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

async function getLocations (name) {
  const CORE_URL = 'http://127.0.0.1:8000'

  const data = fetch(`${CORE_URL}/api/v1/${name}/locations`, {
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

export { getDatasetTile, getLocations, getFlowFromPoint }
