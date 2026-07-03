# Purple Pack 🟣

A developer and admin tools suite built as a ServiceNow UI Page. Purple Pack provides a centralized collection of utilities designed to streamline common development and administration tasks directly within your ServiceNow instance.

## Access

Navigate to **`/purple_pack.do`** on your instance.

## Features

Purple Pack uses a modern sidebar navigation layout — click any tool in the left panel to open it in the main content area.

### Tools

| Tool | Description |
|------|-------------|
| **Script Analyzer** | Scan scripts for best practices, performance issues, and security vulnerabilities |
| **Table Inspector** | Browse table schemas, view column definitions and relationships |
| **Log Viewer** | Stream and filter system logs in real time |
| **Performance Monitor** | Track response times, throughput, and system performance metrics |
| **Cache Manager** | View cache statistics, flush or clear caches |
| **Script Debugger** | Set breakpoints, inspect variables, and step through server-side scripts |
| **Update Set Tracker** | Monitor update set progress, status, and contents |
| **Instance Healthcheck** | Run system health checks and view instance health scores |
| **Integration Creator** | Create a service account and OAuth application registry in one step |
| **Peer Review** | Request and track peer reviews of update sets |

### Peer Review

The Peer Review tool allows developers to:

- **Request reviews** — Select an in-progress update set, assign a reviewer, set priority, and submit
- **Track status** — View all review requests with live status badges (Pending, In Review, Approved, Changes Requested, Rejected)
- **Collaborate** — Add notes for context and receive review comments back

Data is stored in the **`u_peer_review`** table with auto-numbered records (PR00001, PR00002, etc.).

## Architecture

```
src/
├── client/                  # React UI (TypeScript + CSS)
│   ├── index.html           # Entry point
│   ├── main.tsx             # React bootstrap
│   ├── app.tsx              # App shell with routing
│   └── components/
│       ├── Sidebar.tsx      # Navigation sidebar
│       ├── ToolContent.tsx  # View router
│       └── tools/           # Individual tool components
└── fluent/
    ├── tables/
    │   └── peer-review.now.ts   # u_peer_review table definition
    └── ui-pages/
        └── purple-pack.now.ts   # UiPage registration
```

## Tech Stack

- **React 18** with TypeScript
- **@servicenow/react-components** (Horizon Design System)
- **ServiceNow Table API** for data operations
- **ServiceNow Fluent SDK** for metadata definitions
- **CSS design tokens** (`--now-color_grouped--purple-*`) for theming

## Development

```bash
npm run build    # Build the application
npm run deploy   # Install to instance
```

## License

UNLICENSED — Internal ServiceNow application.
