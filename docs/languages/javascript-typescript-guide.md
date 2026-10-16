# JavaScript and TypeScript: practical engineering guide

## 1. Separate language, host, and tooling

JavaScript is the language. The browser and server runtimes provide different host APIs. The DOM, `fetch`, and browser storage are not the same thing as ECMAScript language features; Node.js APIs are not browser APIs. Check the runtime documentation before assuming a feature exists everywhere.

TypeScript adds a static type system and tooling around JavaScript. Type annotations are generally removed during compilation; they do not automatically validate untrusted runtime data.

## 2. Values, scope, and mutation

Use `const` by default when a binding will not be reassigned; use `let` when reassignment is needed. Avoid `var` in new code because its function-scoped behavior can make control flow harder to reason about.

```js
const settings = { theme: "dark" };
settings.theme = "light"; // the object can still mutate
// settings = {};         // reassignment of const is not allowed
```

A `const` binding does not make an object deeply immutable. Use deliberate state management or immutable update patterns where change tracking matters.

## 3. Asynchronous work

Promises represent eventual completion or failure. `async` functions return promises, and `await` lets code wait for a promise result within an async function.

```js
async function loadProfile(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}
```

This example demonstrates error checking but does not validate the returned JSON shape. Production code should validate external data before trusting it. Also consider timeouts, cancellation, retry rules, rate limits, and what the UI should display while a request is pending.

Use `Promise.all` when independent tasks can run concurrently and all results are required; it rejects if one input rejects. Use a different coordination strategy when partial results or all outcomes are needed.

## 4. Modules and browser boundaries

Prefer explicit module imports and exports for code reuse. Avoid polluting the global scope. Keep DOM manipulation in browser-specific modules and business logic testable independently when practical.

- Treat text from users or remote APIs as data, not trusted HTML.
- Prefer `textContent` for inserting plain text.
- Avoid assigning untrusted strings to `innerHTML`.
- Handle rejected promises and network failures explicitly.
- Clean up event listeners and long-lived resources when components are removed.

## 5. TypeScript: types are not runtime validation

```ts
type User = {
  id: string;
  displayName: string;
};

function greeting(user: User): string {
  return `Hello, ${user.displayName}`;
}
```

This type helps checked TypeScript code, but data received from a network, file, or JavaScript caller can still violate the declared shape at runtime. Parse external data as unknown, validate its shape, and only then treat it as a trusted domain value.

Useful concepts to study include unions, narrowing, generics, structural typing, module resolution, strict compiler settings, and the difference between type-only declarations and runtime values.

## 6. Errors and API boundaries

Represent expected failure modes clearly. A network request may fail, a response may not be successful, and valid JSON may still have the wrong shape. Distinguish these cases so the application can retry, show a useful message, or stop safely. Do not expose tokens or private server details in client-side error messages.

## 7. Performance and maintainability

- Measure with browser or runtime profiling tools before optimizing.
- Avoid unnecessary DOM reads/writes in tight loops.
- Load only the code needed for the current route or feature where beneficial.
- Avoid large dependencies for trivial functionality.
- Keep state ownership explicit and reduce accidental shared mutation.
- Use linting, formatting, type checks, and tests as complementary tools, not replacements for review.

## 8. Review checklist

- [ ] Runtime and supported versions are explicit.
- [ ] Browser-only APIs are not used in server code and vice versa.
- [ ] Async failures are handled.
- [ ] Network data is validated at the boundary.
- [ ] Untrusted text is not interpreted as HTML.
- [ ] TypeScript strictness is appropriate for the project.
- [ ] Tests cover error states and boundary inputs.
- [ ] Performance changes are measured.
- [ ] Secrets are not shipped to the browser.

## Official references

- MDN JavaScript Guide: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
- MDN Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- MDN DOM: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- TypeScript Everyday Types: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
- Node.js documentation: https://nodejs.org/docs/latest/api/

Last reviewed for this chapter: 2026-10-16. Check the versioned manuals for the runtime and TypeScript version used by your project.
