# JewelleryStore

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.6.

## Tech Stack

### Frontend
| Tech | Usage |
|------|-------|
| Angular (Standalone) | SPA Framework |
| Tailwind CSS | Styling |
| Angular FormsModule | Two-way data binding |
| Angular HttpClient | REST API calls |

---

## Project Structure

```
src/
├── app/
│   ├── app.ts               # Main component — logic for CRUD, filter, sort, price calculation
│   ├── app.html             # Template — grid, modal, snackbar
│   └── services/
│       └── jewelleryService.ts   # HTTP service for all API calls
```

---

## Setup & Installation

### Prerequisites
- Node.js & npm
- Angular CLI

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. 
The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.
