# Coding Standards - pai314

## 1. Naming Conventions

| Target | Convention | Example |
|--------|-----------|---------|
| Components (files & exports) | PascalCase | `ArticleCard.tsx`, `export default function ArticleCard()` |
| Pages (files & exports) | PascalCase | `About.tsx`, `export default function About()` |
| CSS Module files | PascalCase + `.module.css` | `ArticleCard.module.css` |
| CSS class names (in modules) | camelCase | `.timelineItem`, `.careerSection` |
| Variables & functions | camelCase | `articleId`, `fetchArticle()` |
| Types & interfaces | PascalCase | `ArticleMeta`, `Props` |
| Constants | camelCase or UPPER_SNAKE_CASE | `baseUrl`, `MAX_RETRIES` |
| Article markdown files | date-prefix kebab-case | `25-12-20-0.md` |
| Route paths | lowercase with slashes | `/articles/:id` |

## 2. Architecture Patterns

### Component Structure
- **Functional components only** - no class components
- **One component per file** - component name must match file name
- **Props type** defined as `type Props = { ... }` at the top of the file
- **CSS Modules** for all component styling: `import styles from "../styles/ComponentName.module.css"`

### File Organization
```
src/
  components/   # Reusable UI components
  pages/        # Route-level page components (include Header)
  styles/       # CSS Module files (1:1 with components/pages)
  assets/       # Static images and resources
  api/          # API utilities (future)
  utils/        # Shared utilities (future)
```

### Routing
- React Router DOM v7 with `BrowserRouter`
- All routes defined in `App.tsx`
- Page components are top-level route targets

### Data Flow
- **Local state only** with `useState` / `useEffect`
- **Fetch API** for data loading (articles, metadata)
- **Static content** served from `public/` directory
- Use `import.meta.env.BASE_URL` for asset paths

## 3. Safety / Validation Rules

- **No `any` type** - use proper TypeScript types
- **No `console.log` in production code** - remove before committing
- **Null/undefined checks** before accessing fetched data
- **Error handling** on all `fetch()` calls with user-facing fallback messages
- **No inline styles** except for dynamic values (e.g., grid templates)
- **No hardcoded secrets** or API keys in source code
- **Sanitize markdown content** - rely on react-markdown's built-in sanitization

## 4. Constants Organization

- Component-specific constants: defined at the top of the component file
- Shared constants: `src/utils/constants.ts` (create when needed)
- Environment variables: accessed via `import.meta.env.*`

## 5. Logging Conventions

- **Development**: `console.error()` for unexpected errors only
- **Production**: No console output
- **User-facing errors**: Display Japanese messages in the UI (e.g., "記事が見つかりません")

## 6. CSS Conventions

- **CSS Modules** for component-scoped styles
- **camelCase** for class names in modules
- **Flexbox** as primary layout method
- **CSS Grid** for card/grid layouts with `auto-fill` / `minmax`
- **No CSS variables** in component modules (use hardcoded values or future design tokens)
- **Responsive design**: viewport units (`vw`, `vh`) and CSS Grid auto-fill
- **Transitions** for hover effects (transform, box-shadow)
- **Dark mode**: respect `prefers-color-scheme` media query

## 7. Code Review Checklist

1. [ ] Component and file names follow PascalCase convention
2. [ ] CSS classes use camelCase in CSS Modules
3. [ ] No `any` types - all TypeScript types are explicit
4. [ ] All `fetch()` calls have error handling with user-facing fallback
5. [ ] No `console.log` statements in committed code
6. [ ] Styles use CSS Modules (no global styles except `index.css` / `App.css`)
7. [ ] Component only edits files within its role's owned directories
8. [ ] No inline styles except for truly dynamic values
9. [ ] Japanese UI text for user-facing messages
10. [ ] No hardcoded secrets, API keys, or sensitive data
