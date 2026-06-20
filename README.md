# SheetOptimi Frontend

Sheet material cutting optimizer and ERP — React + TypeScript + Vite.

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:5173 and log in with any email + any password (6+ chars).

## Folder structure

```
src/
  app/           # App, router, providers
  components/
    ui/          # Generic primitives (Button, Input, Modal, Table, Badge, …)
    layout/      # AppShell, Sidebar, Topbar, MobileNav, PageHeader
  features/      # One folder per domain (auth, dashboard, optimizer, …)
  hooks/         # useMediaQuery, useDisclosure, useDebounce
  lib/
    api/         # client.ts (mock API), mockData.ts (seed data)
    optimizer.ts # Guillotine bin-packing algorithm
    utils.ts     # cn(), formatters
    constants.ts # Materials, thickness options, color maps
  stores/        # uiStore (sidebar/theme), brandingStore (white-label)
  types/         # TypeScript interfaces for all entities
```

## Swapping mock data for a real API

All data functions are in `src/lib/api/client.ts`. Each function (e.g. `getProjects()`) currently reads from `mockData.ts`. To wire a real FastAPI backend:

1. Replace the function bodies with `fetch` calls to `VITE_API_BASE_URL`.
2. Copy `.env.example` → `.env.local` and set `VITE_API_BASE_URL`.
3. No other files need to change — React Query hooks in each feature's `hooks/` folder call these API functions.

## Branding / customization system

The `brandingStore` (Zustand, persisted to localStorage) holds `appName`, `primaryColor`, `logoUrl`, and more. Changing `primaryColor` calls `document.documentElement.style.setProperty('--color-primary', …)`, updating the entire UI instantly without a rebuild. The **Settings → Branding** page exposes all controls with a live preview.

## Optimizer algorithm

`src/lib/optimizer.ts` implements a guillotine-cut First-Fit Decreasing algorithm:
- Panels sorted by area (largest first)
- Each sheet tracked as a list of free rectangles
- Placed panel splits the used free rect into two remainders (right + top)
- Optional rotation attempted when normal orientation doesn't fit

**DXF parsing** is stubbed in `DxfUploadZone.tsx` — see the TODO comment there for the expected `parseDxfPanels(file): Promise<Panel[]>` interface.

**PDF export** and **save offcuts** buttons are integration points noted in `OptimizationResults.tsx`.

## Integration points summary

| Feature | Status | Note |
|---|---|---|
| DXF parsing | Stub | Wire `dxf-parser` npm pkg or backend endpoint |
| PDF export | UI only | POST `/api/v1/optimizer/export/pdf` |
| Save offcuts | UI only | POST `/api/v1/offcuts` |
| Real auth | Mock JWT | Replace `authStore.login()` with real token flow |
| All CRUD | Mock data | Replace `lib/api/client.ts` functions |
