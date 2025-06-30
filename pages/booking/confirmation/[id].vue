<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="pending" class="max-w-2xl mx-auto">
        <div class="animate-pulse">
          <div class="h-8 bg-gray-200 rounded mb-4"></div>
          <div class="h-4 bg-gray-200 rounded mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>

      <!-- Confirmation Content -->
      <div v-else-if="booking" class="max-w-2xl mx-auto">
        <!-- Success Header -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
          <p class="text-gray-600">Your booking has been successfully confirmed. You'll receive a confirmation email shortly.</p>
        </div>

        <!-- Booking Details -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Booking Details</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <span class="text-sm text-gray-600">Booking ID</span>
              <p class="font-medium text-gray-800">{{ booking.id }}</p>
            </div>
            <div>
              <span class="text-sm text-gray-600">Status</span>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {{ booking.status }}
              </span>
            </div>
            <div>
              <span class="text-sm text-gray-600">Date</span>
              <p class="font-medium text-gray-800">{{ formatDate(booking.date) }}</p>
            </div>
            <div>
              <span class="text-sm text-gray-600">Participants</span>
              <p class="font-medium text-gray-800">{{ booking.participants }} {{ booking.participants === 1 ? 'person' : 'people' }}</p>
            </div>
            <div>
              <span class="text-sm text-gray-600">Total Amount</span>
              <p class="font-medium text-gray-800">${{ booking.totalPrice }}</p>
            </div>
            <div>
              <span class="text-sm text-gray-600">Booked On</span>
              <p class="font-medium text-gray-800">{{ formatDate(booking.createdAt) }}</p>
            </div>
          </div>
        </div>

        <!-- Experience Details -->
        <div v-if="experience" class="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Experience Details</h2>
          
          <div class="flex items-start space-x-4">
            <img
              :src="experience.images[0] || '/placeholder.jpg'"
              :alt="experience.title"
              class="w-24 h-24 object-cover rounded-lg"
            />
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ experience.title }}</h3>
              <p class="text-gray-600 mb-2">{{ experience.location }}</p>
              <div class="flex items-center text-sm text-gray-500">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                </svg>
                {{ experience.duration }} hours
              </div>
            </div>
          </div>
        </div>

        <!-- Next Steps -->
        <div class="bg-blue-50 rounded-lg p-6 mb-6">
          <h3 class="text-lg font-semibold text-blue-800 mb-3">What's Next?</h3>
          <ul class="space-y-2 text-blue-700">
            <li class="flex items-start">
              <svg class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              You'll receive a confirmation email with all the details
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Meet your guide at the specified location on the day of your experience
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Don't forget to bring comfortable clothing and any required equipment
            </li>
          </ul>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4">
          <NuxtLink to="/" class="btn-primary text-center">
            Browse More Experiences
          </NuxtLink>
          <button
            @click="downloadConfirmation"
            class="btn-secondary"
          >
            Download Confirmation
          </button>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="max-w-2xl mx-auto text-center">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
        </svg>
        <h2 class="text-2xl font-semibold text-gray-600 mb-2">Booking not found</h2>
        <p class="text-gray-500 mb-4">The booking you're looking for doesn't exist or has been removed.</p>
        <NuxtLink to="/" class="btn-primary">
          Browse Experiences
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// Get route params
const route = useRoute()
const bookingId = route.params.id

// Page metadata
definePageMeta({
  title: 'Booking Confirmation'
})

// Fetch booking data
const { data: booking, pending } = await useFetch(`/api/bookings/${bookingId}`)

// Fetch experience data if booking exists
const { data: experience } = await useFetch(() => 
  booking.value ? `/api/experiences/${booking.value.experienceId}` : null
)

// Methods
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const downloadConfirmation = () => {
  // This would typically generate and download a PDF
  // For now, we'll just show an alert
  alert('Confirmation download feature coming soon!')
}

// Update page title when booking loads
watch(booking, (newBooking) => {
  if (newBooking) {
    useHead({
      title: `Booking Confirmation - ${newBooking.id}`
    })
  }
})
</script> 