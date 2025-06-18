# Tech Context

## Primary Technologies
| Layer | Technology | Version (Target) | Notes |
|-------|------------|------------------|-------|
| Front-end Web | React | 18.x | Functional components with hooks |
| Mobile | React Native | 0.73+ | Shared business logic with web via monorepo packages |
| State Management | Redux Toolkit | 2.x | RTK Query for data fetching |
| Styling | Tailwind CSS | 3.x | Design tokens and dark-mode support |
| Backend | Python + Flask | 3.1.x | RESTful APIs |
| Database | PostgreSQL | 15.x | Hosted on managed service (e.g., Supabase / RDS) |
| Search | Elasticsearch | 8.x | Ingredient + full-text search |
| Auth | Auth0 | N/A (cloud) | OAuth 2.0 / OIDC |
| Testing | Jest + React Testing Library | Latest | Unit & integration tests |
| CI/CD | GitHub Actions | N/A | Build, test, deploy |

## Development Setup
1. **Monorepo** managed with **pnpm workspaces**.  
2. **ESLint** + **Prettier** for code quality and formatting.  
3. **Husky** pre-commit hooks running lint & unit tests.  
4. **Python virtual environment** (`.venv`) created with `Flask` + `Flask-CORS` for backend.  
5. Infrastructure defined via **Terraform** (optional future work).

## Technical Constraints
- Must support latest two major versions of Chrome, Firefox, Safari, Edge.
- Mobile app targets iOS 15+ and Android 10+.
- All APIs must return JSON (no GraphQL in v1).

## Dependencies & Tooling Patterns
- API layer auto-generated TypeScript client using OpenAPI spec.
- Feature folders structure under `/apps/web` and `/apps/mobile`.
- Shared utilities live under `/packages/shared`.
- Use **React Suspense** + **code-splitting** for performance.
