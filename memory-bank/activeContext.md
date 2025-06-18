# Active Context

_Last updated: 2025-06-18_

## Current Work Focus
- Initialize Memory Bank core structure.

## Recent Changes
- Added core files:
  - `projectbrief.md`
  - `productContext.md`
  - `systemPatterns.md`
  - `techContext.md`

## Next Steps
1. Populate detailed architecture diagrams in **systemPatterns.md**.
2. Elaborate feature roadmap and sprint planning (link upcoming docs).
3. Resolve React Router DOM UMD loading issue so the frontend renders correctly.
4. Harden Flask backend (document `.venv`, add `requirements.txt`, add basic tests).
5. Establish monorepo tooling (pnpm workspaces, ESLint, Prettier).
6. Create CI pipeline (GitHub Actions) for lint, test, and build.

## Active Decisions & Considerations
- Adopt monorepo structure for web and mobile apps.
- Use Tailwind CSS for rapid styling consistency.
- Target PostgreSQL managed service to reduce ops overhead.

## Important Patterns & Preferences
- Functional React components with hooks.
- Feature-based folder structure.
- Repository pattern for server data access.

## Learnings & Insights
- Early definition of performance and accessibility goals aligns teams.
- Placeholder architecture sections help drive upcoming discussions.
