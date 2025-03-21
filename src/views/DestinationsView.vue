<!-- src/views/DestinationsView.vue -->
<template>
  <div class="max-w-7xl mx-auto py-8 px-4">
    <h1 class="text-4xl font-bold text-center mb-12">Space Destinations</h1>

    <!-- Destination Cards -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div
        v-for="destination in destinations"
        :key="destination.id"
        class="glass-card overflow-hidden group"
      >
        <!-- Image Section -->
        <div class="relative h-64">
          <img
            :src="destination.imageUrl"
            :alt="destination.name"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-space-dark/80 to-transparent"
          ></div>
          <div class="absolute bottom-4 left-4 right-4">
            <h2 class="text-3xl font-bold mb-2">{{ destination.name }}</h2>
            <div class="flex items-center gap-4 text-space-light/80">
              <span class="flex items-center">
                <span class="mr-2">⏱️</span>
                {{ destination.travelTime }}
              </span>
              <span class="flex items-center">
                <span class="mr-2">🌍</span>
                {{ destination.gravity }}g
              </span>
            </div>
          </div>
        </div>

        <!-- Content Section -->
        <div class="p-6 space-y-6">
          <p class="text-space-light/80">{{ destination.description }}</p>

          <!-- Features Grid -->
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="(feature, index) in getDestinationFeatures(destination)"
              :key="index"
              class="flex items-center gap-2 text-sm text-space-light/70"
            >
              <span class="text-space-accent">✓</span>
              {{ feature }}
            </div>
          </div>

          <!-- Available Classes -->
          <div>
            <h3 class="text-lg font-bold mb-3">Available Classes</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="className in destination.availableClasses"
                :key="className"
                class="px-3 py-1 rounded-full text-sm font-medium bg-space-primary/20 text-space-accent"
              >
                {{ className.charAt(0).toUpperCase() + className.slice(1) }}
              </span>
            </div>
          </div>

          <!-- Price and Booking -->
          <div
            class="flex items-center justify-between pt-4 border-t border-space-light/10"
          >
            <div>
              <div class="text-sm text-space-light/70">Starting from</div>
              <div class="text-2xl font-bold text-space-accent">
                ${{ formatPrice(destination.basePrice) }}
              </div>
            </div>
            <router-link
              :to="'/book?destination=' + destination.id"
              class="space-button"
            >
              Book Now
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Additional Information -->
    <section class="mt-16">
      <h2 class="text-3xl font-bold text-center mb-8">Travel Information</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(info, index) in travelInfo"
          :key="index"
          class="glass-card p-6"
        >
          <h3 class="text-xl font-bold mb-4">{{ info.title }}</h3>
          <p class="text-space-light/70">{{ info.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useBookingStore } from "../stores/booking";

const store = useBookingStore();
const destinations = computed(() => store.destinations);

const travelInfo = [
  {
    title: "Health Requirements",
    description:
      "All travelers must pass a comprehensive space fitness assessment and complete our zero-gravity training program.",
  },
  {
    title: "Travel Documents",
    description:
      "Interplanetary travel permits and space insurance are required. We assist with all documentation.",
  },
  {
    title: "Baggage Policy",
    description:
      "Limited to 20kg of personal items. All equipment and space suits are provided by SpaceVoyage.",
  },
];

function formatPrice(price: number): string {
  return (price / 1000).toFixed(0) + "k";
}

function getDestinationFeatures(destination: any): string[] {
  return [
    `${destination.gravity}g Gravity Environment`,
    `${destination.travelTime} Journey`,
    "Advanced Life Support",
    "Medical Facilities",
    "Research Opportunities",
    "Observation Decks",
  ];
}
</script>
