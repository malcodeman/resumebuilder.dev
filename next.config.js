const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
    disable: process.env.NODE_ENV === "development",
  },
  productionBrowserSourceMaps: true,
  async rewrites() {
    return [
      {
        source: "/resumes/*",
        destination: "/resumes/[id].html",
      },
    ];
  },
});
