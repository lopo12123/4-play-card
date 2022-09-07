import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Root',
        component: () => import("@/App.vue"),
        redirect: { name: 'Welcome' },
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
            },
            {
                path: 'test',
                name: 'Test',
                component: () => import("@/views/Test.vue")
            }
        ]
    },
]

export const router = createRouter({
    routes,
    history: createWebHashHistory()
})