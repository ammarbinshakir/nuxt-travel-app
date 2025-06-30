import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Name, email, and password are required",
      });
    }

    // Check if user already exists (in a real app, you'd check a database)
    // For demo purposes, we'll simulate a user check
    const existingUser = null; // await getUserByEmail(email)

    if (existingUser) {
      throw createError({
        statusCode: 409,
        statusMessage: "User with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (in a real app, you'd save to database)
    const user = {
      id: generateId(),
      name,
      email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
    };

    // Generate JWT token
    const config = useRuntimeConfig();
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: "7d" }
    );

    // Set cookie
    setCookie(event, "auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      data: {
        user: userWithoutPassword,
      },
    };
  } catch (error) {
    console.error("Registration error:", error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
