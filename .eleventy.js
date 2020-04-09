const { DateTime } = require("luxon");
const util = require("util");

module.exports = function(eleventyConfig) {
  // Date formatting (human readable)
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  // Date formatting (machine readable)
  eleventyConfig.addFilter("machineDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  eleventyConfig.addFilter("limit", (arr, limit) => {
    return arr.slice(0, limit);
  });

  eleventyConfig.addFilter("dump", obj => {
    return util.inspect(obj);
  });

  // Don't process folders with static assets e.g. images
  eleventyConfig.addPassthroughCopy("_src/assets/styles/");
  eleventyConfig.addPassthroughCopy("_src/assets/scripts/");
  eleventyConfig.addPassthroughCopy("_src/assets/static/");

  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "_src",
      data: "../_data"
    }
  };
};
