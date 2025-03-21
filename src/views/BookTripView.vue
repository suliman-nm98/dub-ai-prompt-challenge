<!-- src/views/BookTripView.vue -->
<template>
  <div class="max-w-4xl mx-auto py-8">
    <h1 class="text-4xl font-bold text-center mb-8">Book Your Space Journey</h1>

    <!-- Progress Steps -->
    <div class="flex justify-between mb-8 relative">
      <div
        class="absolute top-1/2 h-1 transform -translate-y-1/2 bg-space-primary/30"
        :style="{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }"
      ></div>
      <div
        v-for="step in totalSteps"
        :key="step"
        :class="[
          'relative z-10 flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors',
          step <= currentStep
            ? 'bg-space-primary text-white'
            : 'bg-space-dark text-space-light border border-space-primary',
        ]"
      >
        {{ step }}
      </div>
    </div>

    <!-- Booking Form -->
    <div class="glass-card p-8">
      <!-- Step 1: Destination Selection -->
      <div v-if="currentStep === 1" class="space-y-6">
        <h2 class="text-2xl font-bold mb-4">Choose Your Destination</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="destination in destinations"
            :key="destination.id"
            :class="[
              'glass-card p-4 cursor-pointer transition-all',
              selectedDestination?.id === destination.id
                ? 'neon-border scale-105'
                : 'hover:scale-105',
            ]"
            @click="selectDestination(destination)"
          >
            <div class="h-40 rounded-lg overflow-hidden mb-4">
              <img
                :src="destination.imageUrl"
                :alt="destination.name"
                class="w-full h-full object-cover"
              />
            </div>
            <h3 class="text-xl font-bold">{{ destination.name }}</h3>
            <p class="text-space-light/70 text-sm mb-2">
              {{ destination.description }}
            </p>
            <div class="flex justify-between items-center">
              <span class="text-space-accent">
                From ${{ formatPrice(destination.basePrice) }}
              </span>
              <span class="text-sm text-space-light/70">
                Travel time: {{ destination.travelTime }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 2: Date Selection -->
      <div v-if="currentStep === 2" class="space-y-6">
        <h2 class="text-2xl font-bold mb-4">Select Travel Dates</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-medium">Departure Date</label>
            <input
              type="date"
              v-model="departureDate"
              class="w-full bg-space-dark/50 border border-space-primary/30 rounded-lg p-2 focus:outline-none focus:border-space-primary"
              :min="minDepartureDate"
            />
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium">Return Date</label>
            <input
              type="date"
              v-model="returnDate"
              class="w-full bg-space-dark/50 border border-space-primary/30 rounded-lg p-2 focus:outline-none focus:border-space-primary"
              :min="departureDate"
            />
          </div>
        </div>
      </div>

      <!-- Step 3: Cabin Selection -->
      <div v-if="currentStep === 3" class="space-y-6">
        <h2 class="text-2xl font-bold mb-4">Choose Your Cabin Class</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="cabin in availableCabins"
            :key="cabin.type"
            :class="[
              'glass-card p-6 cursor-pointer transition-all',
              selectedCabin === cabin.type
                ? 'neon-border scale-105'
                : 'hover:scale-105',
            ]"
            @click="selectedCabin = cabin.type"
          >
            <h3 class="text-xl font-bold mb-2">{{ cabin.name }}</h3>
            <p class="text-space-light/70 text-sm mb-4">
              {{ cabin.description }}
            </p>
            <ul class="space-y-2 mb-4">
              <li
                v-for="feature in cabin.features"
                :key="feature"
                class="text-sm flex items-center"
              >
                <span class="text-space-accent mr-2">✓</span>
                {{ feature }}
              </li>
            </ul>
            <div class="text-xl font-bold text-space-accent">
              ${{ formatPrice(calculateCabinPrice(cabin.type)) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex justify-between mt-8">
        <button
          v-if="currentStep > 1"
          @click="currentStep--"
          class="space-button bg-transparent border border-space-primary hover:bg-space-primary/20"
        >
          Previous
        </button>
        <button
          v-if="currentStep < totalSteps"
          @click="nextStep"
          class="space-button ml-auto"
          :disabled="!canProceed"
        >
          Next
        </button>
        <button
          v-else
          @click="confirmBooking"
          class="space-button ml-auto"
          :disabled="!canProceed"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useBookingStore } from "../stores/booking";

const router = useRouter();
const route = useRoute();
const store = useBookingStore();

// Form state
const currentStep = ref(1);
const totalSteps = 3;
const selectedDestination = ref<any>(null);
const departureDate = ref("");
const returnDate = ref("");
const selectedCabin = ref<string>("");

// Initialize destination from query params if available
if (route.query.destination) {
  selectedDestination.value = store.getDestinationById(
    route.query.destination as string,
  );
  if (selectedDestination.value) {
    currentStep.value = 2;
  }
}

const destinations = computed(() => store.destinations);

const minDepartureDate = computed(() => {
  const date = new Date();
  date.setDate(date.getDate() + 30); // Minimum 30 days advance booking
  return date.toISOString().split("T")[0];
});

const availableCabins = [
  {
    type: "economy",
    name: "Economy Shuttle",
    description: "Comfortable and practical space travel",
    price: 1,
    features: [
      "Standard gravity simulation",
      "Shared viewing deck",
      "Basic meal service",
    ],
  },
  {
    type: "luxury",
    name: "Luxury Cabin",
    description: "Premium comfort with enhanced amenities",
    price: 2,
    features: [
      "Enhanced gravity control",
      "Private viewing window",
      "Gourmet dining options",
      "Access to leisure deck",
    ],
  },
  {
    type: "vip",
    name: "VIP Zero-Gravity",
    description: "Ultimate luxury space experience",
    price: 3,
    features: [
      "Customizable gravity settings",
      "Panoramic observation suite",
      "Personal butler service",
      "Private dining room",
      "Exclusive lounge access",
    ],
  },
];

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1:
      return !!selectedDestination.value;
    case 2:
      return !!departureDate.value && !!returnDate.value;
    case 3:
      return !!selectedCabin.value;
    default:
      return false;
  }
});

function selectDestination(destination: any) {
  selectedDestination.value = destination;
}

function calculateCabinPrice(cabinType: string) {
  if (!selectedDestination.value) return 0;
  const cabin = availableCabins.find((c) => c.type === cabinType);
  return selectedDestination.value.basePrice * (cabin?.price || 1);
}

function formatPrice(price: number): string {
  return (price / 1000).toFixed(0) + "k";
}

function nextStep() {
  if (canProceed.value && currentStep.value < totalSteps) {
    currentStep.value++;
  }
}

async function confirmBooking() {
  if (!canProceed.value) return;

  const booking = {
    destination: selectedDestination.value.id,
    departureDate: new Date(departureDate.value),
    returnDate: new Date(returnDate.value),
    seatClass: selectedCabin.value,
    price: calculateCabinPrice(selectedCabin.value),
  };

  const newBooking = store.addBooking(booking);
  router.push("/dashboard");
}
</script>
