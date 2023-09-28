import Home from "@/views/Home.vue";
import {createRouter, createWebHistory} from "vue-router";
import Registration from "@/views/Registration.vue"
import Cards from "@/views/Cards.vue";
import Desks from "@/views/Desks.vue";
import Tasks from "@/views/Tasks.vue";
import Login from "@/views/Login.vue"

const routes = [
    {path: '/', component: Home},
    {path: '/desks', component: Desks},
    {path: '/desks/:deskId/cards', component: Cards, props: true},
    {path: '/registration/:username', component: Registration},
    {path: '/registration', component: Registration},
    {path: '/desks/:deskId/cards/:cardId/tasks', component: Tasks, props: true},
    {path: '/login', component: Login},
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router