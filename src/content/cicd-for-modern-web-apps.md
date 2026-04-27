# CI/CD for Modern Web Apps: A Practical Guide

A well-designed CI/CD pipeline is one of the highest-leverage investments a development team can make. It catches bugs before they reach users, makes deployments routine rather than stressful, and creates a tight feedback loop that keeps engineers moving quickly. This post builds a production-grade pipeline for a Next.js app using GitHub Actions.

## What "Production-Grade" Means Here

- Every push runs automated tests
- Pull requests get preview deployments
- Merges to `main` deploy automatically
- Failed deployments can be rolled back in under two minutes
- Pipeline runs in under five minutes on a warm cache

## Repository Structure

```
.
├── .github/
│   └── workflows/
│       ├── ci.yml          # Runs on every push / PR
│       └── deploy.yml      # Runs on merge to main
├── src/
├── tests/
├── package.json
└── next.config.ts
```

## The CI Workflow

This runs on every push and pull request. It validates that the code is correct before any deployment happens.

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: ["**"]
  pull_request:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npx tsc --noEmit

      - name: Lint
        run: npm run lint

      - name: Unit tests
        run: npm test -- --ci --coverage

      - name: Build
        run: npm run build

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
```

The order matters: type-check and lint are cheap and fast, so they run first and fail early. Build runs last — it's the most expensive step.

## Caching for Speed

Without caching, installing `node_modules` is the slowest step. The `cache: "npm"` option in `setup-node` handles this for npm. For more control:

```yaml
- name: Cache Next.js build
  uses: actions/cache@v4
  with:
    path: .next/cache
    key: ${{ runner.os }}-nextjs-${{ hashFiles('package-lock.json') }}-${{ hashFiles('src/**/*.{ts,tsx}') }}
    restore-keys: |
      ${{ runner.os }}-nextjs-${{ hashFiles('package-lock.json') }}-
      ${{ runner.os }}-nextjs-
```

Caching the `.next/cache` directory reduces incremental build times from ~60s to ~10s on most projects.

## Preview Deployments on Pull Requests

Preview deployments let reviewers test changes in a real environment before merging. With Vercel:

```yaml
# Add to ci.yml jobs
  preview:
    runs-on: ubuntu-latest
    needs: ci
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4

      - name: Deploy preview
        uses: amondnet/vercel-action@v25
        id: vercel-deploy
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

      - name: Comment preview URL
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `Preview deployed to: ${{ steps.vercel-deploy.outputs.preview-url }}`
            })
```

## Production Deployment

Production deployments only happen when CI passes on `main`:

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to production
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"
```

The `environment: production` key enables GitHub's environment protection rules — you can require a manual approval step before production deploys, add required reviewers, or restrict which branches can deploy.

## Rollback Strategy

With immutable deployments (Vercel, Netlify, Fly.io), rollback is instant: just promote the previous deployment to production via the dashboard or CLI.

For self-hosted environments, tag releases and keep the previous image available:

```yaml
- name: Tag release
  run: |
    git tag "release-$(date +%Y%m%d%H%M%S)"
    git push --tags
```

```bash
# Rollback: redeploy the previous tag
git checkout release-20260208143022
git push origin HEAD:main --force-with-lease
```

## Secrets Management

Never hardcode secrets. Store them in GitHub Actions secrets and access them via `${{ secrets.SECRET_NAME }}`. For production environments:

- Use GitHub Environments to scope secrets to specific environments
- Rotate secrets regularly; automate rotation where possible
- Audit which workflows have access to production secrets

## Metrics to Track

Once your pipeline is running, measure:

- **Pipeline duration** — aim for under 5 minutes from push to green
- **Failure rate** — what percentage of runs fail? Where do they fail?
- **Deployment frequency** — how often are you shipping to production?
- **Mean time to recovery** — how long does it take to fix a broken build?

A slow pipeline that nobody trusts is worse than no pipeline. Keep it fast and keep it honest.
