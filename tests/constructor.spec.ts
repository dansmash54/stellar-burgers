import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('*/**/api/ingredients', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        path: 'tests/hars/ingredients.json'
      })
    );

    await page.route('*/**/api/orders', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        path: 'tests/hars/order.json'
      })
    );

    await page.route('*/**/api/auth/user', (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        path: 'tests/hars/user.json'
      })
    );
  });

  test('Добавление ингредиента в конструктор', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="ingredient"]');

    const bun = page
      .locator('[data-testid="ingredient"]')
      .filter({ hasText: 'Краторная булка' })
      .first();
    await bun.locator('button').filter({ hasText: 'Добавить' }).click();
    await expect(
      page.locator('[data-testid="constructor-bun-top"]')
    ).toBeVisible();
  });

  test('Открытие и закрытие модального окна ингредиента', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="ingredient"]');

    const ingredient = page
      .locator('[data-testid="ingredient"]')
      .filter({ hasText: 'Биокотлета' })
      .first();
    await ingredient.click();

    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Биокотлета');

    await page.locator('[data-testid="modal-close"]').click();
    await expect(modal).not.toBeVisible();
  });

  test('Создание заказа', async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'accessToken',
        value: 'test-access-token',
        domain: 'localhost',
        path: '/'
      }
    ]);
    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'test-refresh-token');
    });

    await page.goto('/');
    await page.waitForSelector('[data-testid="ingredient"]');

    const bun = page
      .locator('[data-testid="ingredient"]')
      .filter({ hasText: 'Краторная булка' })
      .first();
    await bun.locator('button').filter({ hasText: 'Добавить' }).click();

    const main = page
      .locator('[data-testid="ingredient"]')
      .filter({ hasText: 'Биокотлета' })
      .first();
    await main.locator('button').filter({ hasText: 'Добавить' }).click();

    await page.locator('[data-testid="order-button"]').click();

    const modal = page.locator('[data-testid="modal"]');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('99999');

    await page.locator('[data-testid="modal-close"]').click();
    await expect(modal).not.toBeVisible();
  });
});
