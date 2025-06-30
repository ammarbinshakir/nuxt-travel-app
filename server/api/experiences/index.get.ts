export default defineEventHandler(async (event) => {
  try {
    // Mock experiences data
    const experiences = [
      {
        id: "exp1",
        slug: "mountain-hiking-adventure",
        title: "Mountain Hiking Adventure",
        description:
          "Experience the thrill of mountain hiking with our expert guides. This adventure takes you through scenic trails with breathtaking views of the surrounding landscape.",
        location: "Rocky Mountains, Colorado",
        category: "hiking",
        price: 89.99,
        duration: 6,
        images: [
          "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        ],
        featured: true,
        rating: 4.8,
        reviewCount: 127,
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
      },
      {
        id: "exp2",
        slug: "city-food-tour",
        title: "City Food Tour",
        description:
          "Discover the best local cuisine on this guided food tour. Sample authentic dishes from top-rated restaurants and learn about the city's culinary history.",
        location: "New York City, NY",
        category: "food",
        price: 65.0,
        duration: 3,
        images: [
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
          "https://images.unsplash.com/photo-1504674900240-8947e31be94f?w=800",
        ],
        featured: true,
        rating: 4.9,
        reviewCount: 89,
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-01-10"),
      },
      {
        id: "exp3",
        slug: "museum-cultural-tour",
        title: "Museum Cultural Tour",
        description:
          "Explore world-class museums with our knowledgeable guides. Learn about art, history, and culture through interactive exhibits and fascinating stories.",
        location: "Washington, DC",
        category: "museums",
        price: 45.0,
        duration: 4,
        images: [
          "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800",
        ],
        featured: false,
        rating: 4.6,
        reviewCount: 156,
        createdAt: new Date("2024-01-05"),
        updatedAt: new Date("2024-01-05"),
      },
      {
        id: "exp4",
        slug: "beach-relaxation-retreat",
        title: "Beach Relaxation Retreat",
        description:
          "Unwind and relax on pristine beaches with our wellness retreat. Enjoy yoga sessions, meditation, and spa treatments in a peaceful coastal setting.",
        location: "Maui, Hawaii",
        category: "relaxation",
        price: 199.99,
        duration: 8,
        images: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
        ],
        featured: true,
        rating: 4.7,
        reviewCount: 203,
        createdAt: new Date("2024-01-20"),
        updatedAt: new Date("2024-01-20"),
      },
      {
        id: "exp5",
        slug: "adventure-rock-climbing",
        title: "Adventure Rock Climbing",
        description:
          "Challenge yourself with our rock climbing adventure. Suitable for beginners and experienced climbers alike, with professional equipment and safety measures.",
        location: "Yosemite National Park, CA",
        category: "adventure",
        price: 120.0,
        duration: 5,
        images: [
          "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800",
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
        ],
        featured: false,
        rating: 4.5,
        reviewCount: 78,
        createdAt: new Date("2024-01-12"),
        updatedAt: new Date("2024-01-12"),
      },
      {
        id: "exp6",
        slug: "cultural-heritage-walk",
        title: "Cultural Heritage Walk",
        description:
          "Immerse yourself in local culture and history with our guided heritage walk. Visit historic sites, meet local artisans, and learn traditional customs.",
        location: "San Francisco, CA",
        category: "culture",
        price: 55.0,
        duration: 3.5,
        images: [
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
          "https://images.unsplash.com/photo-1480714378408-67cf0d13bcff?w=800",
        ],
        featured: false,
        rating: 4.4,
        reviewCount: 92,
        createdAt: new Date("2024-01-08"),
        updatedAt: new Date("2024-01-08"),
      },
    ];

    return experiences;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch experiences",
    });
  }
});
