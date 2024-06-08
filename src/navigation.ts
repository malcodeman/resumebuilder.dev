import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const LOCALES = ["en", "de", "bs"];
export const LOCALES_PREFIX = "always";
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales: LOCALES,
    localePrefix: LOCALES_PREFIX,
  });
