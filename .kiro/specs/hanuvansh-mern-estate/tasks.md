# Implementation Plan: HANUVANSH ESTATE CONSULTANT

## Overview

This plan converts the HANUVANSH ESTATE CONSULTANT design into incremental coding tasks for a MERN stack luxury real estate platform. Tasks are ordered so each step builds on the previous: project scaffolding → backend models and API → frontend layout and pages → admin dashboard → security hardening. All code is JavaScript (Node.js / React.js).

## Tasks

- [x] 1. Initialize monorepo structure and configure tooling
  - Create root `package.json` with `install:all`, `dev`, `build`, and `start` scripts using `concurrently`
  - Bootstrap `client/` with Vite + React: `npm create vite@latest client -- --template react`
  - Install and configure Tailwind CSS and PostCSS in `client/`
  - Install Framer Motion in `client/`
  - Scaffold `server/` with `package.json`, `server.js` entry point, and subdirectories: `src/config/`, `src/models/`, `src/controllers/`, `src/routes/`, `src/middleware/`
  - Install server dependencies: `express`, `mongoose`, `dotenv`, `bcryptjs`, `jsonwebtoken`, `cors`, `helmet`, `express-rate-limit`, `multer`, `cloudinary`, `express-mongo-sanitize`
  - Create `server/.env.example` documenting all required variables: `MONGO_URI`, `JWT_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLIENT_URL`, `PORT`
  - Create `client/.env.example` documenting `VITE_API_URL`
  - Add `.gitignore` entries for `node_modules`, `.env`, `dist`
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Implement backend configuration and server entry point
  - Create `server/src/config/db.js`: connect to MongoDB via Mongoose; log descriptive error and call `process.exit(1)` if `MONGO_URI` is missing or connection fails
  - Create `server/src/config/cloudinary.js`: configure Cloudinary SDK using env vars
  - Implement `server/server.js`: load `dotenv`, apply `helmet`, `cors`, `express.json()`, `express.urlencoded()`, mount route files, mount global `errorHandler`, call `connectDB()`, listen on `PORT`
  - Create `server/src/middleware/errorHandler.js` with `AppError` class and global error handler middleware returning `{ success: false, message }`
  - _Requirements: 1.3, 1.5, 1.6, 18.5, 18.6_

- [x] 3. Implement Mongoose data models
  - [x] 3.1 Create `server/src/models/User.js`
    - Define schema with `name`, `email` (unique), `password`, `role` (enum), `createdAt`
    - Add `pre('save')` hook to bcrypt-hash password with salt rounds 10
    - Add `comparePassword` instance method
    - _Requirements: 2.1, 2.5_

  - [x] 3.2 Write property test for User model password hashing (Property 1)
    - **Property 1: Password hashing round-trip**
    - Use fast-check to generate arbitrary non-empty password strings
    - Assert stored password !== plain-text AND `bcrypt.compare(original, stored)` returns `true`
    - **Validates: Requirements 2.5**

  - [x] 3.3 Create `server/src/models/Property.js`
    - Define schema with all fields: `name`, `location`, `type` (enum), `price` (min: 0), `configuration`, `status` (enum), `amenities`, `images`, `mapCoordinates` (`lat`/`lng`), `nearbyPlaces`, `description`, `featured`, `createdAt`
    - Add indexes on `type`, `status`, `featured`, `price`
    - _Requirements: 2.2_

  - [x] 3.4 Create `server/src/models/Inquiry.js`
    - Define schema with `name`, `email`, `phone`, `message`, `propertyId` (ObjectId ref, optional), `status` (enum, default `'New'`), `createdAt`
    - Add indexes on `status`, `createdAt`
    - _Requirements: 2.3_

  - [x] 3.5 Create `server/src/models/Testimonial.js`
    - Define schema with `clientName`, `clientTitle`, `message`, `rating` (min: 1, max: 5), `avatar`, `createdAt`
    - Add index on `createdAt`
    - _Requirements: 2.4_

  - [x] 3.6 Write property test for Mongoose model validation (Property 2)
    - **Property 2: Mongoose model validation rejects invalid documents**
    - Use fast-check to generate objects with missing required fields and out-of-enum values for User, Property, Inquiry, and Testimonial schemas
    - Assert each invalid document throws a `ValidationError` and is not persisted
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4**

