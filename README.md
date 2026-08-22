# Zenix Food Worx — Premium Food Safety & Compliance Portal

A clean, modern, and business-focused frontend web application for **Zenix Food Worx**, a premier food industry consultancy offering regulatory, compliance, testing, and setups guidance.

This is a frontend-only application built using React, TypeScript, Vite, Framer Motion, and Tailwind CSS. All interactive features are powered by structured local data structures.

---

## 🛠️ Technology Stack

- **Framework**: [React](https://reactjs.org/) (v18)
- **Tooling**: [Vite](https://vitejs.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/en/main) (v6)

---

## ✨ Features Checklist

### 1. Service Finder & Questionnaire Wizard (`/service-finder`)
- Multi-step questionnaire to map a client's business type, development stage, requirements, and urgency.
- Real-time matching logic that outputs recommendations complete with priority scores, status badges, and reasons.
- Connects directly to the consulting contact form.

### 2. Compare Services Matrix (`/compare-services`)
- Side-by-side comparison matrix covering compliance, licensing requirements, standard timelines, scope parameters, and deliverables.
- Dynamic filters to choose specific services to inspect.

### 3. Dynamic Service Detail Hub (`/services/:slug`)
- Custom detailed landing pages for each service, showing processes, benefits, checklists, target audiences, and process details.
- Contextual WhatsApp/consultation buttons pre-filled with specific service request message strings.
- Interactive FAQ accordions and related/complementary service links.

### 4. Interactive Business Journey (`/`)
- Interactive curved visual path representing the food product lifecycle from **Idea** to **Ongoing Compliance**.
- Displays stage-specific services and detail breakdowns as the traveler progresses.

### 5. Need Help Selection (`/`)
- Responsive cards displaying standard pathways (e.g., FSSAI, testing, setting up factory) that link directly to detail pages.

### 6. Mobile Optimization
- **Sticky Bottom Action Bar**: Appears on mobile viewports for quick WhatsApp and consultation triggers.
- Safe-area margins (`pb-safe-bottom`) for iOS layout compatibility.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation

1. Install package dependencies:
   ```bash
   npm install
   ```

2. Run the local development server:
   ```bash
   npm run dev
   ```
   The application will be served locally at `http://localhost:5173`.

### Build & Deploy

To generate optimized production build assets inside the `dist/` directory:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```