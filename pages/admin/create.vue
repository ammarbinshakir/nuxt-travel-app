<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Create New Experience</h1>
            <p class="text-gray-600">Add a new travel experience to your platform</p>
          </div>
          <NuxtLink to="/admin" class="btn-secondary">
            Back to Dashboard
          </NuxtLink>
        </div>
      </div>

      <!-- Form -->
      <div class="max-w-4xl mx-auto">
        <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-md p-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Basic Information -->
            <div class="lg:col-span-2">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
            </div>

            <div class="lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Experience Title *
              </label>
              <input
                v-model="form.title"
                type="text"
                required
                class="input-field"
                placeholder="Enter experience title"
              />
            </div>

            <div class="lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                v-model="form.description"
                required
                rows="4"
                class="input-field"
                placeholder="Describe the experience in detail"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                v-model="form.location"
                type="text"
                required
                class="input-field"
                placeholder="City, Country"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select v-model="form.category" required class="input-field">
                <option value="">Select category</option>
                <option value="hiking">Hiking</option>
                <option value="museums">Museums</option>
                <option value="food">Food & Dining</option>
                <option value="adventure">Adventure</option>
                <option value="culture">Culture</option>
                <option value="relaxation">Relaxation</option>
                <option value="water-sports">Water Sports</option>
                <option value="city-tours">City Tours</option>
              </select>
            </div>

            <!-- Pricing and Duration -->
            <div class="lg:col-span-2">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">Pricing & Duration</h2>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Price per Person ($) *
              </label>
              <input
                v-model="form.price"
                type="number"
                min="0"
                step="0.01"
                required
                class="input-field"
                placeholder="0.00"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Duration (hours) *
              </label>
              <input
                v-model="form.duration"
                type="number"
                min="0.5"
                step="0.5"
                required
                class="input-field"
                placeholder="2.5"
              />
            </div>

            <!-- Images -->
            <div class="lg:col-span-2">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">Images</h2>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Image URLs (one per line)
              </label>
              <textarea
                v-model="imageUrls"
                rows="4"
                class="input-field"
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
              ></textarea>
              <p class="text-sm text-gray-500 mt-1">
                Enter image URLs, one per line. At least one image is recommended.
              </p>
            </div>

            <!-- Settings -->
            <div class="lg:col-span-2">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">Settings</h2>
            </div>

            <div class="lg:col-span-2">
              <div class="flex items-center">
                <input
                  v-model="form.featured"
                  type="checkbox"
                  id="featured"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="featured" class="ml-2 block text-sm text-gray-700">
                  Feature this experience on the homepage
                </label>
              </div>
            </div>

            <div class="lg:col-span-2">
              <div class="flex items-center">
                <input
                  v-model="form.active"
                  type="checkbox"
                  id="active"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="active" class="ml-2 block text-sm text-gray-700">
                  Make this experience available for booking
                </label>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="mt-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div class="flex">
              <svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <div class="ml-3">
                <p class="text-sm text-red-800">{{ error }}</p>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="mt-8 flex justify-end space-x-4">
            <NuxtLink to="/admin" class="btn-secondary">
              Cancel
            </NuxtLink>
            <button
              type="submit"
              :disabled="loading"
              class="btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <svg
                v-if="loading"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ loading ? 'Creating...' : 'Create Experience' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page metadata
definePageMeta({
  title: 'Create Experience - Admin',
  middleware: 'admin'
})

// Reactive data
const loading = ref(false)
const error = ref('')
const imageUrls = ref('')

const form = ref({
  title: '',
  description: '',
  location: '',
  category: '',
  price: '',
  duration: '',
  featured: false,
  active: true
})

// Computed properties
const images = computed(() => {
  return imageUrls.value
    .split('\n')
    .map(url => url.trim())
    .filter(url => url.length > 0)
})

// Methods
const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    const experienceData = {
      ...form.value,
      price: parseFloat(form.value.price),
      duration: parseFloat(form.value.duration),
      images: images.value,
      rating: 0,
      reviewCount: 0
    }

    const response = await $fetch('/api/experiences', {
      method: 'POST',
      body: experienceData
    })

    if (response.success) {
      // Redirect to the new experience or admin dashboard
      navigateTo('/admin')
    } else {
      error.value = response.error || 'Failed to create experience'
    }
  } catch (err) {
    error.value = err.message || 'An error occurred while creating the experience'
  } finally {
    loading.value = false
  }
}
</script>