- [x] 4. Implement authentication middleware and API
  - [x] 4.1 Create `server/src/middleware/authMiddleware.js`
    - Read `Authorization: Bearer <token>` header, verify JWT with `JWT_SECRET`
    - Attach `req.user` on success; respond HTTP 401 with `"Unauthorized: Invalid or expired token"` on failure
    - _Requirements: 3.4, 3.5_

  - [x] 4.2 Write property test for authMiddleware (Property 3)
    - **Property 3: JWT authMiddleware accepts valid tokens and rejects invalid ones**
    - Use fast-check to generate arbitrary strings as tokens
    - Assert middleware calls `next()` only for tokens signed with correct `JWT_SECRET` and not expired; all others receive HTTP 401
    - **Validates: Requirements 3.4, 3.5**

  - [x] 4.3 Create `server/src/middleware/adminMiddleware.js`
    - Check `req.user.role === 'admin'`; call `next()` if true, respond HTTP 403 with `"Forbidden: Admin access required"` otherwise
    - _Requirements: 3.6, 3.7_

  - [x] 4.4 Write property test for adminMiddleware (Property 4)
    - **Property 4: adminMiddleware allows only admin-role users**
    - Use fast-check to generate arbitrary role strings
    - Assert `next()` is called only when role is exactly `'admin'`; all other values receive HTTP 403
    - **Validates: Requirements 3.6, 3.7**

  - [x] 4.5 Create `server/src/controllers/authController.js` and `server/src/routes/authRoutes.js`
    - Implement `POST /api/auth/register`: validate fields, create User, sign JWT, return `{ success: true, data: { token } }`
    - Implement `POST /api/auth/login`: find user by email, call `comparePassword`, sign JWT on success; return HTTP 401 with descriptive message on failure
    - Apply `loginRateLimiter` to the login route (10 requests / 15 min per IP)
    - _Requirements: 3.1, 3.2, 3.3_

- [x] 5. Checkpoint — Ensure backend auth tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement Property management API
  - [x] 6.1 Create `server/src/controllers/propertyController.js`
    - `getProperties`: build Mongoose query from `type`, `minPrice`, `maxPrice`, `configuration`, `status` query params; paginate with `page` (default 1, pageSize 12); return `{ success: true, data: { properties, pagination } }`
    - `getFeaturedProperties`: return all documents where `featured: true`
    - `getPropertyById`: return single document by ObjectId; return HTTP 404 `"Property not found"` for missing/invalid ID
    - `createProperty`: validate required fields (`name`, `location`, `type`, `price`, `configuration`, `status`); return HTTP 400 if any missing; create and return document
    - `updateProperty`: validate required fields; update and return document; HTTP 404 if not found
    - `deleteProperty`: delete document; HTTP 404 if not found
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8_

  - [x] 6.2 Write property test for Property filter logic (Property 5)
    - **Property 5: Property filter logic returns only matching results**
    - Use fast-check to generate arrays of Property-shaped objects and arbitrary filter combinations
    - Assert every document in the result satisfies all applied filter constraints
    - **Validates: Requirements 4.1, 4.2**

  - [x] 6.3 Create `server/src/routes/propertyRoutes.js`
    - Mount public routes: `GET /`, `GET /featured`, `GET /:id`
    - Mount admin-only routes (authMiddleware + adminMiddleware): `POST /`, `PUT /:id`, `DELETE /:id`
    - Register router in `server.js` at `/api/properties`
    - _Requirements: 4.1–4.8_

