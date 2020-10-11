require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    pathPrefix: process.env.THUMBNAIL_PATH_PREFIX || "/",
    plugins: [],
}
