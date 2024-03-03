import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "de", "bs"],
  defaultLocale: "en",
});

export const config = {
  matcher: ["/", "/(en|de|bs)/:path*"],
};
