const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["bs", "de", "en"],
    localePath: path.resolve("./public/locales"),
  },
};
