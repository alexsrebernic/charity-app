import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'
import router from "./router.js";
import watchNewDoneeEvents from './utils/watchNewDoneeEvents';

watchNewDoneeEvents()
const pinia = createPinia()
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount("#app");
