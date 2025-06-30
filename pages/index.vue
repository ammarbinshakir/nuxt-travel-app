<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white relative">
      <!-- Login/Logout Button -->
      <div class="absolute top-4 right-4 z-10">
        <template v-if="isLoggedIn()">
          <span class="mr-2">Hello, {{ user.value?.name || 'User' }}</span>
          <button
            @click="handleLogout"
            class="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Logout
          </button>
        </template>
        <template v-else>
          <button
            @click="navigateTo('/login')"
            class="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Login
          </button>
        </template>
      </div>
      <div class="container mx-auto px-4 py-16">
        <h1 class="text-4xl md:text-6xl font-bold text-center mb-6">
          Discover Amazing Travel Experiences
        </h1>
        <p class="text-xl text-center mb-8 max-w-2xl mx-auto">
          Explore unique adventures, cultural experiences, and unforgettable moments around the world
        </p>
        
        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto">
          <div class="flex flex-col md:flex-row gap-4">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by location or keyword..."
              class="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <select
              v-model="selectedCategory"
              class="px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="">All Categories</option>
              <option value="hiking">Hiking</option>
              <option value="museums">Museums</option>
              <option value="food">Food & Dining</option>
              <option value="adventure">Adventure</option>
              <option value="culture">Culture</option>
              <option value="relaxation">Relaxation</option>
            </select>
            <button
              @click="searchExperiences"
              class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Experiences -->
    <div class="container mx-auto px-4 py-12">
      <h2 class="text-3xl font-bold text-gray-800 mb-8">Featured Experiences</h2>
      
      <!-- Loading State -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="card animate-pulse">
          <div class="h-48 bg-gray-200"></div>
          <div class="p-4">
            <div class="h-4 bg-gray-200 rounded mb-2"></div>
            <div class="h-3 bg-gray-200 rounded mb-2"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <!-- Experiences Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="experience in filteredExperiences"
          :key="experience.id"
          class="card hover:shadow-lg transition-shadow cursor-pointer"
          @click="navigateToExperience(experience.slug)"
        >
          <div class="relative">
            <img
              :src="experience.images[0] || '/placeholder.jpg'"
              :alt="experience.title"
              class="w-full h-48 object-cover"
            />
            <div class="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
              ${{ experience.price }}
            </div>
            <div v-if="experience.featured" class="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm">
              Featured
            </div>
          </div>
          
          <div class="p-4">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ experience.title }}</h3>
            <p class="text-gray-600 mb-3 line-clamp-2">{{ experience.description }}</p>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm text-gray-500">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                {{ experience.location }}
              </div>
              <div class="flex items-center text-sm text-gray-500">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                </svg>
                {{ experience.duration }}h
              </div>
            </div>
            
            <div class="flex items-center mt-3">
              <div class="flex text-yellow-400">
                <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= experience.rating ? 'fill-current' : 'fill-gray-300'" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span class="text-sm text-gray-600 ml-2">({{ experience.reviewCount }})</span>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="!pending && filteredExperiences.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">No experiences found</h3>
        <p class="text-gray-500">Try adjusting your search criteria or browse all experiences</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page metadata
definePageMeta({
  title: 'Home - Travel Experiences'
})

// Reactive data
const searchQuery = ref('')
const selectedCategory = ref('')

// Fetch experiences
const { data: experiences, pending } = await useFetch('/api/experiences')

// Import useAuth
import { useAuth } from '~/composables/useAuth'

const { user, isLoggedIn, logout, checkAuth } = useAuth()

// On mount, check auth state
onMounted(() => {
  checkAuth()
})

// Computed properties
const filteredExperiences = computed(() => {
  if (!experiences.value) return []
  
  let filtered = experiences.value
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(exp => 
      exp.title.toLowerCase().includes(query) ||
      exp.location.toLowerCase().includes(query) ||
      exp.description.toLowerCase().includes(query)
    )
  }
  
  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(exp => exp.category === selectedCategory.value)
  }
  
  return filtered
})

// Methods
const searchExperiences = () => {
  // The filtering is reactive, so no additional action needed
}

const navigateToExperience = (slug) => {
  navigateTo(`/experience/${slug}`)
}

const handleLogout = async () => {
  await logout()
  await checkAuth()
  navigateTo('/')
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>