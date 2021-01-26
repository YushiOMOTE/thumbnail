# thumbnail

Gatsby project to generate GIF image thumbnail, where you can copy the image URL to clipboard by just clicking images.

### Features

* Copy-to-clipboard.
* The actual text copied to clipboard is easy to customize by regex.
   * By default, it's optimized for markdown: `![](Image URL)`
* Searching by image names.
* Pre-processing GIF image (e.g. resizing, optimizing, setting loopcount...)
* Selecting two image types: large and small.
* Pagination.

![](https://github.com/YushiOMOTE/thumbnail/blob/master/assets/demo.png)

(* The GIF images are from [here](https://github.com/jmhobbs/cultofthepartyparrot.com))

## Try it out

Try it out with example images.

```sh
# Checkout example images from cultofthepartyparrot.com
git submodule update --init

# Install dependencies
yarn install

# Run it for testing
yarn develop
```

Check `http://127.0.0.1:8000` in your browser.

## Build the static site

```sh
yarn build
```

The site is installed to the sub-directory `public`.

## Build as a desktop app

To launch the app for testing

```sh
yarn electron-dev
```

To pack the app as an executable

```sh
yarn electron-pack
```

## Config

Use environment variables to change the settings. `dotenv` files (`.env.development` and `.env.production`) are also available.

```sh
## Title.
THUMBNAIL_TITLE=Shacho

## Path to images to import.
THUMBNAIL_IMAGE_PATH=cultofthepartyparrot.com/parrots/hd

## Prefix of the thumbnail URL.
# THUMBNAIL_PATH_PREFIX=/thumbnail-demo

## Set in case the actual image location and the thumbnail location differ.
# THUMBNAIL_IMAGE_BASE_URL=http://localhost:8001/

## The loop count of gif image (-1 for no loop, 0 for infinit loop)
THUMBNAIL_IMAGE_LOOPCOUNT=forever

## The location of images in the thumbnail site.
# THUMBNAIL_IMAGE_SITEPATH=/static/images

## Lage image configuration.
# THUMBNAIL_IMAGE_LARGE_WIDTH=100
# THUMBNAIL_IMAGE_LARGE_HEIGHT=100
# THUMBNAIL_IMAGE_LARGE_SCALE=1
# THUMBNAIL_IMAGE_LARGE_MATCH="/(.*)/"
# THUMBNAIL_IMAGE_LARGE_MATCH_REPLACE="![]($1)"

## Small image configuration
THUMBNAIL_IMAGE_SMALL_ENABLE=true
# THUMBNAIL_IMAGE_SMALL_WIDTH=100
# THUMBNAIL_IMAGE_SMALL_HEIGHT=100
# THUMBNAIL_IMAGE_SMALL_SCALE=0.5x0.5
# THUMBNAIL_IMAGE_SMALL_MATCH="/(.*)/"
# THUMBNAIL_IMAGE_SMALL_MATCH_REPLACE="![]($1)"

## Extra options passed to gifsicle
# THUMBNAIL_GIFSICLE_OPTIONS=""
```
