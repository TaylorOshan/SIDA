import { createStore } from 'vuex';

export default createStore({
    state: {
        locations: [],
        flows: [],

    },
    mutations: {
        setLocations: (state, items) => state.locations.splice(0, state.locations.length, ...items),
        setFlows: (state, items) => {
            state.flows.splice(0, state.flows.length, ...items)
            console.log("flows being set");
            console.log(state.flows);
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

        }
    },
    getters: {
        getFlows: state => {
            console.log("get flow called");
            return state.flows;
        },
        getLocations: state => {
            return state.locations;
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

                })




        }


    }
})