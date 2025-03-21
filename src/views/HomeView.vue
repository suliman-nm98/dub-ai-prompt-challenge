<!-- src/views/HomeView.vue -->
<template>
  <div class="space-y-16">
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center -mt-20">
      <div class="text-center space-y-8 z-10">
        <h1
          class="text-6xl md:text-8xl font-bold bg-gradient-to-r from-space-accent to-space-primary bg-clip-text text-transparent"
        >
          Space Voyage
        </h1>
        <p class="text-xl md:text-2xl text-space-light/80 max-w-2xl mx-auto">
          Experience the future of space travel with our luxury interplanetary
          tours
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <router-link to="/book" class="space-button">
            Book Your Journey
          </router-link>
          <router-link
            to="/destinations"
            class="space-button bg-transparent border border-space-primary hover:bg-space-primary/20"
          >
            Explore Destinations
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Destinations -->
    <section class="py-16">
      <h2 class="text-4xl font-bold text-center mb-12">Popular Destinations</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="destination in featuredDestinations"
          :key="destination.id"
          class="glass-card p-6 space-y-4 transform hover:scale-105 transition-transform duration-300"
        >
          <div class="h-48 rounded-lg overflow-hidden">
            <img
              :src="destination.imageUrl"
              :alt="destination.name"
              class="w-full h-full object-cover"
            />
          </div>
          <h3 class="text-2xl font-bold">{{ destination.name }}</h3>
          <p class="text-space-light/70">{{ destination.description }}</p>
          <div class="flex justify-between items-center">
            <span class="text-space-accent font-bold">
              From ${{ formatPrice(destination.basePrice) }}
            </span>
            <router-link
              :to="'/book?destination=' + destination.id"
              class="space-button text-sm"
            >
              Book Now
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16">
      <h2 class="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="glass-card p-6 text-center space-y-4"
        >
          <div class="text-4xl text-space-accent">
            <component :is="feature.icon" />
          </div>
          <h3 class="text-xl font-bold">{{ feature.title }}</h3>
          <p class="text-space-light/70">{{ feature.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useBookingStore } from "../stores/booking";
import { computed } from "vue";

const store = useBookingStore();

const featuredDestinations = computed(() => store.destinations.slice(0, 3));

const features = [
  {
    title: "Luxury Comfort",
    description:
      "Experience unparalleled comfort with our state-of-the-art spacecraft",
    icon: "div",
  },
  {
    title: "Safety First",
    description:
      "Advanced safety systems and experienced crew for peace of mind",
    icon: "div",
  },
  {
    title: "24/7 Support",
    description:
      "Our team is always available to assist you throughout your journey",
    icon: "div",
  },
];

function formatPrice(price: number): string {
  return (price / 1000).toFixed(0) + "k";
}
</script>
