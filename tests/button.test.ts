import { expect, test } from '@playwright/test';

test('button', async ({ page }) => {
  await page.goto('/tests/button');
  const container = page.getByTestId('container');
  await expect(container).toHaveScreenshot();
});

test('button:hover', async ({ page }) => {
  await page.goto('/tests/button');
  const container = page.getByTestId('container');

  const target = page.getByTestId('target');
  await target.hover();

  await expect(container).toHaveScreenshot();
});
test('button:focus', async ({ page }) => {
  await page.goto('/tests/button');
  const container = page.getByTestId('container');

  const target = page.getByTestId('target');
  await target.focus();

  await expect(container).toHaveScreenshot();
});
