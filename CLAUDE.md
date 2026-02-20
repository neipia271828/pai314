# pai314 - Portfolio Site

## Team Workflow

### Roles
- **Lead (Manager)**: Requirements, design decisions, communicates with team leader (user). Commits approved changes.
- **reviewer**: Reviews code against requirements and coding standards. Creates CHANGESUMMARY on approval. Documents critical bugs in docs/PROBLEM/.
- **impl-frontend**: Implements UI components, pages, styles, and client-side logic.
- **impl-backend**: Implements API endpoints, server-side logic, data processing, and build scripts.
- **impl-infra**: Implements deployment, CI/CD, hosting configuration, and infrastructure tooling.

### File Ownership

Each implementer MUST only edit files within their assigned directories:

| Role | Owned Directories |
|------|-------------------|
| impl-frontend | `src/components/`, `src/pages/`, `src/styles/`, `src/assets/`, `src/App.tsx`, `src/App.css`, `src/index.css`, `public/images/` |
| impl-backend | `src/api/`, `src/utils/`, `scripts/`, `public/articles/`, `src/main.tsx` |
| impl-infra | `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, `package.json`, `.github/`, `Dockerfile`, `docker-compose.yml`, deployment configs |

Shared files require coordination through the reviewer or lead.

### Process

1. **Implementer** completes a task
2. **Implementer** sends a message to `reviewer` with the list of changed files
3. **Reviewer** reviews the code against `docs/CODING_STANDARDS.md` and `docs/REQUIREMENTS.md`
   - **NG**: Sends feedback to the implementer for revision
   - **OK**: Creates `CHANGESUMMARY/<topic>.md` and sends it to the lead
4. **Lead** presents the CHANGESUMMARY to the team leader (user)
5. **User approves** -> Lead commits the changes

### CHANGESUMMARY Format

File: `CHANGESUMMARY/<topic>.md`

```markdown
## Summary
- Brief description of what was changed and why

## Changed Files
- `path/to/file.ts` - description of change

## Review Status
- Reviewed by: reviewer
- Date: YYYY-MM-DD
- Result: APPROVED
```

### Critical Bug Report

When a critical bug is found and fixed, the **reviewer** creates `docs/PROBLEM/<CASENAME>.md` after reviewing the fix.

The implementer MUST explain the bug symptoms, root cause, and fix to the reviewer during review submission.

File: `docs/PROBLEM/<CASENAME>.md`

```markdown
## Symptoms
- What happened / how the bug manifested

## Root Cause
- Why it happened (technical explanation)

## Fix
- What was changed to resolve it

## Affected Files
- `path/to/file.ts` - description of change

## Prevention
- How to prevent this class of bug in the future

## Metadata
- Reported by: <impl-*>
- Documented by: reviewer
- Date: YYYY-MM-DD
```

The reviewer submits this alongside the CHANGESUMMARY to the lead.

## Reference Documents

- **Coding Standards**: `docs/CODING_STANDARDS.md` - Naming, patterns, safety rules, review checklist
- **Requirements**: `docs/REQUIREMENTS.md` - Module requirements, architecture, file ownership

The **reviewer** MUST reference these documents when reviewing code.

## Language
- Code: English (variables, comments)
- Team communication: Japanese preferred
