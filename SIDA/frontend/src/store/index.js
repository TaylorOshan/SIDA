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
        setLocations: (state, items) => {
            //state.locations.splice(0, state.locations.length, ...items)
            state.locations = items.slice();
            console.log("Locations Set");
        },
        setFlows: (state, items) => {
            state.flows = items.slice();
            //state.flows.splice(0, state.flows.length, ...items)
            console.log("Flows Set");
        },
        setLayer: (state, newLayer) => {
            console.log("Layer Set");
            state.layers = newLayer;
        },
        addLayer: (state, newLayer) => {
            console.log("Adding New Layer");
            state.layers.push(newLayer);
            //state.layers.splice(0, state.layers.length, layer)
        },

        removeLocation: (state, item) => {
            console.log("Removing", state.locations[item].name);
            if (item > -1) {
                state.locations.splice(item, 1);
            }
            console.log("Remaining", state.locations);

        },
        removeFlow: (state, item) => {
            console.log("Removing Flow :", state.flows[item].origin, state.flows[item].dest);
            if (item > -1) {
                state.flows.splice(item, 1);
            }
        },

    },
    getters: {

        getDataLoading: state => state.dataLoading,
        getFlows: state => state.flows,
        getLocations: state => state.locations,
        getLayers: state => state.layers,

    },
    actions: {

        load: async ({ commit }) => {
            const URL = "http://127.0.0.1:8000/layer";

            fetch(URL, {
                method: "get",
                headers: {
                    "content-type": "application/json",
                },
            })
                .then((res) => {
                    //console.log(res);
                    if (!res.ok) {
                        console.log("API response not OK... throwing error");
                        const error = new Error(res.statusText);
                        error.json = res.json();
                        throw error;
                    }
                    return res.json();
                })
                .then((data) => {

                    //console.log(data);
                    commit("setLocations", data.locations);
                    commit("setFlows", data.flows);
                    commit("setDataLoading", false);
                    console.log("done fetch");

                })




        },
        setLatestFlowLayer: async ({ state, commit }) => {
            console.log("set latest flow layer called");
            console.log(state.dataLoading);
            if (!state.dataLoading) {
                console.log("passed truth loading");
                const newLayer = new FlowMapLayer({
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
                commit("setLayer", newLayer);
                console.log("latest flow layer set");
                console.log(newLayer);
            }

        }


    }
})