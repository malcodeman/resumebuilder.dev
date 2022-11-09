import React from "react";
import { enUS, bs, de } from "date-fns/locale";
import { useTranslation } from "next-i18next";

function useDateFnsLocale() {
  const { i18n } = useTranslation();
  const [locale, setLocale] = React.useState(enUS);

  React.useEffect(() => {
    function getLocale() {
      switch (i18n.language) {
        case "en":
        case "default":
          return enUS;
        case "bs":
          return bs;
        case "de":
          return de;
      }
    }
    setLocale(getLocale());
  }, [i18n.language]);

  return {
    locale,
  };
}

export default useDateFnsLocale;
