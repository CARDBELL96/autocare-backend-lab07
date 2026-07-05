# AUTOCARE-BACKEND

A Clean Architecture backend application for managing assets in an autocare system.

## Architecture

This project follows Clean Architecture principles with the following layers:

- **Domain**: Contains business entities, repository interfaces, and domain services.
- **Application**: Contains use cases and data transfer objects (DTOs).
- **Infrastructure**: Contains database connections, repository implementations, and external services like PDF generation.
- **Adapters**: Contains controllers and routes for the web API.

## Features

- Update asset status
- Generate maintenance reports in PDF format
- Retrieve all assets

## Setup

1. Install dependencies:

   npm install

2. Set up your SQL Server database and update the configuration in `src/infrastructure/database/sqlserver.config.ts`.

3. Create the Assets table:

   CREATE TABLE Assets (
     id VARCHAR(50) PRIMARY KEY,
     name VARCHAR(100),
     status VARCHAR(20),
     location VARCHAR(100),
     purchaseDate DATETIME
   );

4. Run the application:

   npm run dev

## API Endpoints

- PUT /api/assets/:id/status - Update asset status
- GET /api/assets - Get all assets
- GET /api/reports/maintenance - Generate maintenance report

## Testing

npm test