require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    siteMetadata: {
        title: process.env.THUMBNAIL_TITLE || `Thumbnail`,
        description: `GIF image thumbnail where you can copy the image URL to clipboard by just clicking images.`,
        author: `@yushiomote`,
    },
    pathPrefix: process.env.THUMBNAIL_PATH_PREFIX || "/",
    plugins: [
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`,
            },
        },
    ],
}
