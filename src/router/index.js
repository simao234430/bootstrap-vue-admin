import Vue from "vue";
import VueRouter from "vue-router";

// Routes

import dashboard from "./routes/dashboard";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    { path: "/", redirect: { name: "dashboard-ecommerce" } },

    ...dashboard,

    {
      path: "*",
      redirect: "error-404",
    },
  ],
});

export default router;
