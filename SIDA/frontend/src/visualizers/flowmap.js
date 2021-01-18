import FlowMapLayer from '@flowmap.gl/core';
import * as d3scaleChromatic from 'd3-scale-chromatic';
import store from '../store';
import * as geostats from './geostats';


async function getFlowLayer(flows, locations, locationName) {

  // These are Green
  // Inflows
  let colorMapDestination = ['rgba(30,185,128, 100)', 'rgba(30, 185, 128,60)', 'rgba(0,57,30, 40)', 'rgba(0,57,30, 0)'];
  colorMapDestination = colorMapDestination.reverse();

  // These are Red
  // Outflows
  let colorMapOrigin = ['rgba(255,6,0, 100)', 'rgba(255,6,0, 60)', 'rgba(98,0,2, 40)', 'rgba(128,128,128,0)'];
  colorMapOrigin = colorMapOrigin.reverse();

  if (flows) {
    let counts = [];
    for (let flow of flows) {
      counts.push(flow.count);
    }
    let gstats = new geostats(counts);
    var buckets = gstats.getQuantile(3);
    console.log(buckets);
  }

  function getFlowColor(count, origin) {

    for (let i = 0; i < buckets.length; i++) {
      if (count <= buckets[i]) {
        if (origin == store.getters.getPopupData.name) {
          return colorMapOrigin[i];
        } else {
          return colorMapDestination[i];
        }

      }
    }
  }

  const layer = new FlowMapLayer({
    id: store.getters.getDatasetName.toString(),
    locations: locations,
    flows: flows,
    pickable: true,
    darkMode: false,
    mixBlendMode: 'screen',
    showLocationAreas: false,
    maxLocationCircleSize: 0,
    showTotals: false,
    visible: store.getters.getFlowVisibility,
    // showOnlyTopFlows: 10000,
    maxFlowThickness: 10,
    outlineThickness: 2,
    colors: {
      flows: {
        scheme: d3scaleChromatic.schemeDark2
      },
      outlineColor: 'rgba(69,69,69, 70)',

    },
    getFlowMagnitude: (f) => f.count,//Math.sqrt(f.count),
    getFlowOriginId: (f) => f.origin,
    getFlowDestId: (f) => f.destination,
    getLocationId: (loc) => loc.name,
    getLocationCentroid: (location) => [location.lat, location.lon],
    getFlowColor: (f) => getFlowColor(f.count, f.origin),
  })

  return layer

}

export { getFlowLayer };

