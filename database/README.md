# FasalNirnay — Database

This folder will contain MongoDB schema documentation and seed data.

## Planned Structure

```
database/
├── schemas/             → Schema documentation (markdown)
│   ├── farmer.schema.md
│   ├── cropLot.schema.md
│   ├── mandi.schema.md
│   ├── marketPrice.schema.md
│   ├── weatherSnapshot.schema.md
│   └── decision.schema.md
│
├── seed/                → Seed data for development/demo
│   ├── mandis.json
│   ├── marketPrices.json
│   └── historicalPrices.json
│
└── README.md
```

## Status

Not yet implemented. The frontend currently uses mock data defined in `frontend/src/data/mockData.js`.
