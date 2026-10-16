# Git and collaboration handbook

## 1. Mental model

Git records snapshots of project content and connects them through commits. A branch is a movable reference to a line of development; a commit identifies a snapshot and its parent history. The working tree contains the files currently checked out, while the index (staging area) describes what the next commit will contain.

Useful first checks:

```bash
git status
git diff
git diff --staged
git log --oneline --graph --decorate -12
```

Read the output before changing history. Do not use destructive cleanup commands when you do not understand which local work they will remove.

## 2. A safe feature workflow

```bash
git switch main
git pull --ff-only
git switch -c docs/add-security-guide
# edit files
git diff
git add docs/engineering/security-handbook.md
git diff --staged
git commit -m "docs: add application security handbook"
git push -u origin docs/add-security-guide
```

Adapt branch names and remotes to the repository. If you work directly on a personal repository's default branch, still review the diff and test before committing.

### Commit messages

A useful message describes the intent, not merely the file name:
- `docs: add SQL query planning guide`
- `fix: reject expired sessions`
- `test: cover empty search query`

Keep a commit focused enough that reviewers can understand it. Split unrelated changes when doing so improves review and rollback.

## 3. Merge conflicts

A conflict means Git cannot safely decide how overlapping edits should combine.

1. Run `git status` to identify conflicted files.
2. Open each file and inspect conflict markers.
3. Decide the intended behavior; do not simply accept one side without understanding the change.
4. Remove markers and verify the resulting code or documentation.
5. Run tests and inspect `git diff --check`.
6. Stage resolved files and complete the merge/rebase operation requested by Git.

If the result is unclear, save a copy or create a temporary branch before experimenting.

## 4. Revert versus reset

- `git revert <commit>` creates a new commit that reverses a prior change; it is often safer for shared history.
- `git reset` moves the current branch reference and may alter the index or working tree depending on options. It can discard work and should be used only when its effect is understood.
- `git restore <path>` can replace working-tree or staged content with another version. Check status and diffs first.

Avoid force-pushing shared branches unless the team explicitly agrees and the impact is understood.

## 5. Code review checklist

Review for correctness, readability, scope, error handling, security, performance, tests, documentation, and migration/rollback impact. Ask:
- Does the change satisfy the stated requirement?
- Are assumptions explicit?
- Are failure cases handled?
- Are permissions enforced at the right boundary?
- Can future maintainers understand why the approach was chosen?
- Does the documentation match actual behavior?

Feedback should describe the risk and a possible path forward, not judge the author.

## 6. GitHub issues and pull requests

A good issue includes reproducible facts, expected behavior, impact, and relevant environment details. A pull request should explain the problem, approach, trade-offs, tests performed, and any deployment or migration considerations. Link related issues and keep screenshots/logs free of secrets.

## 7. Documentation changes deserve review too

Verify that:
- commands are safe to copy and state the working directory;
- version-specific flags are identified;
- external links point to authoritative maintained pages;
- examples are original and short enough to explain a concept;
- claims distinguish requirements from recommendations;
- deprecated approaches are labeled.

## References

- Pro Git book: https://git-scm.com/book/en/v2
- Git documentation: https://git-scm.com/docs
- GitHub pull request documentation: https://docs.github.com/en/pull-requests
- GitHub Actions documentation: https://docs.github.com/en/actions

Last reviewed for this chapter: 2026-10-16.
