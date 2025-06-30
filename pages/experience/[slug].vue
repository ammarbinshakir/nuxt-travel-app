<script setup>
// Get route params
const route = useRoute()
const slug = route.params.slug

// Page metadata
definePageMeta({
  title: 'Experience Details'
})

// Auth composable
const { isLoggedIn } = useAuth()

// Reactive data
const currentImageIndex = ref(0)
const bookingForm = ref({
  date: '',
  participants: ''
})

// Fetch experience data
const { data: experience, pending, error } = await useFetch(`/api/experiences/${slug}`)

// Fetch reviews
const { data: reviews } = await useFetch(`/api/experiences/${slug}/reviews`)

// Computed properties
const currentImage = computed(() => {
  if (!experience.value?.images?.length) return '/placeholder.jpg'
  return experience.value.images[currentImageIndex.value] || experience.value.images[0]
})

const totalPrice = computed(() => {
  if (!experience.value || !bookingForm.value.participants) return 0
  return experience.value.price * parseInt(bookingForm.value.participants)
})

const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

// Methods
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleBooking = async () => {
  if (!isLoggedIn()) {
    return navigateTo('/login')
  }

  try {
    const response = await $fetch('/api/bookings', {
      method: 'POST',
      body: {
        experienceId: experience.value?.id,
        date: bookingForm.value.date,
        participants: parseInt(bookingForm.value.participants),
        totalPrice: totalPrice.value
      }
    })

    if (response.success) {
      navigateTo(`/booking/confirmation/${response.bookingId}`)
    }
  } catch (error) {
    console.error('Booking error:', error)
    // Handle error (show notification, etc.)
  }
}

// Update page title when experience loads
watch(experience, (newExperience) => {
  if (newExperience) {
    useHead({
      title: `${newExperience.title} - Travel Experiences`
    })
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="pending" class="container mx-auto px-4 py-8">
      <div class="animate-pulse">
        <div class="h-96 bg-gray-200 rounded-lg mb-6"></div>
        <div class="h-8 bg-gray-200 rounded mb-4"></div>
        <div class="h-4 bg-gray-200 rounded mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>

    <!-- Experience Content -->
    <div v-else-if="experience" class="container mx-auto px-4 py-8">
      <!-- Breadcrumb -->
      <nav class="mb-6">
        <ol class="flex items-center space-x-2 text-sm text-gray-600">
          <li><NuxtLink to="/" class="hover:text-blue-600">Home</NuxtLink></li>
          <li>/</li>
          <li><NuxtLink to="/" class="hover:text-blue-600">Experiences</NuxtLink></li>
          <li>/</li>
          <li class="text-gray-800">{{ experience.title }}</li>
        </ol>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Image Gallery -->
          <div class="mb-6">
            <div class="relative h-96 rounded-lg overflow-hidden">
              <img
                :src="currentImage"
                :alt="experience.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                {{ currentImageIndex + 1 }} / {{ experience.images.length }}
              </div>
            </div>
            
            <!-- Thumbnail Navigation -->
            <div v-if="experience.images.length > 1" class="flex space-x-2 mt-4">
              <button
                v-for="(image, index) in experience.images"
                :key="index"
                @click="currentImageIndex = index"
                class="w-20 h-20 rounded-lg overflow-hidden border-2"
                :class="currentImageIndex === index ? 'border-blue-600' : 'border-gray-200'"
              >
                <img :src="image" :alt="`${experience.title} - Image ${index + 1}`" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- Experience Details -->
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ experience.title }}</h1>
                <div class="flex items-center text-gray-600 mb-4">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                  {{ experience.location }}
                </div>
              </div>
              <div class="text-right">
                <div class="text-3xl font-bold text-blue-600">${{ experience.price }}</div>
                <div class="text-gray-600">per person</div>
              </div>
            </div>

            <!-- Rating and Reviews -->
            <div class="flex items-center mb-6">
              <div class="flex text-yellow-400 mr-3">
                <svg v-for="i in 5" :key="i" class="w-5 h-5" :class="i <= experience.rating ? 'fill-current' : 'fill-gray-300'" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span class="text-gray-600">{{ experience.rating }} ({{ experience.reviewCount }} reviews)</span>
            </div>

            <!-- Key Information -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600">{{ experience.duration }}h</div>
                <div class="text-sm text-gray-600">Duration</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600">{{ experience.category }}</div>
                <div class="text-sm text-gray-600">Category</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600">Max 10</div>
                <div class="text-sm text-gray-600">Group Size</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600">English</div>
                <div class="text-sm text-gray-600">Language</div>
              </div>
            </div>

            <!-- Description -->
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-3">About this experience</h3>
              <p class="text-gray-600 leading-relaxed">{{ experience.description }}</p>
            </div>
          </div>

          <!-- Reviews Section -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Reviews</h3>
            <div v-if="reviews.length > 0">
              <div v-for="review in reviews" :key="review.id" class="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                      {{ review.userName?.charAt(0) || 'U' }}
                    </div>
                    <div class="ml-3">
                      <div class="font-semibold text-gray-800">{{ review.userName || 'Anonymous' }}</div>
                      <div class="text-sm text-gray-500">{{ formatDate(review.createdAt) }}</div>
                    </div>
                  </div>
                  <div class="flex text-yellow-400">
                    <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= review.rating ? 'fill-current' : 'fill-gray-300'" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <p class="text-gray-600">{{ review.comment }}</p>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p>No reviews yet. Be the first to review this experience!</p>
            </div>
          </div>
        </div>

        <!-- Booking Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Book this experience</h3>
            
            <form @submit.prevent="handleBooking" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  v-model="bookingForm.date"
                  type="date"
                  :min="today"
                  required
                  class="input-field"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Number of participants</label>
                <select v-model="bookingForm.participants" required class="input-field">
                  <option value="">Select</option>
                  <option v-for="i in 10" :key="i" :value="i">{{ i }} {{ i === 1 ? 'person' : 'people' }}</option>
                </select>
              </div>
              
              <div class="border-t pt-4">
                <div class="flex justify-between mb-2">
                  <span>Price per person:</span>
                  <span>${{ experience.price }}</span>
                </div>
                <div class="flex justify-between mb-2">
                  <span>Participants:</span>
                  <span>{{ bookingForm.participants || 0 }}</span>
                </div>
                <div class="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${{ totalPrice }}</span>
                </div>
              </div>
              
              <button
                type="submit"
                :disabled="!isLoggedIn() || bookingForm.participants === '' || bookingForm.date === ''"
                class="w-full btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {{ isLoggedIn() ? 'Book Now' : 'Login to Book' }}
              </button>
            </form>
            
            <div v-if="!isLoggedIn()" class="mt-4 text-center">
              <p class="text-sm text-gray-600 mb-2">Already have an account?</p>
              <NuxtLink to="/login" class="text-blue-600 hover:text-blue-700 font-medium">
                Sign in to book
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="container mx-auto px-4 py-8">
      <div class="text-center">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
        </svg>
        <h2 class="text-2xl font-semibold text-gray-600 mb-2">Experience not found</h2>
        <p class="text-gray-500 mb-4">The experience you're looking for doesn't exist or has been removed.</p>
        <NuxtLink to="/" class="btn-primary">
          Browse Experiences
        </NuxtLink>
      </div>
    </div>
  </div>
</template>