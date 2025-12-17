# Tasks: Personal Blog Layout with Three-Column Homepage

**Input**: Design documents from `/specs/001-blog-layout/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: Next.js structure with `src/app/`, `src/components/`, `src/lib/`
- Paths shown below follow Next.js 14 App Router conventions

---

## Phase 1: Project Setup & Infrastructure

**Goal**: Initialize Next.js project with all dependencies and configuration

- [X] T001 Initialize Next.js 14 project with TypeScript and App Router using `create-next-app`
- [X] T002 [P] Install and configure Tailwind CSS 3.4 in tailwind.config.ts and src/app/globals.css
- [X] T003 [P] Install core dependencies: react-markdown, remark-gfm, rehype-highlight, gray-matter
- [X] T004 [P] Install Prisma ORM and initialize schema in prisma/schema.prisma
- [X] T005 [P] Install dev dependencies: Jest, React Testing Library, Playwright, ESLint, Prettier
- [X] T006 Configure TypeScript strict mode in tsconfig.json
- [X] T007 Set up ESLint and Prettier configuration files (.eslintrc.json, .prettierrc)
- [X] T008 Create .env.local with DATABASE_URL and NEXT_PUBLIC_BASE_URL
- [X] T009 Set up PostgreSQL database connection and verify connectivity (SQLite used instead)
- [X] T010 Create .gitignore with Next.js, Node.js, and IDE entries

---

## Phase 2: Database & Data Layer (Foundational)

**Goal**: Set up complete database schema and seed data - MUST complete before user stories

- [X] T011 Define Prisma schema for Author model in prisma/schema.prisma
- [X] T012 [P] Define Prisma schema for Category model in prisma/schema.prisma
- [X] T013 [P] Define Prisma schema for Post model with relationships in prisma/schema.prisma
- [X] T014 Add database indexes for viewCount, publishedAt, categoryId, status in prisma/schema.prisma
- [X] T015 Run Prisma migration: `npx prisma migrate dev --name init`
- [X] T016 Create seed script in prisma/seed.ts with sample author, categories, and posts
- [X] T017 Run database seed: `npx prisma db seed`
- [X] T018 [P] Create Prisma client singleton in src/lib/prisma.ts
- [X] T019 [P] Create TypeScript types from Prisma schema in src/types/index.ts
- [X] T020 [P] Create markdown utility functions in src/lib/markdown.ts (sanitization, parsing)

---

## Phase 3: User Story 1 - Browse Blog Posts on Homepage (P1)

**Goal**: Implement three-column homepage with high-view posts (left), blog listings (center), and categories (right)

**Independent Test**: Visit homepage and verify all three columns display with markdown-rendered content on desktop and mobile

### Backend API

- [X] T021 [P] [US1] Create GET /api/posts route handler in src/app/api/posts/route.ts (pagination support)
- [X] T022 [P] [US1] Create GET /api/posts/high-view route handler in src/app/api/posts/high-view/route.ts
- [X] T023 [P] [US1] Create GET /api/categories route handler in src/app/api/categories/route.ts

### Components

- [X] T024 [P] [US1] Create MarkdownRenderer component in src/components/MarkdownRenderer.tsx with react-markdown
- [X] T025 [P] [US1] Create PostCard component in src/components/PostCard.tsx (excerpt, image, metadata)
- [X] T026 [US1] Create BlogList component in src/components/BlogList.tsx (center column with pagination)
- [X] T027 [US1] Create HighViewPosts component in src/components/HighViewPosts.tsx (left column)
- [X] T028 [US1] Create CategoryList component in src/components/CategoryList.tsx (right column with counts)
- [X] T029 [P] [US1] Create Navigation component in src/components/Navigation.tsx (site menu)

### Pages

- [X] T030 [US1] Create root layout in src/app/layout.tsx with Navigation and Tailwind styles
- [X] T031 [US1] Implement homepage in src/app/page.tsx with three-column grid layout
- [X] T032 [US1] Add responsive breakpoints (mobile stacking) to homepage grid using Tailwind classes
- [X] T033 [P] [US1] Create individual post page in src/app/post/[slug]/page.tsx with full markdown rendering
- [X] T034 [P] [US1] Add metadata generation for SEO in src/app/post/[slug]/page.tsx using generateMetadata()

### Styling

- [X] T035 [P] [US1] Configure Tailwind theme with custom colors and fonts in tailwind.config.ts
- [X] T036 [P] [US1] Add global styles for markdown content (headings, code blocks, tables) in src/app/globals.css
- [X] T037 [US1] Implement mobile-responsive styles for all homepage components (min 320px width)
- [X] T038 [P] [US1] Add touch-friendly button/link sizing (min 44x44px) across homepage

### Testing

- [X] T039 [US1] Write unit tests for MarkdownRenderer component in __tests__/components/MarkdownRenderer.test.tsx
- [ ] T040 [P] [US1] Write unit tests for PostCard component in __tests__/components/PostCard.test.tsx
- [X] T041 [P] [US1] Write unit tests for markdown utility functions in __tests__/lib/markdown.test.ts
- [X] T042 [US1] Write E2E test for homepage three-column layout in __tests__/e2e/homepage.spec.ts
- [X] T043 [P] [US1] Write E2E test for mobile responsive layout in __tests__/e2e/responsive.spec.ts
- [ ] T044 [P] [US1] Write E2E test for post navigation in __tests__/e2e/post-view.spec.ts

---

## Phase 4: User Story 2 - Filter Posts by Category (P2)

**Goal**: Implement category filtering page with responsive layout

**Independent Test**: Click a category and verify filtered posts display with category name and post count

### Backend API

- [X] T045 [US2] Create GET /api/categories/[slug] route handler in src/app/api/categories/[slug]/route.ts

### Pages

- [X] T046 [US2] Create category page in src/app/category/[slug]/page.tsx with filtered posts
- [X] T047 [US2] Add category name and post count display to category page header
- [X] T048 [US2] Handle empty category (no posts) with friendly message
- [X] T049 [P] [US2] Add metadata generation for category pages using generateMetadata()
- [X] T050 [US2] Ensure category page is mobile-responsive with vertical stacking

### Testing

- [ ] T051 [US2] Write E2E test for category filtering in __tests__/e2e/category-filter.spec.ts
- [ ] T052 [P] [US2] Write E2E test for empty category handling in __tests__/e2e/category-empty.spec.ts
- [ ] T053 [P] [US2] Write E2E test for category page responsiveness in __tests__/e2e/category-mobile.spec.ts

---

## Phase 5: User Story 3 - View User Profile (P3)

**Goal**: Implement author profile page with bio and social links

**Independent Test**: Navigate to /profile and verify author information displays correctly on all devices

### Backend API

- [X] T054 [US3] Create GET /api/profile route handler in src/app/api/profile/route.ts

### Pages

- [X] T055 [US3] Create profile page in src/app/profile/page.tsx with author details
- [X] T056 [US3] Render author bio with markdown using MarkdownRenderer component
- [X] T057 [US3] Display social links with target="_blank" and rel="noopener noreferrer"
- [X] T058 [P] [US3] Add avatar display with Next.js Image component optimization
- [X] T059 [US3] Ensure profile page is mobile-responsive with touch-friendly social links
- [X] T060 [P] [US3] Add metadata for profile page using generateMetadata()

### Testing

- [ ] T061 [US3] Write E2E test for profile page display in __tests__/e2e/profile.spec.ts
- [ ] T062 [P] [US3] Write E2E test for social links opening in new tab in __tests__/e2e/profile-social.spec.ts
- [ ] T063 [P] [US3] Write E2E test for profile page responsiveness in __tests__/e2e/profile-mobile.spec.ts

---

## Phase 6: Polish & Cross-Cutting Concerns

**Goal**: Performance optimization, security hardening, and final quality checks

### Performance

- [X] T064 [P] Implement Next.js Image component for all post cover images
- [X] T065 [P] Add lazy loading for images using loading="lazy"
- [X] T066 Configure next.config.js with image optimization domains
- [ ] T067 [P] Implement API response caching with Next.js cache and revalidate options
- [ ] T068 [P] Add loading.tsx files for Suspense boundaries in all dynamic pages
- [ ] T069 Run Lighthouse audit and ensure 90+ performance score

### Security

- [X] T070 [P] Add DOMPurify sanitization to markdown rendering in src/lib/markdown.ts
- [X] T071 [P] Implement XSS protection in react-markdown configuration
- [ ] T072 [P] Add Content Security Policy headers in next.config.js
- [X] T073 [P] Validate and sanitize all user inputs in API routes

### View Count Tracking

- [X] T074 Create POST /api/posts/[slug]/view route handler in src/app/api/posts/[slug]/view/route.ts
- [X] T075 Implement view count increment logic using Prisma update
- [ ] T076 Add client-side view tracking call in src/app/post/[slug]/page.tsx

### Error Handling

- [X] T077 [P] Create error.tsx for global error boundary in src/app/error.tsx
- [X] T078 [P] Create not-found.tsx for 404 pages in src/app/not-found.tsx
- [X] T079 [P] Add error handling in all API routes with proper status codes

### Documentation

- [X] T080 [P] Create README.md with setup instructions and project overview
- [ ] T081 [P] Add JSDoc comments to all utility functions and complex components
- [X] T082 [P] Document environment variables in .env.example

### Final Testing

- [ ] T083 Run full test suite: `npm run test`
- [ ] T084 Run E2E tests: `npm run test:e2e`
- [X] T085 Test all user flows manually (homepage → post → category → profile)
- [ ] T086 Verify mobile responsiveness on real devices (iOS, Android)
- [ ] T087 Run accessibility audit (WCAG 2.1 Level AA compliance)
- [X] T088 Build production bundle: `npm run build`
- [ ] T089 Test production build locally: `npm run start`

---

## Task Statistics

- **Total Tasks**: 89
- **Setup Phase**: 10 tasks
- **Foundational Phase**: 10 tasks
- **User Story 1 (P1)**: 24 tasks
- **User Story 2 (P2)**: 9 tasks
- **User Story 3 (P3)**: 10 tasks
- **Polish Phase**: 26 tasks

## Parallel Opportunities

### Within User Story 1 (Homepage)
- Backend API routes (T021, T022, T023) can run in parallel
- Components (T024, T025, T029) can be developed in parallel
- Post page and metadata (T033, T034) can run in parallel
- Styling tasks (T035, T036, T038) can run in parallel
- Unit tests (T039, T040, T041) can run in parallel
- E2E tests (T043, T044) can run in parallel after T042

### Within User Story 2 (Category)
- Metadata and empty handling (T049, T048) can run in parallel
- E2E tests (T052, T053) can run in parallel after T051

### Within User Story 3 (Profile)
- Avatar and metadata (T058, T060) can run in parallel
- E2E tests (T062, T063) can run in parallel after T061

### Polish Phase
- Performance tasks (T064, T065, T067, T068) can run in parallel
- Security tasks (T070, T071, T072, T073) can run in parallel
- Documentation tasks (T080, T081, T082) can run in parallel

## Dependencies & Execution Order

### Critical Path
1. **Setup (Phase 1)** → Must complete T001-T010 before any development
2. **Foundational (Phase 2)** → Must complete T011-T020 before user stories
3. **User Stories** → Can be executed independently in priority order:
   - **P1 (Homepage)**: T021-T044 - Highest priority, MVP scope
   - **P2 (Category)**: T045-T053 - Can start after Homepage backend (T021) is done
   - **P3 (Profile)**: T054-T063 - Independent, lowest priority
4. **Polish (Phase 6)** → T064-T089 - After all user stories complete

### Suggested MVP Scope (Minimum Viable Product)
- **Phase 1** (Setup): All tasks required
- **Phase 2** (Foundational): All tasks required
- **Phase 3** (User Story 1): T021-T038 (skip some tests initially for speed)
- **Polish**: T064-T073 (performance and security essentials)

This MVP delivers a working homepage with three columns, markdown rendering, and mobile responsiveness.

## Implementation Strategy

1. **Sprint 1** (Setup + Foundational): Complete Phase 1 and Phase 2 (T001-T020)
2. **Sprint 2** (Homepage Backend + Components): T021-T029
3. **Sprint 3** (Homepage Pages + Styling): T030-T038
4. **Sprint 4** (Homepage Testing): T039-T044
5. **Sprint 5** (Category Feature): T045-T053
6. **Sprint 6** (Profile Feature): T054-T063
7. **Sprint 7** (Polish & Launch): T064-T089

**Estimated Total Time**: 7 sprints (14-21 days for 1-2 developers)
