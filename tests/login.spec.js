const { test, expect } = require("@playwright/test");

test.describe("Test procesu logowania i dostępu do profilu użytkownika", () => {
  const loginUrl = "http://localhost:3000/user/login";
  const profileUrl = "http://localhost:3000/user/profile";
  const validCredentials = { email: "bujnar@spoko.pl", password: "haslo123" };

  test("Użytkownik może zalogować się i uzyskać dostęp do profilu", async ({
    page,
  }) => {
    await page.goto(loginUrl);

    await page.fill('input[name="email"]', validCredentials.email);
    await page.fill('input[name="password"]', validCredentials.password);

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL("http://localhost:3000/user/profile");

    await page.goto(profileUrl);

    await expect(page).toHaveURL(profileUrl);
  });

  test("Niezalogowany użytkownik jest przekierowywany na stronę logowania", async ({
    page,
  }) => {
    await page.goto(profileUrl);

    await expect(page).toHaveURL(loginUrl);
    await expect(page.locator("h1")).toContainText("Login to app");
  });
});
