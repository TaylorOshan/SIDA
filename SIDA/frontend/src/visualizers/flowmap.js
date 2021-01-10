import FlowMapLayer from '@flowmap.gl/core'
import * as d3scaleChromatic from 'd3-scale-chromatic'
async function getFlowLayer (flows, locations, name) {
  function setColor (dest) {
    if (dest == name) {
      console.log('destinatin match')
      return [255, 255, 255]
    }
  }

  const layer = new FlowMapLayer({
    id: new Date().getTime(),
    locations: locations,
    flows: flows,
    pickable: true,
    darkMode: false,
    mixBlendMode: 'screen',
    showLocationAreas: false,
    maxLocationCircleSize: 0,
    showTotals: false,
    // showOnlyTopFlows: 10000,
    maxFlowThickness: 10,
    colors: {
      flows: {
        scheme: d3scaleChromatic.schemeDark2 // schemeDark2,
      }
      // flows: {
      //     scheme: [
      //         'rgb(0, 22, 61)',
      //         'rgb(0, 27, 62)',
      //         'rgb(0, 36, 68)',
      //         'rgb(0, 48, 77)',
      //         'rgb(3, 65, 91)',
      //         'rgb(48, 87, 109)',
      //         'rgb(85, 115, 133)',
      //         'rgb(129, 149, 162)',
      //         'rgb(179, 191, 197)',
      //         'rgb(240, 240, 240)',
      //     ],
      // },

    },
    getFlowMagnitude: (f) => Math.log10(f.count), // f.properties.scalerank,
    getFlowOriginId: (f) => f.origin, // "LHR",
    getFlowDestId: (f) => f.destination, // f.properties.abbrev,
    getLocationId: (loc) => loc.name, // f.properties.abbrev,
    getLocationCentroid: (location) => [location.lat, location.lon] // f.geometry.coordinates,
    // getFlowColor: (f) => f.origin ? name : [255, 255, 255]
  })
  return layer
}

export { getFlowLayer }
