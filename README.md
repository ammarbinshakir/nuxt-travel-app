# 🧭 Nuxt Travel App

A modern travel experience booking platform built with Nuxt 3, featuring user authentication, experience management, booking system, and admin panel.

## ✨ Key Features

### 🏠 Home Page

- **Featured Experiences**: Showcase highlighted travel experiences
- **Search Functionality**: Search by location or keyword
- **Category Filters**: Filter by hiking, museums, food, adventure, culture, relaxation
- **Responsive Design**: Modern UI with Tailwind CSS

### 📄 Experience Detail Page (`/experience/:slug`)

- **Dynamic Routing**: Uses `definePageMeta()` for SEO optimization
- **Async Data Loading**: Loads experience data via `useAsyncData()`
- **Rich Content**: Description, images, price, duration, reviews
- **Image Gallery**: Multiple images with thumbnail navigation
- **Booking Integration**: Direct booking from experience page

### 👤 User Authentication

- **JWT-based Auth**: Secure cookie-based authentication
- **Login/Register**: Combined authentication page
- **Route Protection**: Middleware to protect authenticated routes
- **User State Management**: Global user state with Pinia

### 🛒 Booking System

- **Authenticated Booking**: Only logged-in users can book
- **Real-time Pricing**: Dynamic price calculation
- **Date Selection**: Future date validation
- **Confirmation Page**: Booking summary and next steps

### 💼 Admin Panel (`/admin/*`)

- **Route Protection**: Admin-only access with middleware
- **Dashboard**: Overview statistics and recent activity
- **Experience Management**: Add, edit, delete experiences
- **Booking Management**: View and manage all bookings

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nuxt-travel-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   JWT_SECRET=your-secret-key-here
   API_BASE=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
nuxt-travel-app/
├── assets/
│   └── css/
│       └── main.css          # Global styles and Tailwind
├── composables/
│   └── useAuth.ts           # Authentication composable
├── middleware/
│   ├── auth.ts              # User authentication middleware
│   └── admin.ts             # Admin-only middleware
├── pages/
│   ├── admin/
│   │   ├── index.vue        # Admin dashboard
│   │   └── create.vue       # Create experience form
│   ├── booking/
│   │   └── confirmation/
│   │       └── [id].vue     # Booking confirmation page
│   ├── experience/
│   │   └── [slug].vue       # Experience detail page
│   ├── index.vue            # Home page
│   └── login.vue            # Authentication page
├── server/
│   └── api/
│       ├── auth/
│       │   ├── login.post.ts
│       │   ├── logout.post.ts
│       │   ├── me.get.ts
│       │   └── register.post.ts
│       ├── bookings/
│       │   └── index.post.ts
│       └── experiences/
│           ├── index.get.ts
│           └── create.post.ts
├── types/
│   └── index.ts             # TypeScript type definitions
├── nuxt.config.ts           # Nuxt configuration
└── package.json
```

## 🔧 Configuration

### Nuxt Config

The app is configured with:

- **Tailwind CSS**: For styling
- **Pinia**: For state management
- **Runtime Config**: For environment variables
- **Auto-imports**: Vue composables and Nuxt utilities

### Authentication

- **JWT Tokens**: Stored in HTTP-only cookies
- **Password Hashing**: Using bcryptjs
- **Session Management**: 7-day token expiration

## 🎨 UI Components

### Custom CSS Classes

- `.btn-primary`: Primary action buttons
- `.btn-secondary`: Secondary action buttons
- `.card`: Card containers with shadow
- `.input-field`: Form input styling

### Responsive Design

- Mobile-first approach
- Grid layouts for different screen sizes
- Touch-friendly interactions

## 🔐 Authentication Flow

1. **Registration**: User creates account with name, email, password
2. **Login**: User authenticates with email/password
3. **JWT Token**: Server generates and sets secure cookie
4. **Route Protection**: Middleware checks authentication status
5. **Logout**: Clears authentication cookie

## 📊 Admin Features

### Dashboard

- Total experiences, bookings, revenue, users
- Recent bookings with status indicators
- Quick action buttons
- Recent experiences with edit/delete options

### Experience Management

- Create new experiences with rich form
- Image URL management
- Category and pricing configuration
- Featured experience settings

## 🛒 Booking Process

1. **Browse**: User explores experiences on home page
2. **Select**: User clicks on experience to view details
3. **Book**: User selects date and participants
4. **Authenticate**: Login required for booking
5. **Confirm**: Booking confirmation with details
6. **Manage**: Admin can view and manage bookings

## 🧪 Demo Data

The app includes mock data for demonstration:

- **6 Sample Experiences**: Various categories and locations
- **Mock Users**: Demo user for testing
- **Sample Bookings**: For admin dashboard display

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Environment Variables for Production

```env
JWT_SECRET=your-production-secret-key
API_BASE=https://your-domain.com
NODE_ENV=production
```

## 🔧 Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run generate`: Generate static site

### Code Style

- **Vue 3 Composition API**: Modern Vue patterns
- **TypeScript**: Type safety (where applicable)
- **ESLint**: Code linting and formatting
- **Tailwind CSS**: Utility-first styling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Check the documentation
- Open an issue on GitHub
- Contact the development team

---

**Built with ❤️ using Nuxt 3, Vue 3, and Tailwind CSS**
