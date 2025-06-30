<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">User Dashboard</h1>
          <p class="text-gray-600">Welcome to your travel dashboard</p>
        </div>

        <!-- User Info -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Account Information</h2>
          <div v-if="user" class="space-y-2">
            <p><strong>Name:</strong> {{ user.name }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Role:</strong> {{ user.role }}</p>
          </div>
          <div v-else class="text-gray-500">
            <p>Not logged in</p>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NuxtLink to="/" class="btn-primary text-center">
              Browse Experiences
            </NuxtLink>
            <button @click="handleLogout" class="btn-secondary">
              Logout
            </button>
          </div>
        </div>

        <!-- Admin Link (if admin) -->
        <div v-if="isAdmin()" class="bg-blue-50 rounded-lg p-6">
          <h2 class="text-xl font-semibold text-blue-800 mb-4">Admin Access</h2>
          <p class="text-blue-700 mb-4">You have admin privileges. Access the admin panel to manage experiences and bookings.</p>
          <NuxtLink to="/admin" class="btn-primary">
            Go to Admin Panel
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page metadata
definePageMeta({
  title: 'Dashboard - Travel Experiences',
  middleware: 'auth'
})

// Auth composable
const { user, isAdmin, logout } = useAuth()

// Router
const router = useRouter()

// Methods
const handleLogout = async () => {
  const result = await logout()
  if (result.success) {
    router.push('/')
  }
}
</script>