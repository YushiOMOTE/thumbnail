require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    pathPrefix: process.env.THUMBNAIL_PATH_PREFIX || "/",
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
