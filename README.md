# FasalNirnay

**Right Crop. Right Market. Right Decision.**

FasalNirnay is an AI-powered farmer market decision assistant that helps farmers decide **where** and **when** to sell their crops by comparing expected net returns across nearby mandis.

## Project Structure

```
fasalnirnay/
├── frontend/      → React + Vite frontend application
├── backend/       → Node.js + Express backend (coming soon)
├── database/      → MongoDB schemas and seed data (coming soon)
├── ml/            → ML forecasting module (future)
├── docs/          → Project documentation
├── .gitignore
└── README.md
```

## Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Core Concept

The farmer provides:
- Crop, Quantity, Variety, Location, Crop Image

The system compares nearby mandis considering:
- Current mandi price
- Historical price trend
- Distance & transport cost
- Weather risk
- Crop quality/disease risk

And produces:
- Ranked mandis by expected net return
- Sell now vs wait recommendation
- Clear explanation of the recommendation

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React, Vite, Tailwind CSS, Recharts |
| Backend    | Node.js, Express.js                 |
| Database   | MongoDB Atlas                       |
| AI         | Gemini Text + Vision API            |
| Maps       | Nominatim, OSRM                     |
| Weather    | OpenWeatherMap                      |

## License

Internal hackathon project — SIH 2026 selection.
