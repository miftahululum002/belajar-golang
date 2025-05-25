//import createApp from Vue
import { createApp } from "vue";

//import component App
import App from "./App.vue";

//import VueQueryPlugin
import { VueQueryPlugin } from "@tanstack/vue-query";
//import config router
import routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

//create App Vue
const app = createApp(App);

//use VueQueryPlugin
app.use(VueQueryPlugin);
app.use(routes);
app.mount("#app");
