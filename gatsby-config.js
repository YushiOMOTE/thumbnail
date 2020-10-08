require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    siteMetadata: {
        title: process.env.THUMBNAIL_TITLE,
        imageBaseURL: process.env.THUMBNAIL_IMAGE_BASE_URL,
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: process.env.THUMBNAIL_IMAGE_PATH,
            },
        },
    ],
}
