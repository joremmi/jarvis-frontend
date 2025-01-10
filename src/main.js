import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/main.css";
import { createPinia } from "pinia";
const pinia = createPinia();

const app = createApp(App);
app.use(store);
app.use(router);
app.use(pinia);

app.mount("#app");
