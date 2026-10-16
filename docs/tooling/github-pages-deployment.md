# GitHub Pages deployment handbook

## 1. Choose one publishing model

GitHub Pages can publish static content from a configured branch/folder or through a GitHub Actions workflow. For a plain HTML/CSS/JavaScript site, a custom Actions workflow gives explicit control over the artifact and deploy steps. Do not leave two independent workflows competing to publish the same site unless there is a deliberate reason and the setup is understood.

Typical custom workflow stages:

1. Trigger on pushes to the default branch and optionally manual dispatch.
2. Check out the repository.
3. Build the site if a build step is needed.
4. Upload the static output as a Pages artifact.
5. Deploy that artifact with the Pages deploy action.
6. Inspect the run summary and confirm the resulting URL.

A typical deployment job requires Pages write permission and the OIDC token permission, and should depend on the job that produced the artifact. Follow the current GitHub documentation for exact workflow syntax and action versions.

## 2. Static site path rules

For a project site such as `https://OWNER.github.io/REPOSITORY/`, absolute links like `/css/main.css` point to the domain root and may break because the repository name is part of the path. Relative paths such as `css/main.css` or `./css/main.css` are often safer for a simple static project site. Verify paths from nested pages too.

Check:
- `index.html` exists in the published output root;
- CSS and JavaScript paths match actual filenames and case;
- linked images and fonts are present in the artifact;
- local filesystem paths are not referenced;
- external APIs do not require server secrets in the browser bundle;
- a custom domain is configured in Pages settings, not merely by adding a text file.

## 3. Diagnose a failed deployment

1. Open the exact workflow run that matches the latest commit SHA.
2. Confirm the event, branch, and commit.
3. Open the failed job and identify the first failing step.
4. Read the error text; later failures may be consequences of the first one.
5. Check workflow permissions, artifact path, job dependencies, and environment.
6. Fix one cause and rerun; confirm the run corresponds to the new commit.
7. After success, open the published URL and inspect browser developer tools for 404s, JavaScript errors, and missing assets.

A green Actions run means that workflow completed successfully. It does not guarantee every browser route, resource, or interaction works. Perform a smoke test on the actual site.

## 4. Common failure patterns

| Symptom | Likely checks |
| --- | --- |
| Site returns 404 | Pages source, deployment URL, published artifact root, presence of `index.html` |
| CSS/JS returns 404 | Case-sensitive path, relative vs root-relative URL, file included in artifact |
| Workflow cannot deploy | Pages permissions, OIDC permission, environment, deploy job dependency |
| Two runs overlap | Multiple workflows configured for the same publication target |
| Old content appears | Confirm deployed commit and run; check browser cache and CDN propagation |
| Works at repository root only | Test project-site base path and links from nested routes |
| Build succeeds but site is broken | Inspect browser console, network requests, and real published URL |

## 5. Deployment checklist

- [ ] Exactly one intentional workflow publishes the site.
- [ ] The workflow triggers on the intended branch.
- [ ] Permissions are minimal and follow current GitHub guidance.
- [ ] The upload artifact contains the expected site files.
- [ ] Deployment job depends on the build/upload job.
- [ ] Latest run is successful for the intended commit.
- [ ] Published URL is reachable.
- [ ] CSS, JS, images, navigation, search, and mobile layout are smoke-tested.
- [ ] No secrets are embedded in static client files.

## References

- GitHub Pages documentation: https://docs.github.com/en/pages
- Configure a publishing source: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Custom workflows with GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- GitHub Pages with Jekyll: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll

Last reviewed for this chapter: 2026-10-16. GitHub Actions syntax and action major versions change; check official docs before copying a workflow into production.
