import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/HomePage.vue";
import SearchPage from "../pages/SearchPage.vue";
import HouseDetail from "../components/houses/HouseDetail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "homepage",
      component: HomePage,
    },
    {
      path: "/search",
      name: "search",
      component: SearchPage,
    },
    {
      path: "/house/:id",
      name: "house-detail",
      component: HouseDetail,
    },
  ],
});

export { router };
