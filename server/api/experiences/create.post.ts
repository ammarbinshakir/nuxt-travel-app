export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const {
      title,
      description,
      location,
      category,
      price,
      duration,
      images,
      featured,
      active,
    } = body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !location ||
      !category ||
      !price ||
      !duration
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields",
      });
    }

    // Validate price and duration
    if (price <= 0 || duration <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Price and duration must be positive numbers",
      });
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Create new experience
    const newExperience = {
      id: `exp${Date.now()}`,
      slug,
      title,
      description,
      location,
      category,
      price: parseFloat(price),
      duration: parseFloat(duration),
      images: images || [],
      featured: featured || false,
      active: active !== false,
      rating: 0,
      reviewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // In a real app, you'd save to database
    // For demo purposes, we'll just return the created experience

    return {
      success: true,
      data: {
        experience: newExperience,
      },
    };
  } catch (error) {
    console.error("Error creating experience:", error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create experience",
    });
  }
});
