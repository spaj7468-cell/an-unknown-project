# Web development hierarchy

A web project is easier to understand when its responsibilities are separated instead of treating “the website” as one undifferentiated block.

## The layers

1. **HTML — document structure**
   - Semantic elements, forms, links, headings, landmarks, metadata.
   - The content and meaning of the page.
2. **CSS — presentation and layout**
   - Cascade, inheritance, specificity, custom properties.
   - Box model, normal flow, Flexbox, Grid, positioning.
   - Responsive rules, typography, motion, themes, print styles.
3. **JavaScript — behavior**
   - Events, state, DOM updates, validation, asynchronous operations.
   - Modules, error handling, browser APIs, storage.
4. **TypeScript — development-time type checking**
   - Types, interfaces, narrowing, generics, compiler configuration.
   - It does not replace runtime validation for untrusted input.
5. **Build and dependency tools**
   - Package manager, bundler, linting, formatting, tests, environment variables.
6. **Backend and API**
   - HTTP contracts, authentication, authorization, validation, business rules.
7. **Data layer**
   - Schema, queries, transactions, migrations, backups, access boundaries.
8. **Delivery and operations**
   - Hosting, DNS, TLS, caching, observability, error reporting, rollback.

## Recommended folder structure

```text
web-app/
├── public/                 # Static files copied as-is
├── src/
│   ├── app/                # App startup, routes, global composition
│   ├── components/         # Reusable UI building blocks
│   ├── features/           # Feature-specific UI and behavior
│   ├── styles/
│   │   ├── tokens.css      # Colors, spacing, typography, design tokens
│   │   ├── reset.css       # Consistent baseline
│   │   ├── layout.css      # Shared layout primitives
│   │   ├── components.css  # Reusable component styling
│   │   └── utilities.css   # Small intentional utility classes
│   ├── services/           # API clients and external integrations
│   ├── state/              # Shared state, if the app needs it
│   ├── utils/              # Pure, small reusable helpers
│   └── main.ts             # Entry point
├── tests/                  # Unit, integration, and end-to-end tests
├── package.json
├── tsconfig.json
└── README.md
```

This is a starting pattern, not a universal law. Tiny static sites can be much simpler; frameworks and teams may use different conventions.

## CSS ownership rules

- Keep design tokens in one place.
- Prefer component-scoped selectors over broad selectors that accidentally affect unrelated pages.
- Organize styles by responsibility, not by arbitrary file size.
- Avoid using IDs for reusable component styling.
- Make keyboard focus visible and preserve adequate contrast.
- Test narrow screens, zoom, long content, and reduced-motion preferences.
- Document unusual specificity or cascade dependencies.

## CSS architecture options

- **Single stylesheet:** appropriate for small static sites.
- **Layered files:** tokens, reset, layout, components, utilities; useful for a growing site.
- **Component-scoped CSS:** helps large component-based applications limit style leakage.
- **Utility-first systems:** useful when the team deliberately adopts their conventions.

Do not split CSS into dozens of tiny files without a clear ownership boundary; too much fragmentation makes the cascade harder to understand.
