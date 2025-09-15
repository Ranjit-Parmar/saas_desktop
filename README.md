# SaaS Contracts Dashboard - UI/UX Developer Assignment

A React + Tailwind SPA simulating a SaaS contracts management dashboard. This project demonstrates modern UI design, state management with Context API, and a smooth, interactive user experience.

---

## Features

- **Login Page**
  - Username + password fields
  - Mock authentication (any username, password must be `test123`)
  - Saves mock JWT in localStorage and navigates to dashboard

- **Contracts Dashboard**
  - Responsive layout with sidebar (Contracts, Insights, Reports, Settings) and topbar (user profile dropdown)
  - Contracts table with columns: Contract Name, Parties, Expiry Date, Status, Risk Score
  - Search and filter functionality
  - Pagination (10 rows per page)
  - Loading, empty, and error states

- **Contract Detail Page**
  - Metadata: title, parties, start & expiry dates, status, risk score
  - Clauses section: cards with title, summary, confidence score
  - AI Insights section: list of risks & recommendations with severity labels
  - Evidence panel: side drawer with retrieved snippets and relevance scores

- **Upload Modal**
  - Drag & drop or browse to upload files
  - File list with status: Uploading, Success, Error
  - Simulated upload with timeout (no backend required)

---

## Tech Stack

- **React** (functional components & hooks)
- **Tailwind CSS**
- **State Management**: Context API
- **Routing**: React Router v6
- **Deployment**: Vercel / Netlify
- **Code Repository**: Public GitHub with this README

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Ranjit-Parmar/saas_desktop.git
cd saas_desktop
