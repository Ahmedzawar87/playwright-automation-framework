# Playwright Automation Framework

## Tech Stack
- Playwright
- TypeScript

## Features
- Login Test
- Purchase Flow (E2E)
- Negative Testing

## Run Tests
```bash
npm install
npx playwright install
npx playwright test
```

## Helpful Locator Workflow
Use Playwright Codegen to discover robust locators:

```bash
npx playwright codegen https://www.saucedemo.com
```

Prefer this locator order:
- `getByRole()`
- `getByPlaceholder()`
- `getByText()`
- `locator('#id')` as fallback
