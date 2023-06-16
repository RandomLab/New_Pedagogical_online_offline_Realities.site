const slugify = require('slugify')

const getAllArticles = (collectionApi) => {

    // const articles = collectionApi.getFilteredByGlob('./src/introduction/*.md')
    const articles = collectionApi.getFilteredByTag("article")

    // console.log(articles[0].page)
    
    // const pages = []
    
    // articles.map((item) => {
    //     // console.log(item)
    //     pages.push({
        //         'key': 'test',
    //         'name': 'test'
    //     })
    // })
    
    // console.log(pages)
    
    // return pages
    
    for (let i = 0; i < articles.length; i++) {
        const prevPost = articles[i - 1]
        const nextPost = articles[i + 1]
        articles[i].data['prevPost'] = prevPost
        articles[i].data['nextPost'] = nextPost
    }
    
    console.log(articles[0].data)
    
    return articles

}

/* Creating a collection containing all blogposts by filtering based on folder and filetype */
// const getAllPosts = (collectionApi) => {
//     return collectionApi.getFilteredByGlob('./src/md/*.md')
//     .reverse()
// }

// const getCategoryList = (collectionApi) => {
//   const catPages = []
//   let categories = []
//   const blogPosts = collectionApi.getFilteredByGlob('./src/md/*.md')

//   blogPosts.map((item) => {
//     console.log(item)
//     categories.push(item.data.category)
//   })

//   categories = categories.sort(sortAlphabetically)
//   const temp = [...new Set(categories)]

//   temp.forEach((category) => {
//     console.log(category)
//     // const slug = strToSlug(category);

//     // if(slug !== 'in-the-spotlight') {
//     //   catPages.push({
//     //     'key': slug,
//     //     'name': category 
//     //   })
//     // }
//   })

//   return catPages
// }

// const getCategorisedPosts = (collectionApi) => {
//   const categorisedPosts = {}

//   collectionApi.getFilteredByGlob('./src/md/*.md').forEach(item => {
//     const category = item.data.category
      
//     // Ignore the ones without a category
//     if (typeof category !== 'string')
//     return

//     const slug = strToSlug(category)

//     if (Array.isArray(categorisedPosts[slug])) {
//       categorisedPosts[slug].push(item)
//     } else {
//       categorisedPosts[slug] = [item]
//     }
//   })

//   return categorisedPosts
// }

module.exports = {
    getAllArticles
//   getAllPosts,
//   getCategoryList,
//   getCategorisedPosts
}


// function strToSlug(str) {

//     console.log(str)

//     const options = {
//         replacement: "-",
//         remove: /[&,+()$~%.'":*?<>{}]/g,
//         lower: true,
//     }
  
//     return slugify(str, options)
// }


// function sortAlphabetically(a, b) {
//   return a.localeCompare(b, "en", { sensitivity: "base" })
// }