- [x] 7. Implement Image Upload API
  - [x] 7.1 Create `server/src/middleware/uploadMiddleware.js`
    - Configure `multer` with `memoryStorage()`, `limits: { fileSize: 10 * 1024 * 1024 }`, and `fileFilter` accepting only `image/jpeg`, `image/png`, `image/webp`
    - Return HTTP 400 `"Invalid file type"` for disallowed MIME types; HTTP 400 `"File size exceeds 10MB limit"` for oversized files
    - _Requirements: 5.3, 5.5, 5.6_

  - [x] 7.2 Write property test for file upload validation (Property 6)
    - **Property 6: File upload validation rejects disallowed types and oversized files**
    - Use fast-check to generate arbitrary MIME type strings and file sizes
    - Assert `fileFilter` accepts only the three allowed MIME types; assert files > 10 MB are rejected before the upload handler
    - **Validates: Requirements 5.5, 5.6**

  - [x] 7.3 Create `server/src/controllers/uploadController.js` and `server/src/routes/uploadRoutes.js`
    - Pipe `req.file.buffer` into `cloudinary.uploader.upload_stream()` wrapped in a Promise
    - Return `{ success: true, data: { url: secure_url } }` on success; HTTP 500 `"Image upload failed"` on Cloudinary error
    - Mount as admin-only `POST /api/upload`
    - _Requirements: 5.1, 5.2, 5.4_

- [x] 8. Implement Inquiry and Testimonial APIs
  - [x] 8.1 Create `server/src/controllers/inquiryController.js` and `server/src/routes/inquiryRoutes.js`
    - `POST /api/inquiries` (public): validate `name`, `email`, `phone`, `message`; return HTTP 400 with descriptive error if missing; create Inquiry; return HTTP 201
    - `GET /api/inquiries` (admin): return all inquiries sorted by `createdAt` descending
    - `PUT /api/inquiries/:id` (admin): update `status` field
    - `DELETE /api/inquiries/:id` (admin): delete document
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [x] 8.2 Create `server/src/controllers/testimonialController.js` and `server/src/routes/testimonialRoutes.js`
    - `GET /api/testimonials` (public): return all testimonials sorted by `createdAt` descending
    - `POST /api/testimonials` (admin): validate and create Testimonial document
    - `DELETE /api/testimonials/:id` (admin): delete document
    - _Requirements: 7.1, 7.2, 7.3_

- [x] 9. Checkpoint — Ensure all backend API tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Set up frontend project structure and shared utilities
  - Configure `client/src/api/axiosInstance.js`:
    - Create Axios instance with `baseURL: import.meta.env.VITE_API_URL` and `timeout: 15000`
    - Add request interceptor: attach `Authorization: Bearer <token>` from `localStorage.getItem('adminToken')`
    - Add response interceptor: on HTTP 401, clear `adminToken` from localStorage and redirect to `/admin/login`
    - _Requirements: 18.1, 18.2, 18.3_

  - Create `client/src/utils/formatPrice.js`: implement `formatPrice(number)` returning INR-formatted string with ₹ symbol in Indian numbering notation (lakhs/crores)
  - Create `client/src/utils/buildQueryParams.js`: implement `buildQueryParams(filters)` that serializes only non-empty, non-null filter values to a URL query string
  - Create `client/src/styles/animations.js`: export `pageVariants`, `sectionVariants`, `cardHoverVariants`, `containerVariants`, `heroVariants` Framer Motion variant objects
  - Configure `client/tailwind.config.js` with the full design system: dark luxury colors, accent/gold palette, `fontFamily.heading` (Playfair Display), `fontFamily.body` (Inter), custom animations
  - Add global CSS in `client/src/styles/index.css` with `.glass` utility class (glassmorphism)
  - _Requirements: 17.1, 17.2, 17.3, 17.4_

  - [x] 10.1 Write property test for formatPrice utility (Property 7)
    - **Property 7: Price formatting produces valid INR strings**
    - Use fast-check to generate arbitrary non-negative numbers
    - Assert returned string is non-empty, contains ₹, and represents the value in Indian numbering notation
    - **Validates: Requirements 12.7**

  - [x] 10.2 Write property test for buildQueryParams utility (Property 8)
    - **Property 8: Filter state encodes correctly to query parameters**
    - Use fast-check to generate arbitrary filter state objects with subsets of `{ type, minPrice, maxPrice, configuration, status }`
    - Assert output query string includes exactly the non-empty/non-null values and omits all empty/null/undefined ones
    - **Validates: Requirements 12.2, 12.3**

