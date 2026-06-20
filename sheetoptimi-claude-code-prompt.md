## PROMPT START

I want to build the frontend for **SheetOptimi** — a sheet material cutting optimizer and ERP web application. Build a complete, production-quality, mobile-responsive frontend using **React + TypeScript + Vite**.

### 1. Project setup

- Initialize with `npm create vite@latest . -- --template react-ts`
- Install and configure:
    - `react-router-dom` (routing)
    - `tailwindcss` (v4, with `@tailwindcss/vite` plugin) for styling
    - `zustand` for global state (auth, theme, sidebar state, branding/customization settings)
    - `@tanstack/react-query` for server state / data fetching (use mock data / mock API layer for now, structured so a real backend can be swapped in later)
    - `react-hook-form` + `zod` for forms and validation
    - `recharts` for dashboard charts and reports
    - `lucide-react` for icons
    - `clsx` + `tailwind-merge` for conditional classNames
    - `date-fns` for date formatting
- Set up `vite.config.ts` with path aliases (`@/` → `src/`)
- Set up ESLint + Prettier with sensible defaults
- Add `.env.example` with `VITE_API_BASE_URL` and `VITE_APP_NAME=SheetOptimi`

### 2. Folder structure

Use a scalable, feature-based folder structure:

```
sheetoptimi/
├── public/
│   └── favicon.svg
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── router.tsx              # all route definitions
│   │   └── providers.tsx           # QueryClientProvider, ThemeProvider, etc.
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   ├── components/
│   │   ├── ui/                     # generic reusable primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Toggle.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── Dropdown.tsx
│   │   │   └── Skeleton.tsx
│   │   └── layout/
│   │       ├── AppShell.tsx        # sidebar + topbar + content wrapper
│   │       ├── Sidebar.tsx
│   │       ├── Topbar.tsx
│   │       ├── MobileNav.tsx       # bottom nav / drawer for mobile
│   │       └── PageHeader.tsx
│   ├── features/
│   │   ├── auth/
│   │   │   ├── pages/LoginPage.tsx
│   │   │   ├── components/
│   │   │   ├── hooks/useAuth.ts
│   │   │   └── store/authStore.ts
│   │   ├── dashboard/
│   │   │   ├── pages/DashboardPage.tsx
│   │   │   └── components/
│   │   │       ├── MetricCard.tsx
│   │   │       ├── UsageChart.tsx
│   │   │       ├── MaterialDonut.tsx
│   │   │       ├── RecentProjectsTable.tsx
│   │   │       ├── PendingApprovalsList.tsx
│   │   │       └── ActivityTimeline.tsx
│   │   ├── projects/
│   │   │   ├── pages/ProjectsListPage.tsx
│   │   │   ├── pages/ProjectDetailPage.tsx
│   │   │   └── components/
│   │   ├── optimizer/
│   │   │   ├── pages/OptimizerPage.tsx
│   │   │   └── components/
│   │   │       ├── SheetConfigForm.tsx
│   │   │       ├── PanelListTable.tsx
│   │   │       ├── DxfUploadZone.tsx
│   │   │       ├── CutLayoutCanvas.tsx   # SVG/Canvas rendered cut sheets
│   │   │       └── OptimizationResults.tsx
│   │   ├── stock/
│   │   │   ├── pages/StockPage.tsx
│   │   │   ├── pages/StockInOutPage.tsx
│   │   │   └── components/
│   │   ├── offcuts/
│   │   │   ├── pages/OffcutsPage.tsx
│   │   │   └── components/
│   │   ├── sites/
│   │   │   ├── pages/SitesPage.tsx
│   │   │   └── components/
│   │   ├── approvals/
│   │   │   ├── pages/ApprovalsPage.tsx
│   │   │   └── components/
│   │   ├── quotations/
│   │   │   ├── pages/QuotationsListPage.tsx
│   │   │   ├── pages/QuotationBuilderPage.tsx
│   │   │   └── components/
│   │   ├── clients/
│   │   │   ├── pages/ClientsPage.tsx
│   │   │   └── components/
│   │   ├── reports/
│   │   │   ├── pages/ReportsPage.tsx
│   │   │   └── components/
│   │   ├── roles/
│   │   │   ├── pages/RolesPage.tsx
│   │   │   └── components/
│   │   │       ├── RoleList.tsx
│   │   │       └── PermissionMatrix.tsx
│   │   └── settings/
│   │       ├── pages/SettingsPage.tsx
│   │       └── components/
│   │           ├── BrandingSettings.tsx
│   │           ├── CompanySettings.tsx
│   │           ├── DefaultsSettings.tsx
│   │           ├── NotificationSettings.tsx
│   │           ├── UserManagementSettings.tsx
│   │           ├── IntegrationsSettings.tsx
│   │           ├── SecuritySettings.tsx
│   │           └── BackupSettings.tsx
│   ├── hooks/
│   │   ├── useMediaQuery.ts
│   │   ├── useDisclosure.ts        # modal open/close state
│   │   └── useDebounce.ts
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts           # fetch wrapper / axios instance
│   │   │   └── mockData.ts         # mock data for all entities
│   │   ├── utils.ts                # cn(), formatters, etc.
│   │   └── constants.ts
│   ├── stores/
│   │   ├── uiStore.ts              # sidebar collapsed, theme (light/dark), mobile menu state
│   │   └── brandingStore.ts        # app name, logo, brand color — persisted to localStorage
│   ├── types/
│   │   ├── project.ts
│   │   ├── panel.ts
│   │   ├── stock.ts
│   │   ├── quotation.ts
│   │   ├── user.ts
│   │   ├── role.ts
│   │   └── site.ts
│   ├── index.css                   # tailwind imports + CSS variables for theme
│   └── main.tsx
├── .env.example
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

### 3. Branding & full customization requirement

This is a **critical requirement**: the app must be fully white-label / customizable at runtime, not hardcoded.

- Create a `brandingStore.ts` (Zustand, persisted to localStorage) holding:
    - `appName: string` (default: `"SheetOptimi"`)
    - `appTagline: string` (default: `"Sheet Material Optimizer"`)
    - `logoUrl: string | null`
    - `primaryColor: string` (hex, default a blue)
    - `primaryColorLight: string` (hex, light tint for backgrounds)
    - `sidebarStyle: 'dark' | 'light' | 'brand'`
    - `companyName, companyAddress, companyPhone, companyEmail, companyWebsite, currency`
- Apply `primaryColor` and `primaryColorLight` as CSS custom properties on `:root` (e.g. `--color-primary`, `--color-primary-light`) so all Tailwind utility classes referencing them update live, app-wide, without a rebuild.
- The Settings → Branding page must let the user change app name, tagline, logo (file upload, store as base64 or object URL for now), and pick a primary color from a swatch list or custom color picker — and see the sidebar/topbar/buttons update **immediately**.
- `appName` and `logoUrl` must be reflected in: the browser tab title, the login page, and the sidebar logo area.

### 4. Design requirements

- Clean, modern, professional ERP/dashboard aesthetic — flat design, no heavy shadows or gradients, subtle borders, generous whitespace, rounded corners (8–12px).
- Support light and dark mode, toggle in the topbar, persisted in `uiStore`.
- Use a consistent design token system in `index.css` via CSS variables (background, surface, border, text-primary, text-secondary, success, warning, danger, info) that adapt for dark mode.
- Sidebar navigation grouped into sections: **Main** (Dashboard, Projects, Optimizer, Quotations), **Inventory** (Stock, Offcuts, Stock In/Out), **Management** (Sites, Approvals, Clients), **Analytics** (Reports), **System** (Roles & Permissions, Settings).
- Topbar: sidebar toggle, page title, global search, notifications bell, theme toggle, "+ New" quick-action button, user avatar menu.

### 5. Mobile responsiveness — required, not optional

- **Sidebar**: becomes a slide-over drawer on screens < 1024px, triggered by a hamburger icon in the topbar. Closes on route change or backdrop click.
- **Bottom navigation bar**: on screens < 768px, show a fixed bottom nav with 4–5 key icons (Dashboard, Projects, Optimizer, Approvals, More) as an alternative to opening the drawer for the most common actions.
- **Tables**: on mobile, either horizontally scroll within a contained wrapper OR collapse into stacked card rows (convert each table row into a card showing key fields) — prefer the card pattern for Projects, Stock, and Quotations lists on mobile.
- **Forms and modals**: modals become full-screen sheets on mobile (slide up from bottom) instead of centered dialogs.
- **Dashboard metric grid**: responsive grid that goes from 4–6 columns on desktop down to 2 columns on tablet and 1 column on small mobile.
- **Cut layout canvas/SVG**: must scale to container width and remain pinch-zoomable or at least horizontally scrollable on small screens.
- Test breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px) — use Tailwind's default breakpoint system throughout.
- Touch targets minimum 44×44px on all interactive elements on mobile.

### 6. Pages to build (each fully functional with mock data, not just static mockups)

1. **Login** — email/password form with validation (zod), "remember me", redirects to Dashboard on submit. Store a mock auth token via `authStore`.
2. **Dashboard** — metric cards (active projects, sheets in stock, avg efficiency, offcuts available, pending quotations, material saved), a usage bar chart (Recharts), a material breakdown donut chart, recent projects table, pending approvals list with inline approve/reject, recent activity timeline.
3. **Projects** — list page with search, site filter, status tabs, table (cards on mobile), and a "New Project" modal/form. Project detail page showing project info, linked panels, and a link to the Optimizer pre-loaded with that project's panels.
4. **Optimizer** — the core feature:
    - Sheet configuration form (material, thickness, sheet width/height, kerf, edge margin)
    - Panel list table with add/remove/edit, manual entry form
    - DXF file upload zone (drag & drop, accept `.dxf`) — parse rectangles client-side (stub the parser logic clearly with a TODO comment and a documented expected interface, since real DXF parsing may need a backend or a JS DXF library — note this as an integration point)
    - "Run optimization" button that runs a **client-side bin-packing algorithm** (implement a real first-fit-decreasing or guillotine-cut algorithm in `lib/optimizer.ts`, not a mock) and renders results
    - Visual cut layout rendered as SVG, one panel per sheet, color-coded, labeled with dimensions, showing kerf and margin lines
    - Results summary: sheets required, efficiency %, waste area, offcuts reused
    - Export buttons (PDF/save — UI only is fine, note as integration point for backend)
5. **Stock** — stock table per material/site with in-stock, reserved, available, reorder threshold, status badges (good/low/out), "Add Stock" modal.
6. **Offcuts** — table of saved offcuts with status (available/matched/reserved), "Assign to project" action.
7. **Stock In/Out** — log table of all movements (in/out/transfer) with a "Stock In" and "Stock Out" modal form.
8. **Sites** — card grid of sites with stats (projects, stock, users, manager), "Add Site" modal.
9. **Approvals** — tabbed list (pending/approved/rejected) of quotations, stock requests, and project changes, with approve/reject actions.
10. **Quotations** — list page with status badges, "New Quotation" modal/builder linking client + project + line items + discount.
11. **Clients** — simple CRM table with contact info, project count, total value.
12. **Reports** — efficiency trend chart, waste-by-material breakdown, cost savings summary — all using Recharts, all driven by mock data via a clearly typed data layer so it's easy to wire to real analytics later.
13. **Roles & Permissions** — role list (Super Admin, Site Manager, Cutter/Operator, Sales/Quotation, Viewer) + a permission matrix component (modules × view/create/edit/delete/approve) that's editable via checkboxes, plus a "New Role" modal.
14. **Settings** — sub-navigation with: Branding (see section 3), Company Info, Defaults (default sheet size, kerf, margin, low stock threshold, optimizer toggles), Notifications (toggle list), Users (table + invite modal), Billing, Integrations (toggle list), Security, Backup & Export.

### 7. Data layer & types

- Define proper TypeScript interfaces for all entities in `src/types/`: `Project`, `Panel`, `Sheet`, `OptimizationResult`, `StockItem`, `Offcut`, `StockMovement`, `Site`, `Quotation`, `QuotationLineItem`, `Client`, `User`, `Role`, `Permission`.
- Build a `lib/api/mockData.ts` with realistic seed data for every entity (at least 5-10 records each), and a thin `lib/api/client.ts` abstraction (functions like `getProjects()`, `createProject()`, etc.) that currently reads/writes the mock data but is structured so swapping in real `fetch` calls to a FastAPI backend later requires changing only this one file.
- Use React Query hooks (`useProjects`, `useStock`, etc.) in each feature's `hooks/` folder wrapping these API functions.

### 8. Code quality requirements

- Strict TypeScript (`strict: true` in tsconfig), no `any` unless absolutely unavoidable (and commented why).
- Components should be small and composable — extract repeated UI (metric cards, badges, status pills, table shells) into `components/ui/`.
- Use semantic, accessible HTML — proper labels on form inputs, `aria-label` on icon-only buttons, keyboard-navigable modals (Esc to close, focus trap).
- Consistent naming: PascalCase components, camelCase functions/variables, kebab-case file names only for non-component files.
- Add a root `README.md` explaining the folder structure, how to run the project (`npm install`, `npm run dev`), how to swap mock data for a real API, and how the branding/customization system works.

### 9. Deliverable

Build this as a working, runnable Vite project I can `npm install && npm run dev` immediately. Prioritize getting the **AppShell (sidebar/topbar/mobile nav), routing, Dashboard, and Optimizer** fully working first since those are the core experience, then build out the remaining feature pages. Confirm with me before starting if you'd like to break this into phases instead of building everything in one pass.

## PROMPT END
