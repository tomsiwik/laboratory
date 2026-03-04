# PR Review Protocol

Follow this protocol when reviewing pull requests.

## Steps

1. **Get PR context.** Read the PR description, diff, and changed files using GitHub tools.
2. **Check for instructions.** If triggered by a slash command, extract any specific instructions from the comment (e.g., `/dexter focus on error handling`).
3. **Check memory.** Restore cache-memory and check if this PR has been reviewed before. Avoid repeating the same feedback.
4. **Review.** Apply your character-specific review criteria to the diff. Focus on substantive issues, not style nitpicks.
5. **Submit review.** Choose the appropriate review action:
   - `APPROVE` - code is good, no issues found
   - `REQUEST_CHANGES` - blocking issues that must be fixed
   - `COMMENT` - non-blocking observations and suggestions
6. **Update memory.** Save a summary of your review to cache-memory for future reference.

## Guidelines

- Be constructive. Explain *why* something is a problem, not just *what* is wrong.
- Use inline review comments for specific code issues. Use the review body for overall observations.
- If the PR is too large to review meaningfully, say so and suggest splitting it.
- Do not approve PRs that introduce security vulnerabilities, broken tests, or obvious bugs.
