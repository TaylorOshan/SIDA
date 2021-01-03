import FlowMapLayer from "@flowmap.gl/core";
import { createStore } from 'vuex';

export default createStore({
    state: {
        locations: [],
        flows: [],
        dataLoading: true,
        layers: []

    },
    mutations: {
        setDataLoading: (state, bool) => state.dataLoading = bool,
        setLocations: (state, items) => state.locations.splice(0, state.locations.length, ...items),
        setFlows: (state, items) => {
            state.flows.splice(0, state.flows.length, ...items)
            console.log("flows being set");
            console.log(state.flows);
        },
        setLayer: (state, layer) => {
            console.log("set store layers");
            state.layers.splice(0, state.layers.length, layer)
        },

        removeLocation: (state, item) => {
            console.log("remove called");
            //let index = state.locations.indexOf(item);
            console.log(state.locations.item);
            if (item > -1) {
                state.locations.splice(item, 1);
            }
            console.log(state.locations);

        },
        removeFlow: (state, item) => {
            console.log("remove flow called");
            //let index = state.locations.indexOf(item);
            console.log(state.flows.item);
            if (item > -1) {
                state.flows.splice(item, 1);
            }
            console.log(state.flows);

        },

    },
    getters: {
        getDataLoading: state => state.dataLoading,
        getFlows: state => {
            console.log("get flow called");
            return state.flows;
        },
        getLocations: state => {
            return state.locations;
        },
        getLayers: state => {
            console.log("getting store layers");
            return state.layers
        },

        getLatestFlowLayer: state => {
            console.log("get current flow layer called");
            console.log(state.dataLoading);
            if (!state.dataLoading) {
                console.log("passed truth loading");
                return new FlowMapLayer({
                    id: new Date().getTime(),
                    locations: state.locations,
                    flows: state.flows,
                    pickable: true,
                    mixBlendMode: "multiply",
                    showLocationAreas: false,
                    getFlowMagnitude: (f) => f.count, //f.properties.scalerank,
                    getFlowOriginId: (f) => f.origin, //"LHR",
                    getFlowDestId: (f) => f.dest, //f.properties.abbrev,
                    getLocationId: (loc) => loc.id, //f.properties.abbrev,
                    getLocationCentroid: (loc) => [loc.lon, loc.lat], //f.geometry.coordinates,
                    showLocationAreas: false,
                    maxFlowThickness: 2,
                });
            }

        }

    },
    actions: {

        load: async ({ commit }) => {
            const AIR_PORTS = "http://127.0.0.1:8000/layer";
            //"https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";

            return fetch(AIR_PORTS, {
                method: "get",
                headers: {
                    "content-type": "application/json",
                },
            })
                .then((res) => {
                    console.log(res);
                    if (!res.ok) {
                        console.log("API response not OK... throwing error");
                        const error = new Error(res.statusText);
                        error.json = res.json();
                        throw error;
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log("Received API Features");
                    console.log(data);
                    console.log("done fetch");
                    console.log(data);
                    commit("setLocations", data.locations);
                    commit("setFlows", data.flows);
                    commit("setDataLoading", false);

                })




        }


    }
})