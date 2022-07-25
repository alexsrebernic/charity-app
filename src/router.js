import { createRouter, createWebHistory } from "vue-router";
import Home from './presentation/home/view/Home.vue'
import Documentation from './presentation/documentation/view/Documentation.vue'
import About from './presentation/about/view/About.vue'
import Contact from './presentation/contact/view/Contact.vue'
import NotFound from './presentation/notfound/view/NotFound.vue'
const routes = [
    {
        path: "/home",
        meta: { title: "Home" },
        component: Home,
    },
    {
        path: "/documentation",
        meta: { title: "Documentation" },
        component: Documentation,
    },
    {
        path: "/about",
        meta: { title: "About" },
        component: About,
    },
    {
        path: "/contact",
        meta: { title: "Contact" },
        component: Contact,
    },
    { 
        path: "/:path(.*)", 
        meta: { title: "NotFound" },
        component: NotFound 
    },

]
const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.path === "/") {
      next("/home");
      return;
    }
    next();
});
export default router