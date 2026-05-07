# Requirements Document

## Introduction

HANUVANSH ESTATE CONSULTANT is a full-stack luxury real estate platform built on the MERN stack (MongoDB, Express.js, React.js, Node.js). The platform targets high-net-worth property buyers and sellers with a premium dark-luxury UI featuring orange/Bhagwa accent colors, gold highlights, glassmorphism effects, and Framer Motion animations. The system supports public property browsing, inquiry submission, and a secure admin dashboard for property and inquiry management.

**Tagline:** BEYOND TRANSACTIONS - CREATING TIMELESS PROPERTY WEALTH

**Tech Stack:**
- Frontend: React.js + Vite, Tailwind CSS, Framer Motion
- Backend: Node.js + Express.js (REST API)
- Database: MongoDB (Mongoose ODM)
- Authentication: JWT (JSON Web Tokens)
- Image Storage: Cloudinary
- HTTP Client: Axios
- State Management: Redux Toolkit or Context API

---

## Glossary

- **System**: The HANUVANSH ESTATE CONSULTANT web application as a whole
- **Frontend**: The React.js + Vite client-side application
- **Backend**: The Node.js + Express.js REST API server
- **Database**: The MongoDB instance managed via Mongoose
- **Admin**: An authenticated administrator user with full CRUD access
- **Visitor**: An unauthenticated public user browsing the platform
- **Property**: A real estate listing with name, location, type, price, configuration, status, amenities, images, map coordinates, and nearby places
- **Inquiry**: A contact/interest submission made by a Visitor regarding a Property or general contact
- **Testimonial**: A client review record stored in the Database and displayed on the Home Page
- **JWT**: JSON Web Token used for stateless Admin authentication
- **Cloudinary**: Third-party cloud service used for Property image storage and delivery
- **Axios**: HTTP client library used by the Frontend to communicate with the Backend
- **Framer_Motion**: Animation library used by the Frontend for transitions and micro-interactions
- **Admin_Dashboard**: The protected section of the Frontend accessible only to authenticated Admins
- **Property_Card**: A reusable React component displaying a summary of a Property
- **Inquiry_Form**: A form component on the Property Detail Page and Contact Page for submitting Inquiries
- **Search_Filter**: The UI component on the Property Listing Page for filtering Properties by type, price, configuration, and status

---

## Requirements

### Requirement 1: Project Architecture and Folder Structure

**User Story:** As a developer, I want a clean, scalable MERN stack folder structure, so that the codebase is maintainable and production-ready.

#### Acceptance Criteria

