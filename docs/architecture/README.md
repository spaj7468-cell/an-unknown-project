# Software project architecture map

## Responsibility layers

- **Presentation**: rendering and user interaction; never put secret credentials here.
- **Application layer**: coordinates use cases and workflows.
- **Domain layer**: core business rules and invariants.
- **Infrastructure**: database drivers, external APIs, file systems, queues and deployment integrations.
- **Testing**: unit tests for isolated logic; integration tests at boundaries; end-to-end tests for critical journeys.
- **Operations**: configuration, logs, metrics, health checks and recovery procedures.

These are conceptual boundaries. A small script may not need separate directories or formal layers.

## Dependency direction

Prefer stable, high-level rules that do not depend directly on specific infrastructure implementations. Put adapters at boundaries, make external effects visible, and avoid circular dependencies.

## Review checklist

- Can a new developer identify the application entry point?
- Is configuration separated from source code and secrets?
- Are inputs validated at trust boundaries?
- Are errors handled with context without leaking sensitive values?
- Can important behavior be tested without launching the whole application?
- Is there a documented way to run, test, build and deploy the project?
