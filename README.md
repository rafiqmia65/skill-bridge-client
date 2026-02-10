# SkillBridge Frontend 🎓

[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.0-black)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3.3-teal)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blueviolet)](https://www.typescriptlang.org/)

---

## 🌟 Project Overview

**SkillBridge** is a modern, full-stack tutoring platform frontend built with **Next.js**, **Tailwind CSS**, and **TypeScript**.  
It allows students to browse tutors, book sessions, and manage their dashboard. Tutors can manage profiles, availability, and sessions. Admins can oversee users and bookings.

---

## 📌 Features

### Public Features

- Browse and search tutors by subjects, rating, and price
- Filter tutors by category
- View tutor profiles with details and reviews
- Landing page with featured tutors

### Student Features

- Register/login as student
- Book tutoring sessions
- View upcoming and past bookings
- Leave reviews
- Manage profile

### Tutor Features

- Register/login as tutor
- Create/update tutor profile
- Set availability slots
- View teaching sessions and ratings

### Admin Features

- View all users (students and tutors)
- Manage user status (ban/unban)
- View all bookings
- Manage categories

---

## 🗂️ Pages & Routes

### Public Routes

| Route         | Page          | Description                   |
| ------------- | ------------- | ----------------------------- |
| `/`           | Home          | Hero, search, featured tutors |
| `/tutors`     | Browse Tutors | List with filters             |
| `/tutors/:id` | Tutor Profile | Details, reviews, book        |
| `/login`      | Login         | User login form               |
| `/register`   | Register      | User registration form        |

### Student Routes (Private)

| Route                 | Page        | Description        |
| --------------------- | ----------- | ------------------ |
| `/dashboard`          | Dashboard   | Overview, bookings |
| `/dashboard/bookings` | My Bookings | Booking history    |
| `/dashboard/profile`  | Profile     | Edit student info  |

### Tutor Routes (Private)

| Route                 | Page         | Description     |
| --------------------- | ------------ | --------------- |
| `/tutor/dashboard`    | Dashboard    | Sessions, stats |
| `/tutor/availability` | Availability | Set time slots  |
| `/tutor/profile`      | Profile      | Edit tutor info |

### Admin Routes (Private)

| Route               | Page       | Description       |
| ------------------- | ---------- | ----------------- |
| `/admin`            | Dashboard  | Statistics        |
| `/admin/users`      | Users      | Manage users      |
| `/admin/bookings`   | Bookings   | All bookings      |
| `/admin/categories` | Categories | Manage categories |

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS 3
- **State Management**: React Query / TanStack Query
- **Authentication**: JWT + Firebase (or backend session)
- **HTTP Requests**: Fetch API / Axios
- **Icons**: Lucide / Heroicons
- **Form Handling**: React Hook Form
- **Notifications**: react-hot-toast
- **Animations**: Tailwind + Framer Motion

---

## 🔗 API Integration

### Endpoints Used

- **Auth**: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`
- **Tutors**: `/api/tutors`, `/api/tutors/:id`, `/api/categories`
- **Bookings**: `/api/bookings`, `/api/bookings/:id`
- **Student Profile**: `/api/student/profile`, `/api/student/updateProfile`
- **Tutor Management**: `/api/tutor/profile`, `/api/tutor/availability`
- **Reviews**: `/api/reviews`

> All API requests include **Authorization header** with bearer token and use **credentials: include** for cookies.

---

## ⚙️ Setup & Installation

1. **Clone repository**

```bash
git clone https://github.com/rafiqmia65/skill-bridge-client.git
cd skill-bridge-client
```

````

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Create `.env.local`**

```env
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000
```

4. **Run dev server**

```bash
npm run dev
# or
yarn dev
```

5. **Open in browser**

```
http://localhost:3000
```

---

## 💡 Conventions & Best Practices

- **Typescript interfaces** for API responses (`StudentProfile`, `Booking`, `TutorProfile`)
- **Service layer** for API calls (`studentProfileService`, `bookingService`)
- **Reusable components** for loading, error, profile cards, tables
- **Next.js Default fetch system** for data fetching and caching

---

## 📦 Project Structure

```
/app
  /dashboard
    page.tsx
    ProfileCard/
    BookingsTable/
  /tutors
    [id].tsx
/services
  student/
    studentProfile.service.ts
  booking/
    booking.service.ts
/components
  common/
    LoadingPage.tsx
    ErrorPage.tsx
/public
  default-avatar.png
```

---

## 🌟 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add feature"`
4. Push: `git push origin feature/your-feature`
5. Create a Pull Request

---

## 📄 License

[MIT License](LICENSE)
````
