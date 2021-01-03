import { createRouter, createWebHistory } from "vue-router";
import FlowModel from "../views/FlowModel.vue";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: { title: 'Home' }
    },
    {
        path: "/flow/:name",
        name: "Flow Model",
        component: FlowModel,
        props: true,
        meta: { title: 'Flow' }

    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
        meta: { title: '404' }
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

// const DEFAULT_TITLE = "SIDA";

// router.afterEach((to, from) => {
//     Vue.nextTick(() => {
//         document.title = (DEFAULT_TITLE + to.meta.title) || DEFAULT_TITLE;
//     });
// });

export default router;