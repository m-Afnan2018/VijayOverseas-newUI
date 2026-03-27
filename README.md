# Vijay Overseas — Full-Stack Application

A complete MERN stack application for Vijay Overseas, an exporter of premium GI-tagged Indian agricultural products.

## Repository Structure

```
VijayOverseas-newUI/
├── client/          # Next.js public-facing website (existing)
├── server/          # Node.js + Express + MongoDB backend (new)
├── admin/           # Next.js admin panel (new)
└── .env.example     # Root env reference
```

---

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1 — Backend Setup

```bash
cd server
cp .env.example .env
# Edit .env — set MONGODB_URI, JWT_SECRET
npm install
npm run seed       # populate with demo data
npm run dev        # starts on http://localhost:5000
```

Default admin credentials (from seed):
- Email: `admin@vijayoverseas.com`
- Password: `Admin@1234`

### 2 — Admin Panel Setup

```bash
cd admin
cp .env.example .env.local
# NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
npm install
npm run dev        # starts on http://localhost:3001
```

### 3 — Frontend Setup

```bash
cd client
# Add to .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
npm install
npm run dev        # starts on http://localhost:3000
```

---

## Backend API Reference

Base URL: `http://localhost:5000/api/v1`

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/auth/login` | Admin login → returns JWT |
| GET | `/auth/me` | Current admin (protected) |
| POST | `/auth/logout` | Clear auth cookie |

### Resources (all 5 collections)
Each resource supports full CRUD:

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/notices` | — | List with pagination + search |
| GET | `/notices/active` | — | Active notices for frontend |
| GET | `/notices/:id` | — | Single notice |
| POST | `/notices` | ✓ | Create |
| PUT | `/notices/:id` | ✓ | Update |
| DELETE | `/notices/:id` | ✓ | Delete |

Same pattern applies to: `/categories`, `/products`, `/blogs`, `/testimonials`

### Upload
| Method | Route | Auth |
|--------|-------|------|
| POST | `/upload` | ✓ | Single image |
| POST | `/upload/multiple` | ✓ | Up to 10 images |

Static files served at: `http://localhost:5000/uploads/<filename>`

### Query Parameters (all list routes)
- `?page=1&limit=10` — pagination
- `?search=keyword` — full-text search
- `?isActive=true` — filter by active status
- `?isFeatured=true` — filter featured products (products only)
- `?productType=Agricultural+Product` — filter by type (products only)
- `?isPublished=true` — filter published blogs (blogs only)

---

## Admin Panel

URL: `http://localhost:3001`

### Features
- **Dashboard** — count cards for all resources + recent activity tables + quick-add buttons
- **Notices** — CRUD with type badges (info/warning/urgent), date range, auto-hide config
- **Categories** — CRUD with image upload, display order, slug auto-generation
- **Products** — CRUD with multi-image upload, rich text editor, SEO fields, GI metadata
- **Blogs** — CRUD with TipTap rich text editor, cover image, tags, publish toggle
- **Testimonials** — CRUD with avatar upload, star rating, display order

### Design System
Matches the public frontend exactly:
- Primary: `#00b8c8` (teal)
- Dark sidebar: `#1a0a00` (dark brown)
- Font: Poppins (body)
- Border radius: 8px
- JWT auth via httpOnly cookie + localStorage fallback

---

## Environment Variables

### server/.env
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/vijay-overseas
JWT_SECRET=<random-256-bit-string>
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIRES_IN=7
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
ADMIN_EMAIL=admin@vijayoverseas.com
ADMIN_PASSWORD=Admin@1234
```

### admin/.env.local
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

### client/.env.local
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

---

## Database Models

| Model | Key Fields |
|-------|-----------|
| **Notice** | title, message, type (info/warning/urgent), isActive, startDate, endDate, autoHideMs |
| **Category** | name, slug (auto), description, image, isActive, order |
| **Product** | name, slug (auto), category (ref), description, richDescription, images[], price, unit, origin, region, giYear, sku, rating, status, isActive, isFeatured, tags[], seoTitle, seoDescription, productType |
| **Blog** | title, slug (auto), coverImage, excerpt, content (HTML), author, tags[], categories[], isPublished, publishedAt, readTime (auto), seoTitle, seoDescription |
| **Testimonial** | name, designation, company, avatar, message, rating (1–5), isActive, order |
| **Admin** | name, email, password (bcrypt), role (admin/superadmin), isActive, lastLogin |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, CSS Modules, React |
| Admin | Next.js 15, TipTap, React Hot Toast, Axios |
| Backend | Node.js, Express 5, MongoDB, Mongoose |
| Auth | JWT, bcryptjs, httpOnly cookies |
| Upload | Multer (disk storage) |
| Validation | express-validator |
