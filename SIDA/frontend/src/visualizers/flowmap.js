import FlowMapLayer from '@flowmap.gl/core';
import * as d3scaleChromatic from 'd3-scale-chromatic';
import store from '../store';
import * as geostats from './geostats';


async function getFlowLayer(flows, locations, locationName) {

  // These are Green
  //let colorMapDestination = ['#045d56', '#459488', '#89cebb', '#ffffe0'];
  //let colorMapDestination = ['#00391e', '#005f35', '#007d51', '#009c68', '#1eb980', '#00e5a8', '#37efba', '#5df7d2', '#88fee1', '#b6fff2'];
  let colorMapDestination = ['rgba(255,0,0, 100)', 'rgba(255,0,0, 80)', 'rgba(255,0,0, 60)', 'rgba(128,128,128,0)'];
  colorMapDestination = colorMapDestination.reverse();

  // These are Red
  //let colorMapOrigin = ['#ff6859', '#f59378', '#e9b692', '#ffcf44'];
  //let colorMapOrigin = ['#620002', '#8c0000', '#b50000', '#df0000', '#ff0600', '#ff3522', '#ff6859', '#ff857c', '#ffb3a6', '#ffd7d0'];
  let colorMapOrigin = ['rgba(4,93,86, 100)', 'rgba(4, 93, 86,80)', 'rgba(51,52,50, 60)', 'rgba(51,52,50, 0)'];
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
        if (origin === store.getters.getPopupData.name) {
          return colorMapDestination[i];
        } else {
          return colorMapOrigin[i];
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
    outlineThickness: 0,
    colors: {
      flows: {
        scheme: d3scaleChromatic.schemeDark2
      },
      outlineColor: 'rgba(69,69,69, 70)',

    },
    getFlowMagnitude: (f) => Math.sqrt(f.count),
    getFlowOriginId: (f) => f.origin,
    getFlowDestId: (f) => f.destination,
    getLocationId: (loc) => loc.name,
    getLocationCentroid: (location) => [location.lat, location.lon],
    getFlowColor: (f) => getFlowColor(f.count, f.origin),
  })

  return layer

}

export { getFlowLayer };

