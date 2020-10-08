# thumbnail

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
THUMBNAIL_PATH_PREFIX=/ketakuma
THUMBNAIL_TITLE=Shacho
THUMBNAIL_IMAGE_BASE_URL=http://localhost:8001/
THUMBNAIL_IMAGE_PATH=/home/yushiomote/dev/ketakuma/stamps
```

* `THUMBNAIL_PATH_PREFIX`: Add the prefix to the site URL.
* `THUMBNAIL_TITLE`: Set the title of the page.
* `THUMBNAIL_IMAGE_BASE_URL`: Set the base url of the images.
* `THUMBNAIL_IMAGE_PATH`: The path to the directory which contains images.
