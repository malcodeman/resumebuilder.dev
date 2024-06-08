import createMiddleware from "next-intl/middleware";
import { LOCALES, LOCALES_PREFIX } from "navigation";

export default createMiddleware({
  defaultLocale: "en",
  localePrefix: LOCALES_PREFIX,
  locales: LOCALES,
});

export const config = {
  matcher: ["/", "/(en|de|bs)/:path*"],
};
