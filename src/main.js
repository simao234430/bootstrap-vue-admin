import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import VueCompositionAPI from "@vue/composition-api";
import router from "./router";
import store from "./store";
Vue.config.productionTip = false;
// Composition API
Vue.use(VueCompositionAPI);
// Global Components
import "./global-components";

// Axios Mock Adapter
import "@/@fake-db/db";

// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
require("@core/assets/fonts/feather/iconfont.css"); // For form-wizard

// import core styles
require("@core/scss/core.scss");

// import assets styles
require("@/assets/scss/style.scss");
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
