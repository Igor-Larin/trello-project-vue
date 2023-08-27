import Home from "@/views/Home.vue";
import {createRouter, createWebHistory} from "vue-router";
import Registration from "@/views/Registration.vue"
import Cards from "@/views/Cards.vue";
import Desks from "@/views/Desks.vue";
import Tasks from "@/views/Tasks.vue";

const routes = [
    {path: '/', component: Home},
    {path: '/users/1/desks', component: Desks},
    {path: '/users/1/desks/:deskId/cards', component: Cards, props: true},
    {path: '/registration', component: Registration},
    {path: '/users/1/desks/:deskId/cards/:cardId/tasks', component: Tasks, props: true}
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router