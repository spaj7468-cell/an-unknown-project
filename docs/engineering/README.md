# Shared engineering handbook

These subjects apply across language ecosystems. The same concept may have different implementation details in Python, JavaScript, Java, C++, Rust, or other languages.

## Architecture
- Requirements, constraints, and quality attributes
- Modules, boundaries, interfaces, dependency direction
- Monolith, modular monolith, service-oriented and distributed designs
- Architecture decision records and evolution

## APIs and protocols
- HTTP request/response lifecycle
- Resource design, status codes, pagination, filtering
- Validation, authentication, authorization, rate limits
- Timeouts, retries, idempotency, versioning
- OpenAPI and contract testing

## Databases and data
- Data modeling and normalization
- SQL, joins, indexes, transactions, isolation
- Document and key-value stores
- Migrations, backups, recovery, retention
- Connection pools, query plans, caching

## Security
- Threat modeling and trust boundaries
- Input validation, output encoding, safe file handling
- Secrets, permissions, sessions, identity
- Dependency and supply-chain security
- Logging without leaking credentials or private data

## Testing and debugging
- Reproduce before changing code
- Separate symptom from root cause
- Unit, integration, contract, end-to-end, regression tests
- Logs, traces, metrics, debugger and profiler
- Verify the fix and record how to detect recurrence

## Delivery and operations
- Version control, code review, automated checks
- Build reproducibility and environment configuration
- CI/CD, staged rollout, rollback strategy
- Health checks, alerts, incident response
- Documentation ownership and maintenance
