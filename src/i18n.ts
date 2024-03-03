import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

const locales = ["en", "de", "bs"];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) {
    return notFound();
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
