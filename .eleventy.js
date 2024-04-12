module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/scripts");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/videos");
    eleventyConfig.addPassthroughCopy("src/404.html");
    eleventyConfig.addPassthroughCopy("src/favicon.ico");
  
    return {
      dir: {
        input: "src",
        output: "dist"
      }
    }
  };