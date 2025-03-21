<!-- src/App.vue -->
<template>
  <div class="min-h-screen bg-space-dark text-space-light">
    <!-- Navigation -->
    <nav class="glass-card fixed top-0 w-full z-50 px-4 py-3">
      <div class="container mx-auto flex items-center justify-between">
        <router-link to="/" class="text-2xl font-bold text-space-accent">
          SpaceVoyage
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="hover:text-space-accent transition-colors"
          >
            {{ item.name }}
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="md:hidden text-space-light"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!isMobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden absolute top-full left-0 w-full glass-card"
      >
        <div class="px-4 py-2">
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="block py-2 hover:text-space-accent transition-colors"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto pt-20 px-4">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Background Stars -->
    <div class="stars" aria-hidden="true"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isMobileMenuOpen = ref(false);

const navigationItems = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/destinations" },
  { name: "Book Trip", path: "/book" },
  { name: "Dashboard", path: "/dashboard" },
];
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Star background animation */
.stars::after {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: 
    /* Generate a large number of stars using box-shadow */ 1px
      1px white,
    2px 2px white, 100px 100px white, 200px 200px white, 300px 300px white,
    400px 400px white, 500px 500px white, 600px 600px white, 700px 700px white,
    800px 800px white, 900px 900px white, 1000px 1000px white;
  animation: space-float 50s linear infinite;
}

@keyframes space-float {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-1000px);
  }
}
</style>
