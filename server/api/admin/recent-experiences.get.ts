export default defineEventHandler(async (event) => {
  // In a real app, you'd fetch this from a database
  // For demo purposes, we'll return mock data
  return [
    {
      id: "exp1",
      title: "Mountain Hiking Adventure",
      location: "Rocky Mountains, CO",
      price: 149,
      category: "Adventure",
    },
    {
      id: "exp2",
      title: "City Food Tour",
      location: "Downtown, NY",
      price: 99,
      category: "Food & Culture",
    },
    {
      id: "exp3",
      title: "Beach Yoga Session",
      location: "Malibu Beach, CA",
      price: 89,
      category: "Wellness",
    },
  ];
});
