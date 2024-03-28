import { test, expect } from "@playwright/test";
import utils from "e2e/utils";

test.describe("New resume page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/resumes/new");
  });
  test("Redirect", async ({ page, context, baseURL }) => {
    await expect(page.getByTestId("spinner")).toBeVisible();

    const resume = await utils.getResume({ context });

    await expect(page).toHaveURL(`${baseURL}/en/resumes/${resume.id}`);
  });
});
