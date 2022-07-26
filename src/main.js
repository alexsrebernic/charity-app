import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'
import router from "./router.js";
import MoralisFactory from './moralis.config'


const pinia = createPinia()
const app = createApp(App);

app.provide('moralis', MoralisFactory.getInstance())
app.use(router);
app.use(pinia);
app.mount("#app");