1. THE System SHALL organize code into a `client/` directory for the Frontend and a `server/` directory for the Backend at the workspace root.
2. THE Frontend SHALL be bootstrapped with Vite and React.js, with Tailwind CSS and Framer Motion configured.
3. THE Backend SHALL use Express.js with a folder structure separating `routes/`, `controllers/`, `models/`, `middleware/`, and `config/` directories.
4. THE System SHALL include a root-level `package.json` with scripts to install dependencies for both `client/` and `server/` concurrently.
5. THE Backend SHALL load environment variables from a `.env` file using `dotenv`, including `MONGO_URI`, `JWT_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.
6. IF the `MONGO_URI` environment variable is missing at startup, THEN THE Backend SHALL log a descriptive error message and exit the process.

---

### Requirement 2: Database Models

**User Story:** As a developer, I want well-defined Mongoose schemas, so that data is consistently structured and validated in MongoDB.

#### Acceptance Criteria

1. THE Database SHALL include a `User` model with fields: `name` (String, required), `email` (String, required, unique), `password` (String, required, hashed), `role` (String, enum: `['admin', 'user']`, default: `'user'`), and `createdAt` (Date, default: now).
2. THE Database SHALL include a `Property` model with fields: `name` (String, required), `location` (String, required), `type` (String, enum: `['Apartment', 'Villa', 'Plot', 'Commercial', 'Penthouse']`, required), `price` (Number, required), `configuration` (String, required), `status` (String, enum: `['Available', 'Sold', 'Under Construction']`, required), `amenities` (Array of Strings), `images` (Array of Strings storing Cloudinary URLs), `mapCoordinates` (Object with `lat` and `lng` Number fields), `nearbyPlaces` (Array of Strings), `description` (String), `featured` (Boolean, default: false), and `createdAt` (Date, default: now).
3. THE Database SHALL include an `Inquiry` model with fields: `name` (String, required), `email` (String, required), `phone` (String, required), `message` (String, required), `propertyId` (ObjectId, ref: `'Property'`, optional), `status` (String, enum: `['New', 'Contacted', 'Closed']`, default: `'New'`), and `createdAt` (Date, default: now).
4. THE Database SHALL include a `Testimonial` model with fields: `clientName` (String, required), `clientTitle` (String), `message` (String, required), `rating` (Number, min: 1, max: 5, required), `avatar` (String, Cloudinary URL, optional), and `createdAt` (Date, default: now).
5. WHEN a `User` document is saved, THE Database SHALL store the password as a bcrypt hash with a salt round of 10, never storing the plain-text password.

---

### Requirement 3: Backend Authentication API

**User Story:** As an Admin, I want secure JWT-based authentication, so that only authorized users can access the Admin Dashboard and protected API routes.

#### Acceptance Criteria

1. THE Backend SHALL expose a `POST /api/auth/register` endpoint that accepts `name`, `email`, and `password`, creates a `User` document, and returns a signed JWT.
2. THE Backend SHALL expose a `POST /api/auth/login` endpoint that accepts `email` and `password`, validates credentials against the Database, and returns a signed JWT on success.
3. WHEN a login request is received with an invalid email or incorrect password, THE Backend SHALL return HTTP 401 with a descriptive error message.
4. THE Backend SHALL include an `authMiddleware` that validates the JWT from the `Authorization: Bearer <token>` header on protected routes.
5. IF a request to a protected route contains an expired or invalid JWT, THEN THE Backend SHALL return HTTP 401 with the message `"Unauthorized: Invalid or expired token"`.
6. THE Backend SHALL include an `adminMiddleware` that checks the authenticated user's `role` field equals `'admin'` before allowing access to Admin-only routes.
7. IF a non-admin authenticated user attempts to access an Admin-only route, THEN THE Backend SHALL return HTTP 403 with the message `"Forbidden: Admin access required"`.

---

### Requirement 4: Property Management API

**User Story:** As an Admin, I want full CRUD operations for Properties via a REST API, so that I can manage the real estate listings dynamically.

#### Acceptance Criteria

1. THE Backend SHALL expose a `GET /api/properties` endpoint that returns a paginated list of all `Property` documents, accepting optional query parameters `type`, `minPrice`, `maxPrice`, `configuration`, `status`, and `page` (default: 1, pageSize: 12).
2. THE Backend SHALL expose a `GET /api/properties/featured` endpoint that returns all `Property` documents where `featured` is `true`.
3. THE Backend SHALL expose a `GET /api/properties/:id` endpoint that returns a single `Property` document by its MongoDB ObjectId.
4. IF a `GET /api/properties/:id` request is made with a non-existent or invalid ObjectId, THEN THE Backend SHALL return HTTP 404 with the message `"Property not found"`.
5. THE Backend SHALL expose a `POST /api/properties` endpoint (Admin-only) that accepts Property fields and creates a new `Property` document in the Database.
6. THE Backend SHALL expose a `PUT /api/properties/:id` endpoint (Admin-only) that accepts updated Property fields and updates the corresponding `Property` document.
7. THE Backend SHALL expose a `DELETE /api/properties/:id` endpoint (Admin-only) that deletes the corresponding `Property` document from the Database.
8. WHEN a `POST /api/properties` or `PUT /api/properties/:id` request is received, THE Backend SHALL validate that all required fields (`name`, `location`, `type`, `price`, `configuration`, `status`) are present, returning HTTP 400 with a descriptive error if any are missing.

---

### Requirement 5: Image Upload API

**User Story:** As an Admin, I want to upload Property images to Cloudinary, so that high-quality images are stored and delivered efficiently.

#### Acceptance Criteria

1. THE Backend SHALL expose a `POST /api/upload` endpoint (Admin-only) that accepts one or more image files via `multipart/form-data`.
2. WHEN an image upload request is received, THE Backend SHALL upload the image to Cloudinary using the configured Cloudinary credentials and return the secure Cloudinary URL.
3. THE Backend SHALL use `multer` as middleware to handle `multipart/form-data` file parsing before passing files to the Cloudinary upload handler.
4. IF an image upload to Cloudinary fails, THEN THE Backend SHALL return HTTP 500 with the message `"Image upload failed"` and log the error.
5. THE Backend SHALL restrict uploaded file types to `image/jpeg`, `image/png`, and `image/webp`, returning HTTP 400 with the message `"Invalid file type"` for other formats.
6. THE Backend SHALL enforce a maximum file size of 10 MB per image, returning HTTP 400 with the message `"File size exceeds 10MB limit"` for larger files.

---

### Requirement 6: Inquiry and Contact API

**User Story:** As a Visitor, I want to submit property inquiries and contact messages, so that I can express interest in properties or reach the company.

#### Acceptance Criteria

1. THE Backend SHALL expose a `POST /api/inquiries` endpoint (public) that accepts `name`, `email`, `phone`, `message`, and optional `propertyId`, creates an `Inquiry` document, and returns HTTP 201.
2. WHEN an inquiry submission is received with missing required fields (`name`, `email`, `phone`, `message`), THE Backend SHALL return HTTP 400 with a descriptive validation error.
3. THE Backend SHALL expose a `GET /api/inquiries` endpoint (Admin-only) that returns all `Inquiry` documents sorted by `createdAt` descending.
4. THE Backend SHALL expose a `PUT /api/inquiries/:id` endpoint (Admin-only) that updates the `status` field of an `Inquiry` document.
5. THE Backend SHALL expose a `DELETE /api/inquiries/:id` endpoint (Admin-only) that deletes an `Inquiry` document from the Database.

---

### Requirement 7: Testimonials API

**User Story:** As an Admin, I want to manage Testimonials via the API, so that client reviews can be dynamically displayed on the Home Page.

#### Acceptance Criteria

1. THE Backend SHALL expose a `GET /api/testimonials` endpoint (public) that returns all `Testimonial` documents sorted by `createdAt` descending.
2. THE Backend SHALL expose a `POST /api/testimonials` endpoint (Admin-only) that accepts `clientName`, `clientTitle`, `message`, `rating`, and optional `avatar`, and creates a `Testimonial` document.
3. THE Backend SHALL expose a `DELETE /api/testimonials/:id` endpoint (Admin-only) that deletes a `Testimonial` document.

---

### Requirement 8: Frontend Routing and Layout

**User Story:** As a Visitor, I want smooth client-side navigation between pages, so that the browsing experience feels fast and seamless.

#### Acceptance Criteria

1. THE Frontend SHALL use React Router v6 for client-side routing with the following public routes: `/` (Home), `/about` (About), `/founder` (Founder Profile), `/properties` (Property Listing), `/properties/:id` (Property Detail), `/contact` (Contact).
2. THE Frontend SHALL include a protected `/admin` route that redirects unauthenticated users to `/admin/login`.
3. THE Frontend SHALL render a sticky `Navbar` component on all public pages that remains fixed at the top of the viewport during scroll.
4. THE Frontend SHALL render a `Footer` component on all public pages containing company branding, navigation links, social media links, and WhatsApp contact.
5. WHEN a Visitor navigates to a route that does not exist, THE Frontend SHALL display a styled 404 page with a link back to the Home Page.
6. THE Frontend SHALL implement smooth page transition animations using Framer_Motion on route changes.

---

### Requirement 9: Home Page

**User Story:** As a Visitor, I want a visually stunning Home Page, so that I immediately perceive the luxury brand identity of HANUVANSH ESTATE CONSULTANT.

#### Acceptance Criteria

1. THE Frontend SHALL render a full-viewport Hero Section with a luxury background, the company name "HANUVANSH ESTATE CONSULTANT", the tagline "BEYOND TRANSACTIONS - CREATING TIMELESS PROPERTY WEALTH", and a prominent call-to-action button linking to `/properties`.
2. THE Frontend SHALL render a Featured Properties carousel section that fetches data from `GET /api/properties/featured` and displays up to 6 `Property_Card` components with Framer_Motion entrance animations.
3. THE Frontend SHALL render a Company Introduction section with brand messaging, key statistics (e.g., years of experience, properties sold, satisfied clients), and animated counters.
4. THE Frontend SHALL render a Testimonials section that fetches data from `GET /api/testimonials` and displays client reviews in a carousel or grid layout.
5. THE Frontend SHALL render a Premium CTA section with a luxury background, compelling copy, and a button linking to `/contact`.
6. WHEN the Featured Properties data is loading, THE Frontend SHALL display skeleton loader placeholders in place of `Property_Card` components.
7. IF the Featured Properties API call fails, THEN THE Frontend SHALL display a graceful error message without crashing the page.

---

### Requirement 10: About Page

**User Story:** As a Visitor, I want to learn about the company's philosophy and vision, so that I can build trust in the brand.

#### Acceptance Criteria

1. THE Frontend SHALL render an About Page with a luxury hero banner, company history section, and brand philosophy section.
2. THE Frontend SHALL display the company's core values using animated icon cards with Framer_Motion scroll-triggered animations.
3. THE Frontend SHALL render a section highlighting the founder's vision with a brief introduction and a link to the Founder Profile Page at `/founder`.

---

### Requirement 11: Founder Profile Page

**User Story:** As a Visitor, I want to learn about the founder JAY MEHTA, so that I can understand the leadership and credibility behind the brand.

#### Acceptance Criteria

1. THE Frontend SHALL render a Founder Profile Page dedicated to JAY MEHTA with a premium animated profile layout including a profile image, name, title, and biography.
2. THE Frontend SHALL display the founder's professional achievements, vision statement, and personal philosophy using Framer_Motion entrance animations.
3. THE Frontend SHALL render a contact/connect section with links to the founder's professional social profiles and a WhatsApp contact button.

---

### Requirement 12: Property Listing Page

**User Story:** As a Visitor, I want to browse and filter properties, so that I can find listings that match my requirements.

#### Acceptance Criteria

1. THE Frontend SHALL render a Property Listing Page that fetches data from `GET /api/properties` and displays results as a grid of `Property_Card` components.
2. THE Frontend SHALL render a `Search_Filter` panel with filter controls for `type` (dropdown: Apartment, Villa, Plot, Commercial, Penthouse), `minPrice` and `maxPrice` (numeric inputs), `configuration` (text input), and `status` (dropdown: Available, Sold, Under Construction).
3. WHEN a Visitor changes a filter value, THE Frontend SHALL update the API query parameters and re-fetch the property list without a full page reload.
4. THE Frontend SHALL implement pagination controls that allow Visitors to navigate between pages of results, fetching the corresponding page from the Backend.
5. WHEN the property list is loading, THE Frontend SHALL display skeleton loader placeholders.
6. IF no properties match the applied filters, THEN THE Frontend SHALL display a message: `"No properties found matching your criteria"`.
7. THE Frontend SHALL display each `Property_Card` with the property name, location, type, price (formatted in Indian Rupee notation), configuration, status badge, and primary image.

---

### Requirement 13: Property Detail Page

**User Story:** As a Visitor, I want to view comprehensive details about a property, so that I can make an informed inquiry or purchase decision.

#### Acceptance Criteria

1. THE Frontend SHALL render a Property Detail Page that fetches data from `GET /api/properties/:id` using the route parameter and displays all Property fields.
2. THE Frontend SHALL render an image gallery with the ability to view all Property images, supporting a lightbox or full-screen view on click.
3. THE Frontend SHALL render an Amenities section listing all amenities as styled icon-label pairs.
4. THE Frontend SHALL render a Nearby Places section listing all nearby places.
5. THE Frontend SHALL render an embedded Google Maps iframe using the Property's `mapCoordinates` (`lat` and `lng`) to display the property location.
6. THE Frontend SHALL render an `Inquiry_Form` pre-populated with the Property name and `propertyId`, allowing Visitors to submit an inquiry via `POST /api/inquiries`.
7. WHEN an inquiry is successfully submitted, THE Frontend SHALL display a success confirmation message and reset the `Inquiry_Form`.
8. IF the `GET /api/properties/:id` API call returns HTTP 404, THEN THE Frontend SHALL display a styled "Property Not Found" message and a link back to `/properties`.

---

### Requirement 14: Contact Page

**User Story:** As a Visitor, I want multiple ways to contact the company, so that I can reach out through my preferred channel.

#### Acceptance Criteria

1. THE Frontend SHALL render a Contact Page with a general `Inquiry_Form` (without a pre-populated `propertyId`) that submits to `POST /api/inquiries`.
2. THE Frontend SHALL display a WhatsApp contact button that opens a WhatsApp chat link (`https://wa.me/<number>`) in a new browser tab.
3. THE Frontend SHALL render an embedded Google Maps iframe showing the company's office location.
4. THE Frontend SHALL display social media links (Instagram, Facebook, LinkedIn, YouTube) as styled icon buttons opening in new browser tabs.
5. THE Frontend SHALL display the company's phone number, email address, and physical address in a styled contact information card.

