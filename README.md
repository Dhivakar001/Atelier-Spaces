# Atelier Spaces — Architectural Design & Curation Studio

Atelier Spaces is a highly specialized, design-to-build laboratory directed by Sophia Sen. This digital studio coordinates the transformation of raw structural shells into unified, minimalist sanctuaries—combining ancient solar alignment principles with contemporary monolithic forms.

Built with React 19, Tailwind CSS v4, and Motion, the platform provides a highly polished, interactive, and responsive experience for luxury estate owners, boutique hoteliers, and design collectors.

---

## 🏛️ The Problem, The Solution & Who We Serve

### The Problem: Fragmented Spatial Journeys
Traditional spatial and architectural workflows are severely fractured. Visionary clients are often left managing disconnected parties—ranging from disparate material suppliers and builders to interior decorators with divergent visions. This fragmentation compromises structural integrity, light optimization, and the authentic truth of raw materials, leaving the finished space lacking harmony.

### Our Solution: Unified Monolithic Curation
Atelier Spaces offers an integrated design-to-curate ecosystem. We steward your physical footprint from raw concrete columns up to final material placement. By overseeing the entire process, we restore:
* **Material Truth:** Utilizing unfilled Italian travertine, dark-aged rift oak, Western Ghats basalt rock, and brushed brass.
* **Solar Alignment:** Calibrating sightlines and natural light tracking across all seasons.
* **Quiet Luxury:** Eliminating superficial decoration to invite visual quietness, volumetric balance, and a sense of meditative safety.

### Who We Serve: The Discerning Collector
Our studio works exclusively with luxury estate owners, boutique hoteliers, and premium brand directors who recognize that authentic elegance whispers. To guarantee absolute precision and attention to detail, we cap active studio commissions to exactly six (6) projects at any given time.

---

## ⚡ Key Interactive Experiences & Features

### 1. Compelling Studio Overview
Located immediately beneath the hero fold, this module clearly communicates the core value proposition and presents three **Diagnostic Pathways** for primary user interaction:
* **Explore Works:** Deep-dive into our live archive of completed villas, penthouses, and showrooms.
* **View Comparison:** Analyze before/after transformations of physical sites.
* **Initiate Booking:** Query the active scheduling ledger for director briefings.

### 2. Interactive Before/After Material Slider
A custom-engineered slider component (`BeforeAfter.tsx`) that allows visitors to drag an interactive divider across high-resolution imagery. This visually reveals the dramatic transition of a space from a cold, industrial concrete skeleton to an organic, finished cedar-clad minimalist sanctuary.

### 3. Curated Selected Works Gallery (with Search & Diagnostics)
The Portfolio Showcase (`Showcase.tsx`) is designed with an organic, alternating grid rhythm and provides robust client-side search capabilities:
* **Category Filters:** Toggle between categories like *Villas*, *Penthouses*, and *Showrooms & Courts*.
* **Fuzzy Keyword Search:** Real-time search across locations, materials (e.g., travertine, cedar, limestone), and concepts.
* **Skeleton Loaders:** Simulates real-time database queries with luxurious, shimmer-effect drafting grids and crosshair alignments.
* **Diagnostic Deck:** Allows testing of dynamic states, including an **Empty Search Canvas** and a **Network Fault Ledger simulation** (to inspect visual fault treatments).
* **Magazine Drawer Modals:** Clicking any project slides out a full-height, editorial detail card containing concept summaries, dimensions, structural coordinates, and material breakdowns.

### 4. Interactive Inquiry Ledger & Diagnostic Booking
The Consultation Booking Module (`Consultation.tsx`) features a high-fidelity simulation of an inquiry submission:
* **Interactive Sandbox Controller:** Toggle an elegant failure switch to simulate a "seasonal commission limit overflow" (Registry lockout).
* **Step-by-step Telemetry:** Watch the system programmatically check estate boundaries, sun paths, and register Sophia Sen's active seasonal agenda in real-time.
* **Copper-Ticket Generation:** On successful verification, the client receives a bespoke reservation ticket complete with a printable copper layout layout and a unique reservation reference ID (`ATL-XXXXXX`).

### 5. Sovereign Balance Recovery (ErrorBoundary)
Our customized React `ErrorBoundary` intercepts unexpected layout constraints and displays an elegant compass alignment graphic, giving developers or visitors the ability to recalibrate the structural viewport smoothly without page freezes.

---

## 🎨 Aesthetic Styling & Visual Identity

The interface is styled under a **"Warm Editorial Minimalist"** identity:
* **Typography:** Elegant serif typography paired with strict, technical monospaced telemetry data lines.
* **Color Palette:** Warm off-white canvases (`#FAF8F5`), soft sandstone clays (`#D9D4CD`), deep charcoal text (`#1A1A1A`), and refined metallic copper/beige highlights.
* **Transitions:** Smooth, natural spring mechanics (`motion/react`) for route sliding, hover scales, and fade-in entrances.
* **Architectural Details:** Fine corner-ticks, grid lines, and subtle alignment crosshairs resembling a physical blueprint.

---

## 🛠️ Technology Stack

* **Framework:** React 19 (Functional Components, Hooks)
* **Build Tool:** Vite 6
* **Styling:** Tailwind CSS v4 (with native Vite plugin integrations)
* **Animations:** Motion (previously Framer Motion)
* **Icons:** Lucide React
* **Type System:** TypeScript (Strict checking, full interface schemas)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and npm installed on your machine.

### 1. Installation
Clone or navigate to the project directory and install the necessary dependencies:
```bash
npm install
```

### 2. Development Server
Start the local Vite development server:
```bash
npm run dev
```
The application will launch on port `3000` and will be accessible at:
* Local: `http://localhost:3000`
* Network: `http://0.0.0.0:3000`

### 3. Production Build
To build the application for production deployment (generates optimized assets under `dist/`):
```bash
npm run build
```

### 4. Local Preview
Preview the production build locally:
```bash
npm run preview
```

### 5. Lint Verification
To run TypeScript strict checks and ensure correct type safety across all files:
```bash
npm run lint
```

---

*“True luxury is a quiet conversation between light, space, and raw material truth.” — Sophia Sen, Director*
