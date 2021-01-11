import FlowMapLayer from '@flowmap.gl/core';
import * as d3scaleChromatic from 'd3-scale-chromatic';
import * as geostats from './geostats';

async function getFlowLayer(flows, locations, name) {

  // These are Green
  //let colorMapDestination = ['#045d56', '#459488', '#89cebb', '#ffffe0'];
  let colorMapDestination = ['#00391e', '#005f35', '#007d51', '#009c68', '#1eb980', '#00e5a8', '#37efba', '#5df7d2', '#88fee1', '#b6fff2'];
  colorMapDestination = colorMapDestination.reverse();

  // These are Red
  //let colorMapOrigin = ['#ff6859', '#f59378', '#e9b692', '#ffcf44'];
  let colorMapOrigin = ['#620002', '#8c0000', '#b50000', '#df0000', '#ff0600', '#ff3522', '#ff6859', '#ff857c', '#ffb3a6', '#ffd7d0'];
  colorMapOrigin = colorMapOrigin.reverse();

  if (flows) {
    let counts = [];
    for (let flow of flows) {
      counts.push(flow.count);
    }
    let gstats = new geostats(counts);
    var buckets = gstats.getQuantile(9);
    console.log(buckets);
  }

  function getFlowColor(count, origin) {

    for (let i = 0; i < buckets.length; i++) {
      if (count <= buckets[i]) {
        if (origin === name) {
          return colorMapDestination[i];
        } else {
          return colorMapOrigin[i];
        }

      }
    }
  }

  const layer = new FlowMapLayer({
    id: new Date().getTime(),
    locations: locations,
    flows: flows,
    pickable: true,
    darkMode: false,
    mixBlendMode: 'multiply',
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
    getLocationCentroid: (location) => [location.lat, location.lon], // f.geometry.coordinates,
    getFlowColor: (f) => getFlowColor(f.count, f.origin)
  })
  return layer
}


export { getFlowLayer };

