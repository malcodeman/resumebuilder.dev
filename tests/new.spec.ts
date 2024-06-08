import { test, expect } from "@playwright/test";
import { playwrightUtils } from "lib/playwrightUtils";

test.describe("New resume page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/resumes/new");
  });
  test("Redirect", async ({ page, context, baseURL }) => {
    await expect(page.getByTestId("spinner")).toBeVisible();

    const resume = await playwrightUtils.getResume({ context });

    await expect(page).toHaveURL(`${baseURL}/en/resumes/${resume.id}`);
  });
});
