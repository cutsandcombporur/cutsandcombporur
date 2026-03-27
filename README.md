# Cuts & Comb Salon Website

A modern, mobile-first website for Cuts & Comb luxury grooming salon in Porur, Chennai.

## Features

- 📱 Mobile-first responsive design
- ⚡ Fast performance with Vite
- 🎨 Beautiful UI with Tailwind CSS
- 🔄 Client-side routing with React Router
- 💬 WhatsApp integration for easy contact
- 📅 Online booking system integration
- 🖼️ Gallery with before/after transformations
- 📍 Google Maps integration

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Code Quality**: ESLint + Prettier

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components
│   └── layout/          # Layout components (Navigation, Footer)
├── pages/               # Page components
├── data/                # JSON data files
├── utils/               # Utility functions
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## Environment Variables

See `.env.example` for all available environment variables:

- `VITE_BOOKING_URL` - Booking system URL
- `VITE_PHONE_NUMBER` - Contact phone number
- `VITE_WHATSAPP_NUMBER` - WhatsApp number with country code
- `VITE_INSTAGRAM_URL` - Instagram profile URL
- `VITE_FACEBOOK_URL` - Facebook profile URL
- `VITE_GOOGLE_MAPS_EMBED_URL` - Google Maps embed URL

## Deployment

Build the project:

```bash
npm run build
```

The `dist` folder will contain the production-ready files. Deploy to:

- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

## License

Private - All rights reserved
