export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { experienceId, date, participants, totalPrice } = body;

    // Validate required fields
    if (!experienceId || !date || !participants || !totalPrice) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields",
      });
    }

    // Validate participants and total price
    if (participants <= 0 || totalPrice <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Participants and total price must be positive numbers",
      });
    }

    // Validate date (must be in the future)
    const bookingDate = new Date(date);
    if (bookingDate <= new Date()) {
      throw createError({
        statusCode: 400,
        statusMessage: "Booking date must be in the future",
      });
    }

    // Create new booking
    const newBooking = {
      id: `booking${Date.now()}`,
      userId: "user123", // In a real app, get from authenticated user
      experienceId,
      date: bookingDate,
      participants: parseInt(participants),
      totalPrice: parseFloat(totalPrice),
      status: "pending",
      createdAt: new Date(),
    };

    // In a real app, you'd save to database
    // For demo purposes, we'll just return the created booking

    return {
      success: true,
      data: {
        booking: newBooking,
      },
      bookingId: newBooking.id,
    };
  } catch (error) {
    console.error("Error creating booking:", error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create booking",
    });
  }
});
