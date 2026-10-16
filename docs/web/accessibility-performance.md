# Web accessibility and performance handbook

> Scope: practical engineering guidance, not a certification or a substitute for testing against the applicable standard. Reviewed against the references at the end; browser and framework behavior can change.

## 1. Accessibility is part of product quality

Accessibility means people with different sensory, motor, cognitive, and situational needs can perceive, understand, navigate, and use a product. Include it in design, implementation, review, and release rather than treating it as a final polish pass.

### Semantic HTML first

Use an element whose built-in meaning matches the task:

- `<button>` for an action; `<a href="…">` for navigation.
- `<nav>`, `<main>`, `<header>`, `<footer>`, and headings to communicate document structure.
- Associate each form field with a visible `<label>`; connect instructions and errors to the field.
- Give informative images concise alternative text. Use empty alt text for decorative images.
- Use table headers for tabular data, not for layout.

Native semantics provide browser behavior and accessibility information that generic `<div>` elements do not provide automatically.

### Keyboard and focus

1. Navigate the entire experience with Tab and Shift+Tab.
2. Activate controls with their expected keys (Enter/Space where appropriate).
3. Ensure focus is always visible and not hidden under sticky headers or dialogs.
4. Keep focus order aligned with visual and reading order.
5. When opening a modal, move focus into it, keep keyboard interaction within it while open, and return focus to the invoking control when it closes.
6. Never communicate state using color alone.

### Forms and errors

- Provide persistent labels; placeholders are examples, not replacements for labels.
- State required fields clearly and validate on the server as well as the client.
- Explain how to fix an error in plain language, preserve valid entries, and focus or announce the error summary when useful.
- Avoid clearing a form after an unsuccessful submission.

### ARIA: use deliberately

Prefer a native HTML element when it already provides the needed semantics and behavior. ARIA can expose roles, names, states, and relationships, but it does not implement keyboard behavior by itself. If a custom widget uses ARIA, its author must implement the expected interaction pattern too. Verify roles and accessible names with browser accessibility tools and assistive technology where possible.

## 2. Motion, contrast, and responsive content

- Check text contrast and focus indicators; do not rely only on visual intuition.
- Respect `prefers-reduced-motion` and provide a reduced-motion experience for nonessential movement.
- Support zoom and reflow; avoid fixed-width layouts that force horizontal scrolling for ordinary reading.
- Give icon-only controls accessible names.
- Keep interactive targets comfortably usable on touch screens.
- Test at narrow widths, with keyboard-only navigation, and with text zoom.

WCAG is organized around four principles: perceivable, operable, understandable, and robust. Conformance depends on specific success criteria and the context of the whole experience; a checklist alone cannot prove compliance.

## 3. Performance workflow

Performance is a user-experience property, not merely a score.

1. **Measure a baseline.** Use browser developer tools and field data where available.
2. **Identify the bottleneck.** Distinguish network delay, JavaScript execution, rendering, image transfer, and server latency.
3. **Change one meaningful cause at a time.**
4. **Compare under the same conditions.** Record device, browser, network, cache state, and tested route.
5. **Guard against regressions.** Add budgets or repeatable checks to CI where practical.

### Common high-value improvements

- Resize and compress images; use responsive sources and modern formats where supported.
- Avoid loading below-the-fold media eagerly when it is not needed immediately.
- Reduce unused JavaScript and avoid shipping a large framework for a tiny interaction.
- Split code at meaningful boundaries, not into countless tiny files by default.
- Cache versioned static assets safely; ensure HTML and mutable data do not receive inappropriate long-lived caching.
- Reserve image and embed dimensions to reduce layout shifts.
- Avoid long main-thread tasks and measure before adding complex optimization.

### Core Web Vitals (check current thresholds)

The commonly used Core Web Vitals are Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). Thresholds and measurement guidance can evolve; consult the current official web.dev reference before turning a number into a release gate.

## 4. Review checklist

- [ ] Can every action be completed by keyboard?
- [ ] Is focus visible and logically ordered?
- [ ] Are headings hierarchical and landmarks meaningful?
- [ ] Do fields have labels and actionable error messages?
- [ ] Do images have appropriate text alternatives?
- [ ] Is reduced motion respected?
- [ ] Does the layout reflow at small widths and zoom?
- [ ] Have performance bottlenecks been measured rather than guessed?
- [ ] Have representative assistive-technology and real-device checks been performed?

## References

- MDN, Accessibility learning module: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility
- MDN, HTML as a basis for accessibility: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML
- MDN, CSS and JavaScript accessibility: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/CSS_and_JavaScript
- MDN, ARIA: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA
- MDN, WCAG overview: https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG
- MDN, Web technology guides: https://developer.mozilla.org/en-US/docs/Web/index.html

Last reviewed for this chapter: 2026-10-16. Re-check the references before relying on version-sensitive details.
