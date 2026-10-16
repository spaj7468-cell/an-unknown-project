# Documentation architecture

This directory is the source-of-truth map for the knowledge base. The website is the human-friendly reading interface; these files define how chapters should be organized and expanded.

## The global hierarchy

1. **Orientation** — what this knowledge base is, how to navigate it, learning paths.
2. **Foundations** — logic, data, algorithms, types, memory, processes, concurrency, networking.
3. **Languages** — syntax, semantics, standard library, runtime, tooling, testing, packaging, deployment.
4. **Platforms and ecosystems** — browser, JVM, native systems, server runtimes, mobile, cloud.
5. **Development disciplines** — web, backend, frontend, systems, data, AI/ML, game development, mobile.
6. **Shared engineering** — architecture, API design, databases, security, testing, observability, performance.
7. **Delivery and operations** — Git, CI/CD, releases, containers, deployment, incident response.
8. **Reference** — glossary, decision tables, troubleshooting, migration guides, checklists.

## Chapter contract

Every substantial chapter should answer:
- What is it, and what problem does it solve?
- Why does it exist? What mental model explains it?
- Where does it sit in the larger system?
- How does it work step by step?
- What does a minimal example look like?
- What does a realistic example look like?
- What are common mistakes and failure modes?
- What are the security, performance, accessibility, and maintenance implications?
- When is it the wrong choice?
- How can it be tested, debugged, and verified?
- Which concepts should the reader study next?

## Quality rules

- Mark language, runtime, library, and version assumptions.
- Separate language specification guarantees from implementation-specific behavior.
- Link to official primary documentation for version-sensitive claims.
- Explain trade-offs rather than presenting one tool as universally best.
- Use diagrams when they clarify flow, boundaries, dependencies, or lifecycle.
- Keep code samples minimal, runnable where possible, and accompanied by expected output.
- Do not claim completeness until the chapter inventory and coverage review support it.

## Current status

The website currently exposes a starter set of reading pages. The directory tree below defines the intended scalable structure; not every topic is fully written yet.


## Newly expanded language guides

- [Python practical guide](languages/python-practical-guide.md) — data model, exceptions, environments, type hints, testing, and concurrency choices.
- [JavaScript and TypeScript practical guide](languages/javascript-typescript-guide.md) — runtime boundaries, async code, modules, type safety, and browser security.

## Additional engineering deep dives

- [Accessibility and performance](web/accessibility-performance.md)
- [Application security handbook](engineering/security-handbook.md)
- [Testing, debugging, and reliability](engineering/testing-debugging.md)
- [SQL and PostgreSQL](data/sql-and-postgresql.md)
- [Git and collaboration](tooling/git-and-collaboration.md)
- [GitHub Pages deployment](tooling/github-pages-deployment.md)
