# Purple Pack 🟣

Purple Pack is a ServiceNow UI Page tool suite that consolidates common developer and admin workflows into a single workspace.

## Access

Open the app on your instance at:

- `/purple_pack.do`

## Current Tooling

Purple Pack uses a left sidebar layout. Selecting a tool renders it in the main content area.

| Tool | Description |
|---|---|
| **Script Analyzer** | Scan scripts for best-practice, performance, and security issues |
| **Table Inspector** | Explore table schemas, columns, and relationships |
| **Log Viewer** | Stream and filter system logs |
| **Performance Monitor** | View response-time and throughput trends |
| **Cache Manager** | Inspect cache stats and clear caches |
| **Script Debugger** | Debug server-side scripts with breakpoint-style workflow |
| **Update Set Tracker** | Track update set status and contents |
| **Instance Healthcheck** | Run health checks and review health scoring |
| **Integration Creator** | Create service account + OAuth application registry |
| **Peer Review** | Submit, assign, and track update set peer reviews |

## Peer Review Workflow

The **Peer Review** tool supports:

- Creating requests from in-progress update sets
- Assigning reviewers and priority
- Tracking statuses like **Pending**, **In Review**, **Approved**, **Changes Requested**, and **Rejected**
- Capturing notes and review feedback

Peer review records are stored in the `u_peer_review` table with auto-numbered IDs (`PR00001`, `PR00002`, ...).

## Repository Structure

```text
src/
├── client/
│   ├── index.html
│   ├── main.tsx
│   ├── app.tsx
│   └── components/
│       ├── Sidebar.tsx
│       ├── ToolContent.tsx
│       └── tools/
└── fluent/
    ├── tables/
    │   └── peer-review.now.ts
    └── ui-pages/
        └── purple-pack.now.ts
```

## Tech Stack

- TypeScript + React 18
- `@servicenow/react-components`
- ServiceNow Fluent SDK (`@servicenow/sdk`)
- ServiceNow Glide tooling (`@servicenow/glide`)
- CSS theming tokens (including purple grouped tokens)

## Development

```bash
npm run dev        # Local development
npm run build      # Production build
npm run deploy     # Install to instance
npm run transform  # Transform artifacts
npm run types      # Refresh SDK dependencies/types
```

## Package Info

- **Package name:** `x-1892699-purple-pack`
- **Version:** `1.0.0`
- **License:** `UNLICENSED`

## Notes

This repository’s primary language is **TypeScript**, with supporting CSS, JavaScript, and HTML assets.