- [x] 11. Implement Redux Toolkit store
  - Set up `client/src/store/index.js` with `configureStore` combining all slices
  - Create `authSlice.js`: state shape `{ token, isAuthenticated, loading, error }`; thunks for `loginAdmin` (calls `POST /api/auth/login`, stores token in localStorage) and `logoutAdmin` (clears localStorage)
  - Create `propertiesSlice.js`: state shape `{ items, featured, selected, pagination, filters, loading, error }`; thunks for `fetchProperties`, `fetchFeaturedProperties`, `fetchPropertyById`, `createProperty`, `updateProperty`, `deleteProperty`
  - Create `inquiriesSlice.js`: state shape `{ items, loading, error }`; thunks for `fetchInquiries`, `updateInquiryStatus`, `deleteInquiry`
  - Create `testimonialsSlice.js`: state shape `{ items, loading, error }`; thunks for `fetchTestimonials`, `createTestimonial`, `deleteTestimonial`
  - Create `uiSlice.js`: state shape `{ toastMessage, toastType }`; actions `showToast`, `clearToast`
  - Wrap `<App />` in `<Provider store={store}>` in `client/src/main.jsx`
  - _Requirements: 18.4_

- [x] 12. Implement common layout components
  - [x] 12.1 Create `client/src/components/common/Navbar.jsx`
    - Sticky positioning, glassmorphism background (`.glass` class), scroll-opacity effect using `useEffect` + `window.addEventListener('scroll')`
    - Navigation links to all public routes; mobile hamburger menu with Framer Motion open/close animation
    - _Requirements: 8.3, 17.3, 17.8_

  - [x] 12.2 Create `client/src/components/common/Footer.jsx`
    - Company logo, tagline, navigation links, social media icons (Instagram, Facebook, LinkedIn, YouTube), WhatsApp button, copyright notice
    - _Requirements: 8.4, 17.9_

  - [x] 12.3 Create supporting common components
    - `SkeletonLoader.jsx`: configurable skeleton card with shimmer animation
    - `Toast.jsx`: success/error notification overlay driven by `uiSlice`
    - `ConfirmDialog.jsx`: modal confirmation for destructive actions
    - `LoadingSpinner.jsx`: luxury spinner for page-level loading
    - `ErrorBoundary.jsx`: React error boundary wrapping lazy-loaded route components
    - `PageTransition.jsx`: Framer Motion wrapper using `pageVariants` for route-level animations
    - _Requirements: 17.7, 18.4_

- [x] 13. Implement frontend routing and App shell
  - Configure `client/src/App.jsx` with React Router v6 `<BrowserRouter>` and `<Routes>`
  - Implement `PublicLayout` (renders Navbar + Outlet + Footer) and `AdminLayout` (sidebar + main content)
  - Lazy-load all page components with `React.lazy` and wrap `<Routes>` in `<Suspense fallback={<LoadingSpinner />}>`
  - Define all public routes: `/`, `/about`, `/founder`, `/properties`, `/properties/:id`, `/contact`
  - Define admin routes: `/admin/login`, and protected `/admin/*` routes wrapped in `ProtectedRoute`
  - Add `*` catch-all route rendering `NotFoundPage`
  - Wrap each route's page component in `<PageTransition>` for Framer Motion route transitions
  - _Requirements: 8.1, 8.2, 8.5, 8.6, 19.5_

- [x] 14. Implement ProtectedRoute and admin authentication frontend
  - [x] 14.1 Create `client/src/components/admin/ProtectedRoute.jsx`
    - Read `adminToken` from `localStorage`; render `<Navigate to="/admin/login" replace />` if absent; render `children` if present
    - _Requirements: 15.4_

  - [x] 14.2 Write property test for ProtectedRoute redirect behavior (Property 9)
    - **Property 9: ProtectedRoute redirects unauthenticated users**
    - Use fast-check to generate arbitrary localStorage states (token present vs. absent)
    - Assert component renders `<Navigate>` when token is absent and renders children when any non-empty token string is present
    - **Validates: Requirements 15.4**

  - [x] 14.3 Create `client/src/pages/admin/AdminLoginPage.jsx`
    - Render email and password inputs with `LoginForm` component
    - On submit, dispatch `loginAdmin` thunk; on success redirect to `/admin/dashboard`; on HTTP 401 display backend error message below form
    - _Requirements: 15.1, 15.2, 15.3_

