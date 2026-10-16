# Application security handbook

> This chapter is a practical baseline for ordinary application engineering. Threats depend on the product, data, deployment, and adversary; use a threat model and current primary references rather than treating this page as a complete security audit.

## 1. Start with assets, trust boundaries, and abuse cases

Before choosing controls, write down:

- **Assets:** accounts, private data, business records, source code, availability, secrets.
- **Actors:** anonymous visitors, signed-in users, administrators, background jobs, external services.
- **Trust boundaries:** browser/server, service/service, user/admin, application/database, CI/deployment.
- **Abuse cases:** read another user's record, change someone else's role, submit malformed input, exhaust resources, replay a request, leak credentials through logs.
- **Impact and likelihood:** prioritize risks that could cause the greatest harm and are plausible in the product's context.

Keep the threat model close to the code and revise it when adding a new endpoint, data type, integration, or permission.

## 2. Validate input; encode output for its context

Input validation and output encoding solve different problems.

- Validate data at the boundary against an explicit schema: type, length, allowed values, format, and business rules.
- Reject unexpected fields when appropriate; do not silently trust client-side validation.
- Use parameterized SQL queries or the database library's safe query API rather than building SQL with string concatenation.
- Escape or encode output for its destination context (HTML text, HTML attribute, URL, JavaScript, CSS). One generic escaping function is not correct for every context.
- Avoid passing untrusted strings to dangerous interpreters or execution APIs.
- Treat uploaded files as untrusted: enforce limits, verify allowed formats using robust parsing, store outside executable paths, and control access.

## 3. Authentication and authorization are different

**Authentication** answers “who is this?” **Authorization** answers “may this identity perform this action on this resource?”

- Deny access by default.
- Check authorization on the server for every sensitive operation and every object, not only when hiding a button in the UI.
- Derive the acting identity from the validated session/token, not from a user ID supplied by the browser.
- Test horizontal access control (user A accessing user B's object) and vertical access control (ordinary user invoking an administrator action).
- Use established identity libraries and protocols; avoid inventing password storage, token formats, or cryptographic schemes.
- Apply safe session expiry and invalidation, and protect session cookies with appropriate attributes such as HttpOnly, Secure, and SameSite where applicable.

## 4. Secrets and cryptography

- Never commit API keys, passwords, signing keys, or production credentials to source control.
- Use environment configuration or a dedicated secret manager; restrict access and rotate exposed credentials.
- If a secret was committed, deleting it in a later commit is not sufficient: treat it as exposed and rotate/revoke it.
- Use vetted, maintained cryptographic libraries and modern protocols; do not design custom encryption.
- Passwords should be stored using a purpose-built password-hashing scheme with suitable parameters, not reversible encryption or a fast general-purpose hash.
- Use TLS for data in transit, while remembering TLS does not replace authorization or safe application logic.

## 5. Browser and API risks

Review the current OWASP guidance for the threat categories relevant to the application, including broken access control, cryptographic failures, injection, insecure design, security misconfiguration, vulnerable components, authentication failures, and logging/monitoring gaps.

- **CSRF:** for cookie-authenticated state changes, evaluate SameSite cookies, anti-CSRF tokens, and Origin/Referer checks as appropriate.
- **CORS:** it is a browser access policy, not authentication. Do not use permissive credentialed CORS as a substitute for authorization.
- **Rate limits:** protect expensive and abuse-prone endpoints; define limits by meaningful identity and resource costs, and return clear retry information.
- **Errors:** show useful messages to users without exposing stack traces, internal paths, tokens, or sensitive records.
- **Logging:** record security-relevant events while excluding passwords, session tokens, API keys, and unnecessary personal data.

## 6. Dependencies and software supply chain

- Keep a clear dependency inventory and lock files under version control where the ecosystem supports them.
- Prefer maintained packages from trustworthy sources; review ownership, release history, transitive dependencies, and requested permissions.
- Run ecosystem-appropriate vulnerability checks and update vulnerable packages with a tested process.
- Pin actions and build inputs to trusted versions; for higher-assurance workflows, pin third-party GitHub Actions to full commit SHAs and review updates.
- Restrict CI permissions to the minimum required. Do not expose deployment secrets to untrusted pull-request code.
- Produce build artifacts from reviewed source and retain enough metadata to identify what was deployed.

## 7. Secure development lifecycle

For each change:

1. Describe data touched and trust boundaries crossed.
2. Add negative tests for unauthorized and malformed requests.
3. Review dependency and configuration changes.
4. Check logs and error paths for leaks.
5. Verify security headers and cookie settings in the deployed environment.
6. Record residual risks and an owner for follow-up.

For incidents, preserve relevant evidence, contain the exposure, revoke compromised credentials, assess affected data, communicate through the appropriate process, and add regression controls.

## 8. Security review checklist

- [ ] Authorization is enforced server-side at action and resource level.
- [ ] Queries are parameterized.
- [ ] Inputs have explicit schemas and size limits.
- [ ] Output is encoded for its context.
- [ ] Secrets are not in source, logs, or client bundles.
- [ ] Dependencies and CI actions are reviewed.
- [ ] Sensitive operations have abuse controls and audit events.
- [ ] Error responses do not expose internals.
- [ ] Negative tests cover privilege boundaries.
- [ ] Threat model reflects the current product.

## References

- OWASP Top 10: https://owasp.org/www-project-top-ten/
- OWASP Cheat Sheet Series: https://cheatsheetseries.owasp.org/
- GitHub Actions security hardening: https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions
- MDN, CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- MDN, Cookies: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

Last reviewed for this chapter: 2026-10-16. Security guidance changes; use the current OWASP and platform documentation for release decisions.
