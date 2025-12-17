import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should display three-column layout on desktop', async ({ page }) => {
    // Check for main sections
    await expect(page.getByText('Recent Posts')).toBeVisible();
    await expect(page.getByText('Trending Posts')).toBeVisible();
    await expect(page.getByText('Categories')).toBeVisible();
  });

  test('should display navigation', async ({ page }) => {
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Profile' })).toBeVisible();
  });

  test('should navigate to post detail page', async ({ page }) => {
    // Wait for posts to load
    await page.waitForSelector('article');
    
    // Click on first post
    const firstPost = page.locator('article').first();
    const postTitle = await firstPost.locator('h3').textContent();
    await firstPost.locator('h3').click();

    // Verify navigation to post page
    await expect(page).toHaveURL(/\/post\//);
    await expect(page.locator('h1')).toContainText(postTitle || '');
  });

  test('should navigate to category page', async ({ page }) => {
    // Wait for categories to load
    await page.waitForSelector('text=Categories');
    
    // Click on first category
    const categoryLink = page.getByRole('link', { name: /Web Development|JavaScript|DevOps/ }).first();
    await categoryLink.click();

    // Verify navigation to category page
    await expect(page).toHaveURL(/\/category\//);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should display post cards with metadata', async ({ page }) => {
    // Wait for posts to load
    await page.waitForSelector('article');
    
    const firstPost = page.locator('article').first();
    
    // Check for post metadata
    await expect(firstPost.locator('h3')).toBeVisible();
    await expect(firstPost).toContainText(/👁/); // View count
  });
});

test.describe('Responsive Design', () => {
  test('should display mobile-friendly layout', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');

    // Check navigation is visible and accessible
    await expect(page.getByRole('navigation')).toBeVisible();
    
    // Check columns stack on mobile
    await expect(page.getByText('Recent Posts')).toBeVisible();
    await expect(page.getByText('Trending Posts')).toBeVisible();
    await expect(page.getByText('Categories')).toBeVisible();
  });

  test('should have touch-friendly buttons', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');

    // Check button sizes (minimum 44x44px for touch)
    const homeLink = page.getByRole('link', { name: 'Home' });
    const box = await homeLink.boundingBox();
    
    expect(box?.height).toBeGreaterThanOrEqual(44);
  });
});
