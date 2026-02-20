# Requirements - pai314

## 1. System Overview

pai314 is a personal portfolio website built with React 19 + TypeScript. It showcases the owner's profile, projects, blog articles, and social links. The site is a static SPA (Single Page Application) with client-side routing.

## 2. Architecture

```
[Browser]
    |
    v
[Vite Dev Server / Static Hosting]
    |
    v
[React SPA]
    ├── App.tsx (Router)
    ├── Pages (Home, About, Projects, Articles, Links)
    ├── Components (Header, Me, Link, ArticleCard, ArticleView)
    └── Static Content (public/articles/*.md, public/images/)

[Build Pipeline]
    ├── TypeScript Compiler (tsc)
    ├── Vite Bundler (rolldown)
    └── Article Index Generator (scripts/generate-articles-index.js)
```

## 3. Module Requirements

### 3.1 Frontend (impl-frontend)

**Pages:**
- **Home** (`/`, `/home`): Landing page with profile section and social links
- **About** (`/about`): Detailed profile with career timeline
- **Projects** (`/projects`): Project showcase
- **Articles** (`/articles`): Blog article list with card layout
- **Article Detail** (`/articles/:id`): Individual article viewer with markdown rendering
- **Links** (`/links`): Social media and external links

**Components:**
- **Header**: Fixed navigation bar with icon links to all pages
- **Me**: Profile card showing name, avatar, description
- **Link**: Social link component with icon and URL
- **ArticleCard**: Article preview card (title, date, summary)
- **ArticleView**: Markdown content renderer with frontmatter parsing

**Styling:**
- CSS Modules for all components
- Dark mode support via `prefers-color-scheme`
- Responsive layout (mobile-friendly)
- Material Icons for navigation

### 3.2 Backend (impl-backend)

**Content Pipeline:**
- Markdown articles with YAML frontmatter in `public/articles/`
- Build script (`scripts/generate-articles-index.js`) generates `index.json`
- Frontmatter fields: `title`, `date`, `summary`, `id`, `tags`

**API Utilities (future):**
- Data fetching helpers
- Content transformation utilities

### 3.3 Infrastructure (impl-infra)

**Build & Tooling:**
- Vite configuration and optimization
- TypeScript configuration (strict mode)
- ESLint configuration
- Package dependency management

**Deployment (future):**
- CI/CD pipeline setup
- Hosting configuration (Vercel, Netlify, or similar)
- Domain and SSL configuration

## 4. Non-Functional Requirements

### Performance
- First Contentful Paint < 1.5s
- Lighthouse Performance score > 90
- Lazy loading for article content
- Optimized image assets

### Accessibility
- Semantic HTML elements
- Alt text on all images
- Keyboard navigation support
- Sufficient color contrast

### Testability
- Components should be testable in isolation
- Pure functions for data transformation
- Props-driven components (minimal internal state)

### SEO
- Proper meta tags per page
- Open Graph metadata for social sharing
- Structured article frontmatter

## 5. File Structure & Ownership

| Directory | Owner | Description |
|-----------|-------|-------------|
| `src/components/` | impl-frontend | Reusable UI components |
| `src/pages/` | impl-frontend | Route-level page components |
| `src/styles/` | impl-frontend | CSS Module files |
| `src/assets/` | impl-frontend | Static images and resources |
| `src/App.tsx` | impl-frontend | Main app with routing |
| `src/App.css` | impl-frontend | Global app styles |
| `src/index.css` | impl-frontend | Global base styles |
| `public/images/` | impl-frontend | Public image assets |
| `src/api/` | impl-backend | API utilities (future) |
| `src/utils/` | impl-backend | Shared utilities |
| `scripts/` | impl-backend | Build/generation scripts |
| `public/articles/` | impl-backend | Markdown article content |
| `src/main.tsx` | impl-backend | React entry point |
| `vite.config.ts` | impl-infra | Vite bundler config |
| `tsconfig*.json` | impl-infra | TypeScript configs |
| `eslint.config.js` | impl-infra | ESLint config |
| `package.json` | impl-infra | Dependencies & scripts |
| `.github/` | impl-infra | CI/CD workflows (future) |
