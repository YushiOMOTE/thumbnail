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

## Setup

```sh
npm install
```

## Develop

```sh
gatsby develop
```

## Build

```sh
gatsby build --prefix-paths
```

## Config

Use environment variables to change the parameters. `dotenv` files (`.env.development` and `.env.production`) are also available.

```sh
## Title.
THUMBNAIL_TITLE=Shacho

## Path to images to import.
THUMBNAIL_IMAGE_PATH=/home/yushiomote/dev/ketakuma/stamps

## Prefix of the thumbnail URL.
# THUMBNAIL_PATH_PREFIX=/thumbnail-demo

## Set in case the actual image location and the thumbnail location differ.
# THUMBNAIL_IMAGE_BASE_URL=http://localhost:8001/

## The loop count of gif image (-1 for no loop, 0 or forever for infinit loop)
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
# THUMBNAIL_IMAGE_SMALL_ENABLE=true
# THUMBNAIL_IMAGE_SMALL_WIDTH=100
# THUMBNAIL_IMAGE_SMALL_HEIGHT=100
# THUMBNAIL_IMAGE_SMALL_SCALE=0.5x0.5
# THUMBNAIL_IMAGE_SMALL_MATCH="/(.*)/"
# THUMBNAIL_IMAGE_SMALL_MATCH_REPLACE="![]($1)"

## Extra options passed to gifsicle
# THUMBNAIL_GIFSICLE_OPTIONS=""
```
