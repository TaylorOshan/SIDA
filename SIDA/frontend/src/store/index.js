import Vue from 'vue'
import Vuex from 'vuex'
import { getDatasetTile, getEditedFlows, getFlowFromPoint, getLocations } from '../api/api'
import { getFlowLayer } from '../visualizers/flowmap'
import { getScatterplotLayer } from '../visualizers/scatterplot'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locations: [],
    flows: [],
    predictedFlows: [],
    locationLayer: [],
    flowLayer: [],
    datasetName: null,
    dataLoading: true,
    flowVisible: false,
    locationVisibile: true,
    currentX: -80.649277,
    currentY: 36.102376,
    currentZ: 4,
    popupData: null,

  },
  mutations: {



    setNewLocation: (state) => {
      state.addLocations.push()
    },
    setRemoveLocation: (state, index) => {
      state.removeLocation.push(index)
    },
    setNewFlow: (state) => {
      state.addFlows.push()
    },
    setRemoveFlow: (state, index) => {
      state.removeFlows.push(index)
      console.log(state.removeFlows)
    },
    setEditFlow: (state) => {
      state.editFlows.push()
    },
    SET_CURRENT_X: (state, x) => state.currentX = x,
    SET_CURRENT_Y: (state, y) => state.currentY = y,
    SET_CURRENT_Z: (state, z) => state.currentZ = z,
    SET_DATA_LOADING: (state, bool) => state.dataLoading = bool,
    SET_DATASET_NAME: (state, name) => state.datasetName = name,
    SET_LOCATIONS: (state, locations) => state.locations = locations,
    SET_POPUP_INFO: (state, data) => state.popupData = data,
    SET_FLOWS: (state, flows) => state.flows = flows,
    SET_PREDICTED_FLOWS: (state, flows) => state.predictedFlows = flows,
    SET_FLOW_VISIBLE: (state, bool) => state.flowVisible = bool,
    SET_LOCATION_VISIBLE: (state, bool) => state.locationVisibile = bool,
    UPDATE_FLOW_LAYER: (state, layer) => state.flowLayer = layer,
    UPDATE_LOCATION_LAYER: (state, layer) => state.locationLayer = layer,
    TOGGLE_FLOW_VISIBILITY: (state) => state.flowVisible = !state.flowVisible,
    TOGGLE_LOCATION_VISIBILITY: (state) => state.locationVisibile = !state.locationVisibile,
  },
  getters: {
    getLocations: state => state.locations,
    getRemoveFlows: state => state.removeFlows,


    getLocationLayer: state => state.locationLayer,
    getFlowLayer: state => state.flowLayer,
    getCurrentX: state => state.currentX,
    getCurrentY: state => state.currentY,
    getCurrentZ: state => state.currentZ,
    getPopupData: state => state.popupData,
    getLocationsVisibility: state => state.locationsVisible,
    getFlows: state => state.flows,
    getPredictedFlows: state => state.predictedFlows,
    getDataLoading: state => state.dataLoading,
    getFlowVisibility: state => state.flowVisible,
    getLocationVisibility: state => state.locationVisibile,
    getDatasetName: state => state.datasetName,
  },
  actions: {
    loadTileFlows: async ({ commit, state }) => {
      try {

        const flows = await getDatasetTile(state.datasetName, state.currentX, state.currentY, state.currentZ)
        console.log(flows)
        const layer = await getFlowLayer(flows.flows, state.locations)
        console.log('Layer created', layer)
        commit('UPDATE_FLOW_LAYER', layer)
      } catch (error) {
        console.log(error)
      }
    },
    loadClickFlows: async ({ commit, state }, { name }) => {
      try {
        commit('SET_DATA_LOADING', true);
        commit('SET_FLOW_VISIBLE', true);
        const flows = await getFlowFromPoint(state.datasetName, name);
        commit('SET_FLOWS', flows.flows);
        const layer = await getFlowLayer(flows.flows, state.locations, name);
        commit('UPDATE_FLOW_LAYER', layer);
        commit('SET_DATA_LOADING', false);
      } catch (error) {
        console.log(error);
      }
    },
    loadLocations: async ({ commit, state }) => {
      try {
        commit('SET_DATA_LOADING', true);
        const data = await getLocations(state.datasetName);
        commit('SET_LOCATIONS', data.locations);
        const layer = await getScatterplotLayer(data.locations);
        console.log('Location Layer created', layer);
        commit('UPDATE_LOCATION_LAYER', layer);
        commit('SET_DATA_LOADING', false);
      } catch (error) {
        console.log(error);
      }
    },
    renderFlow: async ({ commit, state }) => {

      const flows = await getFlowLayer(state.flows, state.locations);
      commit('UPDATE_FLOW_LAYER', flows);
    },
    renderLoc: async ({ commit, state }) => {

      const loc = await getScatterplotLayer(state.locations);
      console.log('Location Layer created', loc);
      commit('UPDATE_LOCATION_LAYER', loc);
    },
    predictEditedFlows: async ({ commit, state }, { sliders }) => {
      try {
        commit('SET_DATA_LOADING', true);
        commit('SET_FLOW_VISIBLE', true);
        const flows = await getEditedFlows(state.datasetName, state.popupData.name, sliders);
        console.log(flows.flows);
        console.log("abs", flows.absError);
        console.log(flows.mse);
        commit('SET_PREDICTED_FLOWS', flows.flows);
        const layer = await getFlowLayer(flows.flows, state.locations, state.popupData.name);
        commit('UPDATE_FLOW_LAYER', layer);
        commit('SET_DATA_LOADING', false);
      } catch (error) {
        console.log(error);
      }
    },
  }
})
