import { createRouter, createWebHistory } from "vue-router"

const routes = [
],

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})

export default router