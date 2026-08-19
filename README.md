# Cohesion 🤝

Cohesion is a ServiceNow UI Page tool suite that consolidates common developer and admin workflows into a single workspace.

## Access

Open the app on your instance at:

- `/purple_pack.do`

## Current Tooling

Cohesion uses a left sidebar layout. Selecting a tool renders it in the main content area.

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

## GitLabCommitter Script Include

The **GitLabCommitter** script include (`x_1892699_purple_pack.GitLabCommitter`) exports a ServiceNow update set as XML and commits it to a configured GitLab repository.

### Usage

```javascript
var committer = new x_1892699_purple_pack.GitLabCommitter();
var result = committer.commitUpdateSet('<update_set_sys_id>');
// result: { success: boolean, message: string, commitUrl: string }
```

### System Properties

Configure the following system properties before use:

| Property | Required | Description |
|---|---|---|
| `x_1892699_purple_pack.gitlab.url` | ✅ | GitLab base URL (e.g. `https://gitlab.example.com`) |
| `x_1892699_purple_pack.gitlab.token` | ✅ | Personal or project access token with `api` scope |
| `x_1892699_purple_pack.gitlab.project_id` | ✅ | Numeric project ID or URL-encoded `namespace/project` path |
| `x_1892699_purple_pack.gitlab.branch` | ➖ | Target branch (default: `main`) |
| `x_1892699_purple_pack.gitlab.directory` | ➖ | Directory inside the repo for XML files (default: `update-sets`) |

The committed file is named `<directory>/<sanitized_update_set_name>.xml` and the XML envelope matches the standard ServiceNow update-set export format so it can be imported directly via **Retrieved Update Sets**.

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
    ├── script-includes/
    │   └── gitlab-committer.now.ts
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
- CSS theming tokens (including Cohesion accent tokens)

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
