# TinyTales E-Commerce Platform

A complete e-commerce platform built with Next.js 14 (App Router), TypeScript, and Tailwind CSS, featuring a full authentication flow and product details page.

## 🚀 Features

### Authentication System
- ✅ User Registration (Register)
- ✅ User Login (Login)
- ✅ Account Verification (Verify Account)
- ✅ Protected Dashboard
- ✅ Route Protection using Middleware
- ✅ Token-based Authentication
- ✅ Auto Redirect for Unauthorized Access

### Product Features
- ✅ Product Details Page with Image Gallery
- ✅ Product Information Display (Price, Colors, Sizes, Types)
- ✅ Quantity Selector
- ✅ Add to Cart Functionality
- ✅ Rating & Reviews Section
- ✅ Similar Products Carousel
- ✅ Product Image Navigation

### UI/UX Features
- ✅ Modern Header with Navigation
- ✅ Hero Section with Background Images
- ✅ Breadcrumb Navigation
- ✅ Responsive Design (Mobile & Desktop)
- ✅ CSS Modules for Component Styling
- ✅ Reusable UI Components
- ✅ Loading States
- ✅ Error Handling
- ✅ Form Validation with Zod

## 🛠️ Technologies Used

- **Next.js 14** (App Router)
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Next.js Image** - Optimized image handling
- **CSS Modules** - Scoped component styles
- **ESLint & Prettier** - Code quality and formatting

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/Youssefatef289/Tinytales---project.git
cd Tinytales---project
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/
│   ├── dashboard/              # Protected Dashboard with Product Details
│   │   └── page.tsx
│   ├── login/                  # Login Page
│   │   └── page.tsx
│   ├── register/               # Registration Page
│   │   └── page.tsx
│   ├── verify/                 # Account Verification Page
│   │   └── page.tsx
│   ├── layout.tsx              # Root Layout
│   ├── page.tsx                # Home Page (redirects to login)
│   └── globals.css             # Global Styles
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Main Header Component
│   │   └── Header.module.css   # Header Styles
│   ├── products/
│   │   ├── ProductCard.tsx     # Product Card Component
│   │   └── ProductCard.module.css
│   └── ui/                     # Reusable UI Components
│       ├── Button.tsx
│       ├── Button.module.css
│       ├── Input.tsx
│       ├── Input.module.css
│       ├── Alert.tsx
│       └── Alert.module.css
├── lib/
│   ├── api/
│   │   ├── client.ts           # Axios Configuration
│   │   └── auth.ts             # Authentication API Functions
│   ├── constants.ts            # App Constants
│   ├── hooks/
│   │   └── useAuth.ts          # Authentication Hook
│   ├── types/
│   │   └── auth.ts             # TypeScript Types
│   └── utils/
│       └── storage.ts          # LocalStorage Utilities
├── public/
│   └── image/                  # Public Images & Icons
│       ├── header.jpg          # Header Background
│       ├── footer.jpg          # Footer Background
│       ├── producat (1-8).png  # Product Images
│       ├── TT LogoTT Logo 1.svg
│       └── icons/              # Navigation Icons
├── middleware.ts               # Route Protection Middleware
├── next.config.js              # Next.js Configuration
├── tailwind.config.ts          # Tailwind Configuration
└── package.json
```

## 🔌 API Integration

The project is connected to the following API:

**Base URL:** `https://tinytales.trendline.marketing/api`

### Available Endpoints:

- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/verify-email` - Verify account with code
- `POST /auth/verify-email/resend-code` - Resend verification code
- `GET /auth/user-data` - Get user data
- `POST /auth/logout` - User logout

### API Features:

- ✅ Centralized API Service Layer
- ✅ Request/Response Interceptors
- ✅ Automatic Token Injection
- ✅ Error Handling
- ✅ FormData Support for File Uploads

## 🔐 Authentication Flow

1. **Registration**
   - User fills registration form (Name, Email, Phone, Password)
   - Frontend validation using Zod
   - API call to register endpoint
   - Token saved to localStorage
   - Redirect to verification page

2. **Verification**
   - User enters verification code (123456 for testing)
   - API validates the code
   - On success, redirect to login page

3. **Login**
   - User enters email and password
   - Token and username saved to localStorage
   - Redirect to Dashboard

4. **Dashboard**
   - Protected route requiring authentication
   - Displays Product Details Page
   - Shows user information
   - Logout functionality

## 🎨 UI Components

### Header Component
- Logo and Brand Name
- Navigation Menu with Icons
- Search Bar (Desktop)
- Shopping Cart with Badge
- Notifications with Badge
- Wishlist Icon
- Language Selector
- User Profile Dropdown
- Mobile Menu

### Product Details Page
- Hero Section with Background
- Breadcrumb Navigation
- Product Image Gallery with Navigation
- Product Information (Price, Description, Options)
- Type & Size Selectors
- Color Swatches
- Quantity Selector
- Add to Cart Button
- Rating & Reviews Section
- Similar Products Carousel

### Reusable Components
- **Button**: Multiple variants (primary, secondary, outline) with loading state
- **Input**: Form input with label, error handling, and validation
- **Alert**: Different types (success, error, info, warning)
- **ProductCard**: Product display card with image, rating, price, and colors

## 🎯 Key Features

### Security
- **Middleware Protection**: Automatic route protection
- **Client-side Validation**: Token checking on protected pages
- **Token Management**: Secure localStorage handling
- **Auto Redirect**: Unauthorized access redirection

### Performance
- **Next.js Image Optimization**: Optimized image loading
- **CSS Modules**: Scoped styles for better performance
- **Code Splitting**: Automatic by Next.js
- **Lazy Loading**: Images loaded on demand

### Design
- **Responsive Layout**: Mobile-first approach
- **Modern UI**: Clean and professional design
- **Smooth Animations**: Transitions and hover effects
- **Accessibility**: Semantic HTML and ARIA labels

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import repository to Vercel
3. Vercel will auto-detect Next.js
4. Click Deploy

Or using Vercel CLI:

```bash
npm i -g vercel
vercel
```

### Environment Variables

No environment variables required for basic setup. API base URL is configured in `lib/constants.ts`.

## 📝 Development

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code (Prettier)
npm run format  # if configured
```

## 📋 Notes

- **Verification Code**: `123456` (for testing)
- **Token Storage**: localStorage
- **Direction**: LTR (Left to Right)
- **Language**: English (UI text)
- **Images**: All images stored in `/public/image/`

## 🎨 Styling

The project uses:
- **Tailwind CSS** for utility classes
- **CSS Modules** for component-specific styles
- **Global CSS** for app-wide styles

Each component has its own CSS Module file:
- `Header.module.css`
- `Button.module.css`
- `Input.module.css`
- `Alert.module.css`
- `ProductCard.module.css`

## 📸 Images & Assets

All images and icons are located in:
- `/public/image/` - Public assets
- `/image/` - Source images (also copied to public)

### Available Assets:
- Header background: `header.jpg`
- Footer background: `footer.jpg`
- Product images: `producat (1-8).png`
- Logo: `TT LogoTT Logo 1.svg`
- Navigation icons: `/icons/` folder

## 🔗 Links

- **GitHub Repository**: [https://github.com/Youssefatef289/Tinytales---project.git](https://github.com/Youssefatef289/Tinytales---project.git)
- **API Base URL**: `https://tinytales.trendline.marketing/api`

## 📄 License

This project is created for TinyTales assignment.

## 👨‍💻 Author

Youssef Atef

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
