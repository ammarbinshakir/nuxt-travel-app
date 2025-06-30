export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");

    // Mock booking data
    const booking = {
      id: id,
      userId: "user123",
      experienceId: "exp1",
      date: new Date("2024-07-15"),
      participants: 2,
      totalPrice: 179.98,
      status: "confirmed",
      createdAt: new Date("2024-06-29"),
    };

    return booking;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch booking",
    });
  }
});
