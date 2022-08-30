import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Root',
        component: () => import("@/App.vue"),
        redirect: { name: 'welcome' },
        children: [
            {
                path: 'welcome',
                name: 'Welcome',
                component: () => import("@/views/Welcome.vue")
            },
            {
                path: 'room',
                name: 'Room',
                component: () => import("@/views/Room.vue")
            }
        ]
    },
]

export const router = createRouter({
    routes,
    history: createWebHashHistory()
})