- [x] 15. Implement property utility components
  - Create `client/src/components/property/PropertyCard.jsx`: display name, location, type, price (via `formatPrice`), configuration, status badge, primary image; apply `cardHoverVariants` Framer Motion hover animation
  - Create `client/src/components/property/PropertyGallery.jsx`: image grid with lightbox/fullscreen view on click
  - Create `client/src/components/property/AmenitiesGrid.jsx`: icon-label pairs for amenities list
  - Create `client/src/components/property/NearbyPlaces.jsx`: styled list of nearby places
  - Create `client/src/components/property/MapEmbed.jsx`: Google Maps iframe accepting `lat` and `lng` props
  - Create `client/src/components/property/SearchFilter.jsx`: controlled filter panel with dropdowns and inputs for `type`, `minPrice`, `maxPrice`, `configuration`, `status`; calls `buildQueryParams` and dispatches `fetchProperties` on change
  - Create `client/src/components/forms/InquiryForm.jsx`: fields for `name`, `email`, `phone`, `message`; optional hidden `propertyId`; client-side validation; dispatches `POST /api/inquiries` via Axios; shows success confirmation and resets on success; shows error toast on failure
  - _Requirements: 12.7, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7_

- [x] 16. Implement public pages
  - [x] 16.1 Create `client/src/pages/public/HomePage.jsx`
    - Hero Section: full-viewport, luxury background, company name, tagline, CTA button linking to `/properties`; apply `heroVariants` entrance animation
    - Featured Properties section: fetch from `GET /api/properties/featured` via `fetchFeaturedProperties` thunk; display up to 6 `PropertyCard` components with `containerVariants` stagger; show `SkeletonLoader` while loading; show graceful error message on failure
    - Company Introduction section: brand messaging, key statistics with animated counters using Framer Motion
    - Testimonials section: fetch from `GET /api/testimonials` via `fetchTestimonials` thunk; display in carousel or grid
    - Premium CTA section: luxury background, compelling copy, button linking to `/contact`
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

  - [x] 16.2 Create `client/src/pages/public/AboutPage.jsx`
    - Luxury hero banner, company history section, brand philosophy section
    - Core values as animated icon cards with `sectionVariants` scroll-triggered animations
    - Founder teaser section with brief introduction and link to `/founder`
    - _Requirements: 10.1, 10.2, 10.3_

  - [x] 16.3 Create `client/src/pages/public/FounderPage.jsx`
    - Premium animated profile layout: profile image, name (JAY MEHTA), title, biography with Framer Motion entrance animations
    - Professional achievements and vision statement sections
    - Connect section: social profile links and WhatsApp contact button
    - _Requirements: 11.1, 11.2, 11.3_

  - [x] 16.4 Create `client/src/pages/public/PropertyListingPage.jsx`
    - Render `SearchFilter` panel and property grid of `PropertyCard` components
    - Dispatch `fetchProperties` with filter params on mount and on filter change (no full page reload)
    - Show `SkeletonLoader` while loading; show `"No properties found matching your criteria"` when results are empty
    - Render pagination controls that dispatch `fetchProperties` with updated `page` param
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_

  - [x] 16.5 Create `client/src/pages/public/PropertyDetailPage.jsx`
    - Fetch property via `fetchPropertyById` using route param; show "Property Not Found" UI with link to `/properties` on HTTP 404
    - Render `PropertyGallery`, all property detail fields, `AmenitiesGrid`, `NearbyPlaces`, `MapEmbed`
    - Render `InquiryForm` pre-populated with property name and `propertyId`
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 13.8_

  - [x] 16.6 Create `client/src/pages/public/ContactPage.jsx`
    - General `InquiryForm` without pre-populated `propertyId`
    - WhatsApp button opening `https://wa.me/<number>` in new tab
    - Embedded Google Maps iframe for office location
    - Social media icon buttons (Instagram, Facebook, LinkedIn, YouTube) opening in new tabs
    - Contact information card: phone, email, physical address
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_

  - [x] 16.7 Create `client/src/pages/public/NotFoundPage.jsx`
    - Styled 404 page with link back to Home Page
    - _Requirements: 8.5_

