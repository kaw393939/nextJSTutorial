const { test, expect } = require('@playwright/test');
const nextjstest = 'http://localhost:3000'; // Replace with the URL of the student's resume page
const nextjstestssr = 'http://localhost:3000/posts/ssg-ssr'
const nextjsrender = 'http://localhost:3000/posts/pre-rendering'
/* This test checks if `Blog` is present in the header */
test('Check Header for `name`', async ({ page }) => {
  await page.goto(nextjstest);
  const headerText = await page.textContent('h2');
  await expect(headerText).toContain('Blog');
});

/* This test checks if a yourname is present */
test('Check Constant Presence', async () => {
  const name = 'Yourname';
  expect(name).toBeDefined();
});

test('Check Header for Your Name on SSR page', async ({ page }) => {
  await page.goto(nextjstestssr);

  const name = 'Yourname';
  const headerSelector = `header h2:has-text("${name}")`;
  await expect(page.locator(headerSelector)).toBeVisible();
});

/* This test checks if the <h1> in the <article> contains specific content */
test('Check <h1> in <article> for Specific Content on SSR page', async ({ page }) => {
  await page.goto(nextjstestssr);

  const articleSelector = 'article';
  const expectedContent = 'When to Use Static Generation v.s. Server-side Rendering';
  const headerSelector = `${articleSelector} h1:has-text("${expectedContent}")`;

  await expect(page.locator(headerSelector)).toBeVisible();
});
test('Check Header for Your Name on Render Page', async ({ page }) => {
  await page.goto(nextjsrender);

  const name = 'Yourname';
  const headerSelector = `header h2:has-text("${name}")`;
  await expect(page.locator(headerSelector)).toBeVisible();
});

/* This test checks if the <h1> in the <article> contains specific content */
test('Check <h1> in <article> for Specific Content on Render Page', async ({ page }) => {
  await page.goto(nextjsrender);

  const articleSelector = 'article';
  const expectedContent = 'Two Forms of Pre-rendering';
  const headerSelector = `${articleSelector} h1:has-text("${expectedContent}")`;

  await expect(page.locator(headerSelector)).toBeVisible();
});
/* This test checks that the responsive meta tag is present */
test('Check Responsive Meta Tag', async ({ page }) => {
  await page.goto(nextjsrender);
  const viewportMeta = await page.getAttribute('meta[name="viewport"]', 'content');
  await expect(viewportMeta).toBe('width=device-width');
});

/* This test checks that the responsive meta tag is present */
test('Check Responsive Meta Tag for Render', async ({ page }) => {
  await page.goto(nextjstestssr);
  const viewportMeta = await page.getAttribute('meta[name="viewport"]', 'content');
  await expect(viewportMeta).toBe('width=device-width');
});

/* This test checks for correct redirection on clicking an <a> element */
test('Check Redirection on Click', async ({ page }) => {
  await page.goto(nextjstestssr);

  const expectedURL = 'http://localhost:3000/';

  // Click the <a> element with the text "back to home"
  await Promise.all([
    page.waitForNavigation({ timeout: 10000 }), // Increased timeout to 10 seconds
    page.click('a:has-text("back to home")', { timeout: 10000 }), // Increased timeout to 10 seconds
  ]);

  const currentURL = page.url();

  expect(currentURL).toBe(expectedURL);
});