/* eslint-disable */

import { ScatterplotLayer } from '@deck.gl/layers'
import store from '../store/index'

async function getScatterplotLayer(locations) {
  // function colorDecider (d) {
  //   if (d.inflows > d.outflows) {
  //     return [255, 140, 0]
  //   } else {
  //     return [0, 140, 255]
  //   }
  // }

  const layer = new ScatterplotLayer({
    id: new Date().getTime(),
    data: locations,
    pickable: true,
    opacity: 0.1,
    stroked: true,
    filled: true,
    radiusScale: 20,
    radiusMinPixels: 2.5,
    radiusMaxPixels: 30,
    lineWidthMinPixels: 1,
    visible: store.getters.getLocationVisibility,
    getPosition: d => [d.lat, d.lon],
    getRadius: d => Math.sqrt(d.outflows),//Math.sqrt(d.outflows),
    getFillColor: d => [255, 140, 0],
    getLineColor: d => [0, 0, 0],
    onClick: (info, event) => {
      if (info.object) {
        const { object, x, y } = info
        store.commit('SET_POPUP_INFO', {
          loc: [x, y],
          name: object.name,
          lat: object.lat,
          lon: object.lon,
          pop: object.population,
          in: object.inflows,
          out: object.outflows,
          show: true
        })
        store.dispatch('loadClickFlows', {
          x: object.lon,
          y: object.lat,
          name: object.name
        })
      } else {
        store.commit('SET_POPUP_INFO', { show: false })
      }
    }
  })

  return layer
}

export { getScatterplotLayer }
