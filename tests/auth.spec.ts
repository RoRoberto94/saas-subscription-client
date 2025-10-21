import { test, expect } from "@playwright/test";

// E2E test for the complete user authentication flow (Register -> Login -> Dashboard).
test.describe("Authentication Flow", () => {
  const uniqueEmail = `testuser_${Date.now()}@example.com`;
  const testPassword = "Password123";

  test("should allow a user to register, log in, and see the dashboard", async ({
    page,
  }) => {
    await page.goto("/register");

    await expect(
      page.getByRole("heading", { name: "Create an Account" })
    ).toBeVisible();

    await page.getByLabel("Email").fill(uniqueEmail);
    await page.getByLabel("Password").fill(testPassword);

    await page.getByRole("button", { name: "Register" }).click();

    await page.goto("/login");

    await expect(
      page.getByRole("heading", { name: "Welcome Back" })
    ).toBeVisible();

    await page.getByLabel("Email").fill(uniqueEmail);
    await page.getByLabel("Password").fill(testPassword);
    await page.getByRole("button", { name: "Log In" }).click();

    await page.waitForURL("/dashboard");

    const welcomeMessage = page.getByRole("heading", { name: /welcome/i });
    await expect(welcomeMessage).toContainText(uniqueEmail);

    const subscriptionPrompt = page.getByText(
      "You don't have an active subscription."
    );
    await expect(subscriptionPrompt).toBeVisible();
  });
});
