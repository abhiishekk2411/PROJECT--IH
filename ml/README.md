# FasalNirnay — ML Module

This folder is reserved for a future Python-based ML forecasting module.

## Planned Purpose

- Price trend forecasting using historical mandi data
- Potentially XGBoost / scikit-learn based
- Exposed as a clean API for the Node.js backend to consume

## Current Approach (MVP)

The MVP uses a simple Node.js trend analysis module in the backend:
- Percentage change over recent period
- 7-day moving average direction
- Classification: Increasing / Stable / Decreasing

This will only be replaced by a proper ML model after the MVP is stable.

## Status

Not yet implemented.
