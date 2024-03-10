import React from "react";
import { enUS, bs, de } from "date-fns/locale";
import { useLocale } from "next-intl";

function useDateFnsLocale() {
  const language = useLocale();
  const [locale, setLocale] = React.useState(enUS);

  React.useEffect(() => {
    function getLocale() {
      switch (language) {
        default:
        case "en":
          return enUS;
        case "bs":
          return bs;
        case "de":
          return de;
      }
    }
    setLocale(getLocale());
  }, [language]);

  return {
    locale,
  };
}

export default useDateFnsLocale;
