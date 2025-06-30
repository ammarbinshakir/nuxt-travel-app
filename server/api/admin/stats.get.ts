export default defineEventHandler(async (event) => {
  // In a real app, you'd fetch this from a database
  // For demo purposes, we'll return mock data
  return {
    totalExperiences: 12,
    totalBookings: 45,
    totalRevenue: 12500,
    totalUsers: 23,
  };
});
