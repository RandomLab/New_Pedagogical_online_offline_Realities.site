const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const embedEverything = require("eleventy-plugin-embed-everything")
const Image = require("@11ty/eleventy-img")
const path = require('path')

const { 
    getAllArticles,
    getAllChapitres
    // getAllPosts, 
    // getCategoryList,
    // getCategorisedPosts 
  } = require('./config/collections')
  

module.exports = function (eleventyConfig) {

    /******************/
    /* config plugin   */
    /******************/
    eleventyConfig.addPlugin(eleventyNavigationPlugin)
    eleventyConfig.addPlugin(embedEverything, {
        use: ['youtube'],
        youtube: {
            options: {
                allowAttrs: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                allowAutoplay: false,
                allowFullscreen: false,
                embedClass: 'youtube',
                lazy: false,
                lite: false,
                modestBranding: false,
                noCookie: true,
                recommendSelfOnly: false,
            }
        }
    })
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
			widths: [600, 1200],
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

    eleventyConfig.addFilter('log', value => {
        console.log(value)
    })
    
    /******************/
    /* files > dist   */
    /******************/
    eleventyConfig.addPassthroughCopy('./src/assets/js/')
    eleventyConfig.addPassthroughCopy('./src/assets/css/')
    eleventyConfig.addPassthroughCopy('./src/assets/fonts/')
    eleventyConfig.addPassthroughCopy('./src/pdf/')
    eleventyConfig.addPassthroughCopy({ '.src/robots.txt': '/robots.txt' })

    /*****************/
    /* layouts         */
    /*****************/
    eleventyConfig.addLayoutAlias('page', 'layouts/page')
    eleventyConfig.addLayoutAlias('video', 'layouts/video')


    /*=================*/
    /*   Collections   */
    /*=================*/
    eleventyConfig.addCollection('articles', getAllArticles)
    eleventyConfig.addCollection('chapitres', getAllChapitres)
    // eleventyConfig.addCollection('categoryList', getCategoryList)
    // eleventyConfig.addCollection('categorisedPosts', getCategorisedPosts)
    
    // eleventyConfig.addCollection('posts', function (collection) {
    //     const coll = collection.getFilteredByTag("post")
    //     console.log(coll)
    // })


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