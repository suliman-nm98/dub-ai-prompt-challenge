import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface TripBooking {
  id: string;
  destination: string;
  departureDate: Date;
  returnDate: Date;
  seatClass: "economy" | "luxury" | "vip";
  price: number;
  status: "pending" | "confirmed" | "cancelled";
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  basePrice: number;
  travelTime: string;
  gravity: number;
  availableClasses: string[];
}

export const useBookingStore = defineStore("booking", () => {
  const bookings = ref<TripBooking[]>([]);
  const destinations = ref<Destination[]>([
    {
      id: "mars-1",
      name: "Mars Station Alpha",
      description: "Experience the red planet in our state-of-the-art facility",
      imageUrl: "/images/mars-station.jpg",
      basePrice: 250000,
      travelTime: "8 months",
      gravity: 0.38,
      availableClasses: ["economy", "luxury", "vip"],
    },
    {
      id: "moon-1",
      name: "Lunar Resort",
      description: "Luxury accommodations with Earth views",
      imageUrl: "/images/lunar-resort.jpg",
      basePrice: 150000,
      travelTime: "3 days",
      gravity: 0.16,
      availableClasses: ["economy", "luxury", "vip"],
    },
    {
      id: "titan-1",
      name: "Titan Research Base",
      description: "Adventure awaits on Saturn's largest moon",
      imageUrl: "/images/titan-base.jpg",
      basePrice: 500000,
      travelTime: "7 years",
      gravity: 0.14,
      availableClasses: ["luxury", "vip"],
    },
  ]);

  const activeBooking = ref<TripBooking | null>(null);

  const totalBookings = computed(() => bookings.value.length);
  const upcomingTrips = computed(() =>
    bookings.value.filter(
      (booking) =>
        new Date(booking.departureDate) > new Date() &&
        booking.status === "confirmed",
    ),
  );

  function addBooking(booking: Omit<TripBooking, "id" | "status">) {
    const newBooking: TripBooking = {
      ...booking,
      id: `booking-${Date.now()}`,
      status: "pending",
    };
    bookings.value.push(newBooking);
    return newBooking;
  }

  function updateBookingStatus(
    bookingId: string,
    status: TripBooking["status"],
  ) {
    const booking = bookings.value.find((b) => b.id === bookingId);
    if (booking) {
      booking.status = status;
    }
  }

  function getDestinationById(id: string) {
    return destinations.value.find((d) => d.id === id);
  }

  return {
    bookings,
    destinations,
    activeBooking,
    totalBookings,
    upcomingTrips,
    addBooking,
    updateBookingStatus,
    getDestinationById,
  };
});
