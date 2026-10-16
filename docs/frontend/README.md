# Frontend engineering map

## Order of responsibility

1. **HTML** defines document structure and meaning.
2. **CSS** controls layout, typography, visual states, responsive behavior and animation.
3. **JavaScript** implements browser-side behavior, events, state and asynchronous work.
4. **TypeScript** adds static type checking to JavaScript development; runtime data still needs validation.
5. **Build tooling** packages assets, checks style and types, and runs tests.
6. **Backend contracts** define what the frontend may request and what data it receives.

## Suggested CSS layers

- `tokens.css`: design tokens, color roles, spacing scale, typography, radius and shadows.
- `base.css`: resets, body defaults, accessible focus treatment and global typography.
- `layout.css`: app shell, navigation, columns and major page layout.
- `components.css`: cards, buttons, code blocks, tables, dialogs and reusable components.
- `responsive.css`: breakpoints, narrow layouts, reduced-motion and print overrides.

## Suggested JavaScript modules as complexity grows

- `app.js`: bootstrapping and composition.
- `navigation.js`: page routing, active state, history and mobile navigation.
- `search.js`: indexing, filtering, keyboard shortcuts and result rendering.
- `copy.js`: clipboard behavior and fallback messaging.
- `content.js`: topic metadata and cross-links.

Do not create a module just to increase file count. Split when a responsibility has a clear boundary and can be tested independently.
