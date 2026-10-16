# Testing, debugging, and reliability handbook

## 1. Tests are executable claims

A test should state a behavior that matters to a user or another component. Prefer observable outcomes over assertions about internal implementation details.

A useful test description answers:
- What condition is established?
- What action occurs?
- What result must be true?
- What regression would this test prevent?

Keep tests deterministic. Control clocks, random values, network calls, file paths, and environment variables when they affect the result. Avoid sleeps as a substitute for synchronization.

## 2. A practical testing portfolio

### Unit tests
Test a small unit in isolation when its logic has meaningful edge cases. Good targets include parsers, calculations, validation rules, formatters, and state transitions. Unit tests are fast but cannot prove that real integrations are wired correctly.

### Integration tests
Exercise boundaries such as application-to-database, HTTP handlers, filesystem access, queues, or framework configuration. Prefer realistic dependencies when the interaction itself is what matters.

### Contract tests
Check assumptions between producers and consumers: required fields, status codes, error shapes, event schemas, and compatibility rules. Contracts help teams detect breaking changes before deployment.

### End-to-end tests
Test a small number of high-value user journeys through the deployed or production-like stack. These tests are powerful but can be slower and more fragile; avoid using them for every tiny variation.

### Non-functional checks
Add security, accessibility, performance, migration, backup-restore, and compatibility checks according to the product's risks.

There is no universally correct test-count ratio. Choose a portfolio based on failure impact, feedback speed, and system boundaries.

## 3. Test the boundaries

For each feature, consider:
- normal valid input;
- empty, missing, malformed, and oversized input;
- minimum and maximum allowed values;
- duplicate submissions and retries;
- unauthorized users and cross-user access;
- dependency timeouts and unavailable services;
- partial failure and recovery;
- old persisted data and schema migration;
- localization, timezone, and encoding cases where relevant.

Use table-driven tests when many inputs share the same expected rule. Use property-based testing when a broad invariant can be stated and generated inputs are valuable.

## 4. Debugging as a repeatable method

1. **Reproduce:** write down exact steps, input, environment, and expected versus actual behavior.
2. **Reduce:** create the smallest case that still fails.
3. **Observe:** inspect the first relevant error, stack trace, network request, logs, and state transition.
4. **Form one hypothesis:** state what evidence would support or falsify it.
5. **Change one variable:** avoid simultaneous unrelated edits.
6. **Verify:** rerun the reproduction, focused tests, and nearby regression tests.
7. **Record:** document the root cause and why the fix prevents recurrence.

Do not automatically assume the last edited line caused the failure. The visible exception can be downstream of an earlier invalid state.

## 5. Useful bug report template

- **Summary:** one sentence.
- **Environment:** OS, browser/runtime, version, relevant configuration.
- **Prerequisites:** account state, data, feature flags.
- **Steps to reproduce:** numbered and minimal.
- **Expected result:**
- **Actual result:**
- **Frequency:** always, intermittent, or once.
- **Evidence:** sanitized logs, screenshots, trace IDs.
- **Impact:** who is affected and what is blocked.
- **Workaround:** if one exists.
- **Security/privacy note:** remove credentials and personal data before sharing.

## 6. CI quality gates

A practical pipeline often runs:
1. formatting check;
2. static analysis / lint;
3. type checking where applicable;
4. unit tests;
5. integration tests;
6. build/package;
7. dependency and secret scanning;
8. deployment only after required checks pass;
9. smoke tests against the deployed result.

Keep CI output actionable. Cache only reproducible dependencies or build inputs, not secrets. Make failure logs clear without printing sensitive values.

## 7. Reliability signals

For a service, define what users consider successful and measure it. Common signals include request latency, traffic, errors, and saturation, but choose metrics based on service behavior. Alerts should be tied to user impact or a clear operational action, not simply to every unusual metric.

A useful incident review is blameless and specific:
- timeline and user impact;
- contributing technical and process factors;
- what detection worked or failed;
- corrective actions with owners and due dates;
- follow-up tests or alerts that prevent silent recurrence.

## 8. Completion checklist

- [ ] Expected behavior is captured by a test.
- [ ] Negative and boundary cases are covered.
- [ ] External dependencies are tested at the right layer.
- [ ] The bug can be reproduced or its non-reproducibility explained.
- [ ] Logs are useful and sanitized.
- [ ] CI runs the required checks.
- [ ] A rollback or recovery path exists for high-risk changes.

## References

- Python unittest: https://docs.python.org/3/library/unittest.html
- GitHub Actions: https://docs.github.com/en/actions
- Google SRE book, monitoring distributed systems: https://sre.google/sre-book/monitoring-distributed-systems/
- OWASP Cheat Sheet Series: https://cheatsheetseries.owasp.org/

Last reviewed for this chapter: 2026-10-16. Tool-specific commands and APIs should be checked against their current official manuals.
