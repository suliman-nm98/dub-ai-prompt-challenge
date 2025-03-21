<!-- src/views/DashboardView.vue -->
<template>
  <div class="max-w-6xl mx-auto py-8 px-4">
    <h1 class="text-4xl font-bold mb-8">Your Space Dashboard</h1>

    <!-- Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="glass-card p-6">
        <h3 class="text-lg font-medium text-space-light/70 mb-2">
          Total Bookings
        </h3>
        <p class="text-3xl font-bold text-space-accent">{{ totalBookings }}</p>
      </div>
      <div class="glass-card p-6">
        <h3 class="text-lg font-medium text-space-light/70 mb-2">
          Next Launch
        </h3>
        <p class="text-3xl font-bold text-space-accent">
          {{ nextLaunchCountdown }}
        </p>
      </div>
      <div class="glass-card p-6">
        <h3 class="text-lg font-medium text-space-light/70 mb-2">
          Travel Status
        </h3>
        <p class="text-3xl font-bold text-space-accent">Ready for Launch</p>
      </div>
    </div>

    <!-- Upcoming Trips -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6">Upcoming Trips</h2>
      <div class="space-y-6">
        <div
          v-for="booking in upcomingTrips"
          :key="booking.id"
          class="glass-card p-6"
        >
          <div class="flex flex-wrap gap-6 justify-between items-start">
            <div>
              <h3 class="text-xl font-bold mb-2">
                {{ getDestinationName(booking.destination) }}
              </h3>
              <div class="space-y-1 text-space-light/70">
                <p>Departure: {{ formatDate(booking.departureDate) }}</p>
                <p>Return: {{ formatDate(booking.returnDate) }}</p>
                <p class="text-space-accent">
                  {{
                    booking.seatClass.charAt(0).toUpperCase() +
                    booking.seatClass.slice(1)
                  }}
                  Class
                </p>
              </div>
            </div>
            <div class="text-right">
              <div class="text-xl font-bold text-space-accent mb-2">
                ${{ formatPrice(booking.price) }}
              </div>
              <span
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium',
                  statusClasses[booking.status],
                ]"
              >
                {{
                  booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)
                }}
              </span>
            </div>
          </div>

          <!-- Countdown Timer -->
          <div class="mt-6 pt-6 border-t border-space-light/10">
            <div class="flex items-center justify-between">
              <div class="text-sm text-space-light/70">
                Time until departure
              </div>
              <div class="text-xl font-bold">
                {{ getCountdown(booking.departureDate) }}
              </div>
            </div>
            <div class="mt-2 h-2 bg-space-dark rounded-full overflow-hidden">
              <div
                class="h-full bg-space-accent"
                :style="{
                  width: getCountdownProgress(booking.departureDate) + '%',
                }"
              ></div>
            </div>
          </div>
        </div>

        <div
          v-if="upcomingTrips.length === 0"
          class="text-center text-space-light/70 py-8"
        >
          No upcoming trips. Time to plan your next space adventure!
        </div>
      </div>
    </section>

    <!-- Travel Tips -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6">AI Travel Tips</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(tip, index) in travelTips"
          :key="index"
          class="glass-card p-6"
        >
          <div class="flex items-start gap-4">
            <div class="text-space-accent text-xl">💡</div>
            <div>
              <h3 class="text-lg font-bold mb-2">{{ tip.title }}</h3>
              <p class="text-space-light/70">{{ tip.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBookingStore } from '../stores/booking'
import { format, formatDistanceToNow, differenceInDays } from 'date-fns'

const store = useBookingStore()

const totalBookings = computed(() => store.totalBookings)
const upcomingTrips = computed(() => store.upcomingTrips)

const nextLaunchCountdown = computed(() => {
  const nextTrip = upcomingTrips.value[0]
  if (!nextTrip) return 'No trips scheduled'
  return formatDistanceToNow(new Date(nextTrip.departureDate), { addSuffix: true })
})

const statusClasses = {
  pending: 'bg-yellow-500/20 text-yellow-500',
  confirmed: 'bg-green-500/20 text-green-500',
  cancelled: 'bg-red-500/20 text-red-500'
}

const travelTips = [
  {
    title: 'Zero Gravity Adaptation',
    description: 'Start your zero gravity exercises 2 weeks before departure. This helps reduce space adaptation syndrome.'
  },
  {
    title: 'Pack Smart',
    description: 'Remember to bring magnetic accessories. They're essential for keeping your items secure in zero gravity environments.'
  },
  {
    title: 'Stay Hydrated',
    description: 'Space travel can be dehydrating. Aim to drink at least 2 liters of water daily during your journey.'
  },
  {
    title: 'Communication Schedule',
    description: 'Plan your Earth communications in advance. Signal delays can vary based on your destination.'
  }
]

function formatDate(date: Date): string {
  return format(new Date(date), 'MMM dd, yyyy')
}

function formatPrice(price: number): string {
  return (price / 1000).toFixed(0) + 'k'
}

function getDestinationName(destinationId: string): string {
  const destination = store.getDestinationById(destinationId)
  return destination?.name || 'Unknown Destination'
}

function getCountdown(date: Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

function getCountdownProgress(date: Date): number {
  const totalDays = 30 // We assume 30 days from booking to departure
  const daysLeft = differenceInDays(new Date(date), new Date())
  const progress = ((totalDays - daysLeft) / totalDays) * 100
  return Math.min(Math.max(progress, 0), 100)
}
</script>
