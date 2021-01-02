import { createRouter, createWebHistory } from "vue-router";
import FlowDash from "../views/FlowDash.vue";
import FlowModel2 from "../views/FlowModel2.vue";
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
        component: FlowModel2,
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