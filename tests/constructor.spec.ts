import { test, expect } from '@playwright/test';

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/constructor.har', {
      url: '**/api/**',
      notFound: 'abort',
    });
  });

  test('Добавление ингредиента в конструктор', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('ingredient').first()).toBeVisible();

    const bun = page
      .getByTestId('ingredient')
      .filter({ hasText: 'Краторная булка' })
      .first();
    await bun.locator('button').filter({ hasText: 'Добавить' }).click();

    await expect(page.getByTestId('constructor-bun-top')).toBeVisible();
    await expect(page.getByTestId('constructor-bun-top')).toContainText(
      'Краторная булка'
    );
  });

  test('Открытие и закрытие модального окна ингредиента', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('ingredient').first()).toBeVisible();

    const ingredient = page
      .getByTestId('ingredient')
      .filter({ hasText: 'Биокотлета' })
      .first();

    await ingredient.click();
    const modal = page.getByTestId('modal');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Биокотлета');

    await page.getByTestId('modal-close').click();
    await expect(modal).not.toBeVisible();
  });

  test('Создание заказа и очистка конструктора', async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'accessToken',
        value: 'Bearer mock-access-token',
        url: 'http://localhost:4000',
      },
    ]);
    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'mock-refresh-token');
    });

    await page.goto('/');
    await expect(page.getByTestId('ingredient').first()).toBeVisible();

    const bun = page
      .getByTestId('ingredient')
      .filter({ hasText: 'Краторная булка' })
      .first();
    await bun.locator('button').filter({ hasText: 'Добавить' }).click();

    const main = page
      .getByTestId('ingredient')
      .filter({ hasText: 'Биокотлета' })
      .first();
    await main.locator('button').filter({ hasText: 'Добавить' }).click();

    await page.getByTestId('order-button').click();

    const modal = page.getByTestId('modal');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('99999');

    await page.getByTestId('modal-close').click();
    await expect(modal).not.toBeVisible();

    await expect(page.getByTestId('constructor-bun-top')).not.toBeVisible();
    await expect(page.getByTestId('constructor-bun-bottom')).not.toBeVisible();

    await context.clearCookies();
    await page.evaluate(() => localStorage.clear());
  });
});