---

### Requirement 15: Admin Authentication (Frontend)

**User Story:** As an Admin, I want a secure login page, so that I can access the Admin Dashboard.

#### Acceptance Criteria

1. THE Frontend SHALL render an `/admin/login` page with email and password input fields and a submit button.
2. WHEN the Admin submits valid credentials, THE Frontend SHALL call `POST /api/auth/login`, store the returned JWT in `localStorage`, and redirect to `/admin/dashboard`.
3. IF the login API call returns HTTP 401, THEN THE Frontend SHALL display the error message returned by the Backend below the login form.
4. THE Frontend SHALL implement a protected route wrapper that reads the JWT from `localStorage` and redirects unauthenticated users from any `/admin/*` route to `/admin/login`.
5. THE Frontend SHALL provide a logout button in the Admin Dashboard that clears the JWT from `localStorage` and redirects to `/admin/login`.

---

### Requirement 16: Admin Dashboard

**User Story:** As an Admin, I want a comprehensive dashboard, so that I can manage properties, inquiries, and testimonials from a single interface.

#### Acceptance Criteria

1. THE Frontend SHALL render an Admin Dashboard at `/admin/dashboard` with analytics cards displaying: total number of Properties, total number of Inquiries, number of new (unread) Inquiries, and total number of Testimonials.
2. THE Frontend SHALL render a Properties management section at `/admin/properties` with a table listing all Properties, and action buttons to Edit or Delete each Property.
3. THE Frontend SHALL render an Add Property form at `/admin/properties/add` with input fields for all `Property` model fields, including an image upload control that calls `POST /api/upload` and stores the returned Cloudinary URLs.
4. THE Frontend SHALL render an Edit Property form at `/admin/properties/edit/:id` pre-populated with the existing Property data, allowing the Admin to update any field and save via `PUT /api/properties/:id`.
5. WHEN an Admin clicks Delete on a Property, THE Frontend SHALL display a confirmation dialog before calling `DELETE /api/properties/:id`.
6. THE Frontend SHALL render an Inquiries management section at `/admin/inquiries` with a table listing all Inquiries, showing `name`, `email`, `phone`, `message`, `propertyId` (if present), `status`, and `createdAt`.
7. THE Frontend SHALL allow the Admin to update the `status` of an Inquiry (New → Contacted → Closed) via a dropdown in the Inquiries table, calling `PUT /api/inquiries/:id`.
8. THE Frontend SHALL render a Testimonials management section at `/admin/testimonials` allowing the Admin to add new Testimonials and delete existing ones.

