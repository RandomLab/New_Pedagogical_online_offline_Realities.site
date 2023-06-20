const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const Image = require("@11ty/eleventy-img")

const embedEverything = require("eleventy-plugin-embed-everything")

const markdownIt = require("markdown-it")
const markdownItFootnote = require("markdown-it-footnote")

const path = require('path')

const { 
    getAllArticles,
    getAllChapitres
} = require('./config/collections')
  

module.exports = function (eleventyConfig) {
    
    let options = {
        html: true, // Enable HTML tags in source
        breaks: false,  // Convert '\n' in paragraphs into <br>
        linkify: false // Autoconvert URL-like text to links
      }

    let markdownLib =  markdownIt(options).use(markdownItFootnote)

    eleventyConfig.setLibrary('md', markdownLib)

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
    eleventyConfig.addLayoutAlias('about', 'layouts/about')



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