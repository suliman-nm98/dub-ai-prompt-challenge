import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/destinations",
      name: "Destinations",
      component: () => import("../views/DestinationsView.vue"),
    },
    {
      path: "/book",
      name: "BookTrip",
      component: () => import("../views/BookTripView.vue"),
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("../views/DashboardView.vue"),
    },
  ],
});

export default router;
