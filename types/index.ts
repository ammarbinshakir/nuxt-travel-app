export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  createdAt: Date;
}

export interface Experience {
  id: string;
  slug: string;
  title: string;
  description: string;
  location: string;
  category: string;
  price: number;
  duration: number; // in hours
  images: string[];
  featured: boolean;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  experienceId: string;
  date: Date;
  participants: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  experienceId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
