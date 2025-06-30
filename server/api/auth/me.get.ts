import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, "auth-token");

    console.log("Auth check - Token found:", !!token);
    console.log(
      "Auth check - Token value:",
      token ? token.substring(0, 20) + "..." : "none"
    );

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Not authenticated",
      });
    }

    // Verify JWT token
    const config = useRuntimeConfig();
    const decoded = jwt.verify(token, config.jwtSecret);

    console.log("Auth check - Decoded token:", decoded);

    // Return the user data from the JWT token
    const user = {
      id: decoded.userId,
      name: decoded.name || "User",
      email: decoded.email,
      role: decoded.role,
      createdAt: new Date(),
    };

    console.log("Auth check - Returning user:", user);

    return {
      success: true,
      data: {
        user,
      },
    };
  } catch (error) {
    console.error("Auth check error:", error);

    if (error.name === "JsonWebTokenError") {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid token",
      });
    }

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
