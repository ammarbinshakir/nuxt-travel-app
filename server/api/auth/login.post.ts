import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email and password are required",
      });
    }

    // In a real app, you'd fetch user from database
    // For demo purposes, we'll use mock users
    const users = [
      {
        id: "user123",
        name: "Demo User",
        email: "demo@example.com",
        password:
          "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // 'password'
        role: "user",
        createdAt: new Date(),
      },
      {
        id: "admin123",
        name: "Admin User",
        email: "admin@example.com",
        password:
          "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // 'password'
        role: "admin",
        createdAt: new Date(),
      },
    ];

    // Find user by email
    const user = users.find((u) => u.email === email);

    // Check if user exists
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid email or password",
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid email or password",
      });
    }

    // Generate JWT token
    const config = useRuntimeConfig();
    const token = jwt.sign(
      { userId: user.id, name: user.name, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: "7d" }
    );

    // Set cookie
    setCookie(event, "auth-token", token, {
      httpOnly: false, // Set to false for debugging
      secure: false, // Set to false for development
      sameSite: "lax", // Back to lax
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/", // Ensure cookie is available on all paths
      domain: "localhost", // Explicitly set domain
    });

    console.log(
      "Login - Cookie set for token:",
      token.substring(0, 20) + "..."
    );
    console.log("Login - User role:", user.role);

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      data: {
        user: userWithoutPassword,
      },
    };
  } catch (error) {
    console.error("Login error:", error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
