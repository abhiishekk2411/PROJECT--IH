# FasalNirnay — Backend

This folder will contain the Node.js + Express.js backend.

## Planned Structure

```
backend/
└── src/
    ├── config/          → Environment & DB configuration
    ├── routes/          → Express route definitions
    ├── controllers/     → HTTP request handlers
    ├── services/        → Business logic & external API integrations
    │   ├── gemini/      → Gemini Text & Vision services
    │   ├── market/      → Agmarknet market data service
    │   ├── weather/     → OpenWeatherMap service
    │   ├── maps/        → Nominatim & OSRM distance service
    │   ├── voice/       → STT & TTS services
    │   └── decision/    → Decision Engine (deterministic ranking)
    ├── models/          → Mongoose models
    ├── middleware/       → Error handling, auth, etc.
    ├── utils/           → Calculations, risk scoring, validation
    └── server.js        → Entry point
```

## Status

Not yet implemented. The frontend currently uses mock data.
