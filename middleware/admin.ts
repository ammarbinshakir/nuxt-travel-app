export default defineNuxtRouteMiddleware(async (to) => {
  // Only run on client side where localStorage is available
  if (process.server) {
    return;
  }

  const { isLoggedIn, isAdmin, checkAuth } = useAuth();

  // Check authentication status and wait for it to complete
  await checkAuth();

  if (!isLoggedIn()) {
    return navigateTo("/login");
  }

  if (!isAdmin()) {
    return navigateTo("/");
  }
});
