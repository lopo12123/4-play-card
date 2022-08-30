import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Root',
        redirect: 'Welcome'
    },
    {
        path: '/welcome',
        name: 'Welcome',
        component: () => import("@/views/Welcome.vue")
    }
]

export const router = createRouter({
    routes,
    history: createWebHashHistory()
})