---

### Requirement 17: UI Design System and Styling

**User Story:** As a Visitor, I want a consistent ultra-premium luxury visual experience, so that the brand feels credible and aspirational.

#### Acceptance Criteria

1. THE Frontend SHALL apply a dark luxury color palette as the base theme, using deep blacks and dark grays (`#0a0a0a`, `#111111`, `#1a1a1a`) as background colors.
2. THE Frontend SHALL use orange/Bhagwa (`#FF6B00`, `#FF8C00`) as the primary accent color and gold (`#D4AF37`, `#FFD700`) as the secondary highlight color for headings, borders, and decorative elements.
3. THE Frontend SHALL apply glassmorphism effects (semi-transparent backgrounds with `backdrop-filter: blur`) to cards, modals, and the Navbar.
4. THE Frontend SHALL use premium serif or display fonts for headings and a clean sans-serif font for body text, loaded via Google Fonts.
5. THE Frontend SHALL implement Framer_Motion animations for: page transitions, scroll-triggered section reveals, Property_Card hover effects, Hero Section entrance animation, and counter animations on the Home Page.
6. THE Frontend SHALL be fully responsive using Tailwind CSS breakpoints, with a mobile-first layout that adapts gracefully from 320px to 1920px viewport widths.
7. THE Frontend SHALL display a luxury loading animation (spinner or logo reveal) while the application initializes or during API data fetching.
8. THE Frontend SHALL render a sticky Navbar with a glassmorphism background that becomes more opaque on scroll.
9. THE Frontend SHALL render a modern Footer with the company logo, tagline, navigation links, social media icons, and copyright notice.