- [x] 17. Checkpoint — Ensure all frontend component and page tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 18. Implement Admin Dashboard pages
  - [x] 18.1 Create `client/src/components/admin/AdminLayout.jsx`
    - Fixed sidebar (240px) with navigation links to all admin sections and logout button at bottom
    - Logout button dispatches `logoutAdmin` thunk (clears localStorage) and redirects to `/admin/login`
    - Scrollable main content area
    - _Requirements: 16.1, 15.5_

  - [x] 18.2 Create `client/src/pages/admin/DashboardPage.jsx`
    - Fetch properties, inquiries, and testimonials using existing thunks
    - Render four `AnalyticsCard` components: total Properties, total Inquiries, new (status `'New'`) Inquiries count, total Testimonials
    - _Requirements: 16.1_

  - [x] 18.3 Create `client/src/components/admin/ImageUploader.jsx`
    - Drag-and-drop or click-to-upload control
    - On file selection, call `POST /api/upload` via Axios; preview returned Cloudinary URL
    - _Requirements: 16.3_

  - [x] 18.4 Create `client/src/pages/admin/AddPropertyPage.jsx` and `client/src/pages/admin/EditPropertyPage.jsx`
    - Add Property form: input fields for all Property model fields; `ImageUploader` for images; on submit dispatch `createProperty` thunk
    - Edit Property form: pre-populate with existing data fetched via `fetchPropertyById`; on submit dispatch `updateProperty` thunk
    - _Requirements: 16.3, 16.4_

  - [x] 18.5 Create `client/src/pages/admin/AdminPropertiesPage.jsx`
    - Table listing all properties with Edit and Delete action buttons
    - Delete button shows `ConfirmDialog` before dispatching `deleteProperty` thunk
    - _Requirements: 16.2, 16.5_

  - [x] 18.6 Create `client/src/pages/admin/AdminInquiriesPage.jsx`
    - Table listing all inquiries with `name`, `email`, `phone`, `message`, `propertyId`, `status`, `createdAt`
    - Status dropdown per row dispatches `updateInquiryStatus` thunk on change
    - _Requirements: 16.6, 16.7_

  - [x] 18.7 Create `client/src/pages/admin/AdminTestimonialsPage.jsx`
    - Form to add new Testimonial (dispatches `createTestimonial` thunk)
    - Card list of existing testimonials with delete button (dispatches `deleteTestimonial` thunk)
    - _Requirements: 16.8_

- [x] 19. Apply security and performance hardening
  - Apply `express-mongo-sanitize` middleware globally in `server.js` to strip `$` and `.` characters from request bodies (NoSQL injection prevention)
  - Verify `helmet()` and `cors({ origin: process.env.CLIENT_URL })` are applied to all routes in `server.js`
  - Confirm `loginRateLimiter` (10 req / 15 min per IP) is applied only to `POST /api/auth/login`
  - Verify all public page components in `App.jsx` use `React.lazy` + `Suspense` for code splitting
  - Update `PropertyCard` and `PropertyDetailPage` to use Cloudinary transformation URLs (e.g., `w_800,q_auto,f_auto`) for optimized image delivery
  - Verify Mongoose connection in `db.js` uses default connection pool (no additional configuration needed; document this in comments)
  - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6, 19.7_

- [x] 20. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints at tasks 5, 9, 17, and 20 ensure incremental validation
- Property tests use [fast-check](https://github.com/dubzzz/fast-check) with Vitest; run with `vitest --run`
- Unit tests use Vitest + React Testing Library for frontend components
- All property tests must include the tag: `// Feature: hanuvansh-mern-estate, Property {N}: {property_text}`
- Each property test runs a minimum of 100 iterations (`numRuns: 100`)
- The design document's Correctness Properties section defines 9 properties (Properties 1–9) that map to tasks 3.2, 3.6, 4.2, 4.4, 6.2, 7.2, 10.1, 10.2, and 14.2
