
import { createStore } from 'vuex';
import { getDatasetTile, getFlowFromPoint, getLocations } from "../api/api";
import { getFlowLayer } from "../visualizers/flowmap";
import { getScatterplotLayer } from "../visualizers/scatterplot";


export default createStore({
    state: {
        locations: new Array,
        dataLoading: true,
        locationLayer: [],
        flowLayer: [],
        currentX: -80.649277,
        currentY: 36.102376,
        currentZ: 4,
        dataset_name: "fake_name",
        popupData: null,
        locationsVisible: true,
    },
    mutations: {

        setLocations: (state, items) => {
            state.locations = items.slice();
            console.log("Locations Set");
            //state.locations.splice(0, state.locations.length, ...items)
        },
        setFlows: (state, items) => {
            state.flows = items.slice();
            console.log("Flows Set");

            //state.flows.splice(0, state.flows.length, ...items)

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

        setNewLocation: (state) => {
            state.addLocations.push();
        },
        setRemoveLocation: (state, index) => {
            state.removeLocation.push(index);
        },
        setNewFlow: (state) => {
            state.addFlows.push();
        },
        setRemoveFlow: (state, index) => {
            state.removeFlows.push(index);
            console.log(state.removeFlows);
        },
        setEditFlow: (state) => {
            state.editFlows.push();
        },

        SET_DATA_LOADING: (state, bool) => {
            if (state.flows || state.locations) {
                state.dataLoading = bool;
            }
            else {
                console.log("!Loading is Prohibited");
            }
        },
        UPDATE_FLOW_LAYER: (state, layer) => {
            state.flowLayer = layer;
        },
        UPDATE_LOCATION_LAYER: (state, layer) => {
            state.locationLayer = layer;
        },
        SET_DATASET_NAME: (state, name) => state.dataset_name = name,
        SET_CURRENT_X: (state, x) => state.currentX = x,
        SET_CURRENT_Y: (state, y) => state.currentY = y,
        SET_CURRENT_Z: (state, z) => state.currentZ = z,
        SET_LOCATIONS: (state, locations) => state.locations = locations,
        SET_POPUP_INFO: (state, data) => state.popupData = data,
        SET_LOCATIONS_LAYER_VIS: (state, bool) => state.locationsVisible = bool,
    },
    getters: {

        getDataLoading: state => state.dataLoading,
        getFlows: state => state.flows,
        getLocations: state => state.locations,
        getRemoveFlows: state => state.removeFlows,

        getLocationLayer: state => state.locationLayer,
        getFlowLayer: state => state.flowLayer,
        getCurrentX: state => state.currentX,
        getCurrentY: state => state.currentY,
        getCurrentZ: state => state.currentZ,
        getPopupData: state => state.popupData,
        getLocationsVisibility: state => state.locationsVisible,
    },
    actions: {
        loadTileFlows: async ({ commit, state }) => {
            try {
                const flows = await getDatasetTile(state.dataset_name, state.currentX, state.currentY, state.currentZ);
                console.log(flows);
                const layer = await getFlowLayer(flows.flows, state.locations);
                console.log("Layer created", layer);
                commit("UPDATE_FLOW_LAYER", layer);
            } catch (error) {
                console.log(error);
            }
        },
        loadClickFlows: async ({ commit, state }, { name }) => {
            try {
                const flows = await getFlowFromPoint(state.dataset_name, name);
                console.log(flows);
                const layer = await getFlowLayer(flows.flows, state.locations, name);
                console.log("Layer created", layer);
                commit("UPDATE_FLOW_LAYER", layer);
            } catch (error) {
                console.log(error);
            }
        },
        loadLocations: async ({ commit, state }) => {
            try {
                const data = await getLocations(state.dataset_name);
                commit("SET_LOCATIONS", data.locations)
                console.log(data);
                const layer = await getScatterplotLayer(data.locations);
                console.log("Location Layer created", layer);
                commit("UPDATE_LOCATION_LAYER", layer);

            } catch (error) {
                console.log(error);
            }

        }


    }
})