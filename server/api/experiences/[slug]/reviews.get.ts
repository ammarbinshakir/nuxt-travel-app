export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, "slug");

    // Mock reviews data
    const reviews = [
      {
        id: "rev1",
        userId: "user1",
        experienceId: "exp1",
        userName: "John Doe",
        rating: 5,
        comment:
          "Amazing experience! The guides were knowledgeable and the views were breathtaking.",
        createdAt: new Date("2024-01-20"),
      },
      {
        id: "rev2",
        userId: "user2",
        experienceId: "exp1",
        userName: "Jane Smith",
        rating: 4,
        comment:
          "Great hiking adventure. The trail was well-maintained and the group size was perfect.",
        createdAt: new Date("2024-01-18"),
      },
    ];

    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch reviews",
    });
  }
});
