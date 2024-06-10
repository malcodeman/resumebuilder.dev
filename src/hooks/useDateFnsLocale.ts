import React from "react";
import { enUS, bs, de } from "date-fns/locale";
import { useLocale } from "next-intl";

function useDateFnsLocale() {
  const language = useLocale();
  const [locale, setLocale] = React.useState(enUS);

  React.useEffect(() => {
    function getLocale() {
      switch (language) {
        case "bs":
          return bs;
        case "de":
          return de;
        case "en":
        default:
          return enUS;
      }
    }
    setLocale(getLocale());
  }, [language]);

  return {
    locale,
  };
}

export { useDateFnsLocale };
