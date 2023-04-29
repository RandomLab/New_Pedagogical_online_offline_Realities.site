const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const embedYouTube = require("eleventy-plugin-youtube-embed")
const Image = require("@11ty/eleventy-img")
const path = require('path')

const { 
    getAllArticles
    // getAllPosts, 
    // getCategoryList,
    // getCategorisedPosts 
  } = require('./config/collections')
  

module.exports = function (eleventyConfig) {

    /******************/
    /* config plugin   */
    /******************/
    eleventyConfig.addPlugin(eleventyNavigationPlugin)
    eleventyConfig.addPlugin(embedYouTube)
    // eleventyConfig.addPlugin(eleventyImagePlugin, {
	// 	// Set global default options
	// 	formats: ["webp", "jpeg"],
	// 	urlPath: "/img/",

	// 	// Notably `outputDir` is resolved automatically
	// 	// to the project output directory

	// 	defaultAttributes: {
	// 		loading: "lazy",
	// 		decoding: "async"
	// 	}
	// })

    eleventyConfig.addShortcode("image", async function(src, alt, sizes) {
        
        let imageSrc = `${path.dirname(this.page.inputPath)}/${src}`

		let metadata = await Image(imageSrc, {
			widths: [300, 600],
			formats: ["webp"],
            outputDir: path.dirname(this.page.outputPath),
            urlPath: this.page.url
		})

		let imageAttributes = {
			alt,
			sizes,
			loading: "lazy",
			decoding: "async",
		}

		// You bet we throw an error on a missing alt (alt="" works okay)
		return Image.generateHTML(metadata, imageAttributes);
	})

    // eleventyConfig.setFrontMatterParsingOptions({
        // excerpt: true,
        // excerpt_separator: "<!-- excerpt -->",
        // excerpt_alias: 'excerpt'
    //   })
    
    /******************/
    /* files > dist   */
    /******************/
    eleventyConfig.addPassthroughCopy('./src/assets/js/')
    eleventyConfig.addPassthroughCopy('./src/assets/css/')
    eleventyConfig.addPassthroughCopy('./src/assets/fonts/')

    /*****************/
    /* layouts         */
    /*****************/
    eleventyConfig.addLayoutAlias('page', 'layouts/page')

    /*=================*/
    /*   Collections   */
    /*=================*/
    eleventyConfig.addCollection('articles', getAllArticles)
    // eleventyConfig.addCollection('categoryList', getCategoryList)
    // eleventyConfig.addCollection('categorisedPosts', getCategorisedPosts)
    
    /*****************/
    /* watch         */
    /*****************/
    // config.addWatchTarget('./src/css/')

  
    return {
        markdownTemplateEngine: 'njk',
        dir: {
            input: 'src',
            output: '_site',
            includes: '_includes',
            data: '_data'
        }
    }
}