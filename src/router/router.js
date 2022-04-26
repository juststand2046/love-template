import Vue from 'vue'
import VueRouter from "vue-router";
import Home from '../components/Home.vue'
import Index from '../components/Index'
import ScratchCard from "../components/ScratchCard";
import Gopher from "../components/Gopher";
import Swiper from '../components/Swiper';
import CatAnimation from '../components/CatAnimation';
import FindNumberNine from "../components/FindNumberNine";
import WordAnimation from "../components/WordAnimation";
import Gift from "../components/Gift";
import ChosenBefore from "../components/ChosenBefore";
import Birthday from "../components/Birthday";

Vue.use(VueRouter);

const routes=[
    {path: "/", name: "Index", component: Index},
    {path: "/home", name: "Home", component: Home},
    {path: "/scratch-card", name: "ScratchCard", component: ScratchCard},
    {path: "/gopher", name: "Gopher", component: Gopher},
    {path: "/swiper", name: "Swiper", component: Swiper},
    {path: "/cat-animation", name: "CatAnimation", component: CatAnimation},
    {path: "/find-number-nine", name: "FindNumberNine", component: FindNumberNine},
    {path: "/word-animation", name: "WordAnimation", component: WordAnimation},
    {path: "/gift", name: "Gift", component: Gift},
    {path: "/chosen-before", name: "ChosenBefore", component: ChosenBefore},
    {path: "/birthday", name: "Birthday", component: Birthday},
];

export default new VueRouter({
    routes,
    // mode:'history'
    base: process.env.BASE_URL,
    mode: "hash"
});