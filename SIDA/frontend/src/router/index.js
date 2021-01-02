import { createRouter, createWebHistory } from "vue-router";
import FlowDash from "../views/FlowDash.vue";
import FlowModel from "../views/FlowModel.vue";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/flow",
        name: "Flow Dash",
        component: FlowDash,
    },
    {
        path: "/flow/:name",
        name: "Flow Model",
        component: FlowModel,
        props: true

    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash,
                behavior: 'smooth',
            }
        }
        else {

            return { x: 0, y: 0 }

        }

    }

});

export default router;