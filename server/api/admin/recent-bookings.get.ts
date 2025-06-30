export default defineEventHandler(async (event) => {
  // In a real app, you'd fetch this from a database
  // For demo purposes, we'll return mock data
  return [
    {
      id: "booking1",
      experienceTitle: "Mountain Hiking Adventure",
      date: "2025-07-15",
      participants: 2,
      totalPrice: 299,
      status: "confirmed",
    },
    {
      id: "booking2",
      experienceTitle: "City Food Tour",
      date: "2025-07-10",
      participants: 4,
      totalPrice: 199,
      status: "pending",
    },
    {
      id: "booking3",
      experienceTitle: "Beach Yoga Session",
      date: "2025-07-08",
      participants: 1,
      totalPrice: 89,
      status: "completed",
    },
  ];
});
