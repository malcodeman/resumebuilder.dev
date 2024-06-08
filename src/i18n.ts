import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { LOCALES } from "navigation";

export default getRequestConfig(async ({ locale }) => {
  if (!LOCALES.includes(locale)) {
    return notFound();
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