---

### Requirement 18: API Communication and Error Handling

**User Story:** As a developer, I want consistent API communication patterns and error handling, so that the application is robust and user-friendly under failure conditions.

#### Acceptance Criteria

1. THE Frontend SHALL use Axios with a configured base URL pointing to the Backend API for all HTTP requests.
2. THE Frontend SHALL include an Axios request interceptor that automatically attaches the JWT from `localStorage` as the `Authorization: Bearer <token>` header on all requests to protected endpoints.
3. THE Frontend SHALL include an Axios response interceptor that handles HTTP 401 responses by clearing the JWT from `localStorage` and redirecting the user to `/admin/login`.
4. WHEN any API call fails with a network error, THE Frontend SHALL display a user-friendly error notification (toast or inline message) without exposing raw error details to the Visitor.
5. THE Backend SHALL return all error responses in a consistent JSON format: `{ "success": false, "message": "<descriptive error message>" }`.
6. THE Backend SHALL return all success responses in a consistent JSON format: `{ "success": true, "data": <payload> }`.

---

### Requirement 19: Security and Performance

**User Story:** As a developer, I want the application to follow security best practices and perform efficiently, so that it is production-ready.

#### Acceptance Criteria

1. THE Backend SHALL use `helmet` middleware to set secure HTTP headers on all responses.
2. THE Backend SHALL use `cors` middleware configured to allow requests only from the Frontend's origin domain.
3. THE Backend SHALL use `express-rate-limit` middleware to limit requests to the `POST /api/auth/login` endpoint to 10 requests per 15-minute window per IP address.
4. THE Backend SHALL sanitize all user-supplied input fields in `POST` and `PUT` request bodies to prevent NoSQL injection attacks.
5. THE Frontend SHALL lazy-load React route components using `React.lazy` and `Suspense` to reduce the initial bundle size.
6. THE Frontend SHALL use Cloudinary's image transformation URLs to serve optimized, appropriately-sized images for different viewport sizes.
7. THE Backend SHALL enable MongoDB connection pooling via Mongoose's default connection pool settings.
