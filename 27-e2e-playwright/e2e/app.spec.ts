import { test, expect } from '@playwright/test';

test('displays app title', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-testid="app-title"]')).toHaveText('Playwright E2E Testing');
});

test('adds a todo item', async ({ page }) => {
  await page.goto('/');
  const input = page.locator('[data-testid="todo-input"]');
  await input.fill('Buy groceries');
  await page.locator('[data-testid="add-btn"]').click();
  await expect(page.locator('[data-testid="counter"]')).toHaveText('Items: 1');
  await expect(page.locator('[data-testid="todo-item"]')).toHaveText('Buy groceries');
});

test('shows empty message when no todos', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-testid="empty-msg"]')).toBeVisible();
});

test('removes a todo item', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-testid="todo-input"]').fill('Task 1');
  await page.locator('[data-testid="add-btn"]').click();
  await page.locator('[data-testid="todo-checkbox"]').check();
  await expect(page.locator('[data-testid="counter"]')).toHaveText('Items: 0');
});

test('adds multiple todos', async ({ page }) => {
  await page.goto('/');
  const input = page.locator('[data-testid="todo-input"]');
  const addBtn = page.locator('[data-testid="add-btn"]');
  await input.fill('First');
  await addBtn.click();
  await input.fill('Second');
  await addBtn.click();
  await input.fill('Third');
  await addBtn.click();
  await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(3);
});
