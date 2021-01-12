import {TileLayer} from '@deck.gl/geo-layers';


async function setTiler() {
    const layer = new FlowMapLayer({
        id: new Date().getTime(),
        locations: data.locations,
        flows: data.flows,
        pickable: true,
        mixBlendMode: "screen",
        showLocationAreas: true,
        maxLocationCircleSize: 10,
        showOnlyTopFlows: 10000,
        showTotals: true,
        colors: {
            flows: {
                scheme: d3scaleChromatic.schemeGnBu[d3scaleChromatic.schemeGnBu.length - 1],
            }
        },
        getFlowMagnitude: (f) => f.count, //f.properties.scalerank,
        getFlowOriginId: (f) => f.origin, //"LHR",
        getFlowDestId: (f) => f.destination, //f.properties.abbrev,
        getLocationId: (loc) => loc.name, //f.properties.abbrev,
        getLocationCentroid: (location) => [location.lat, location.lon], //f.geometry.coordinates,

    })
    return layer
}

export { getFlowLayer };
