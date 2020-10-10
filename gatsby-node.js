const { createFilePath } = require(`gatsby-source-filesystem`)
const fs = require('fs-extra')
const path = require('path')
const gifsicle = require('gifsicle')
const { execFile } = require('child_process')

function processGif(options, src, dest) {
    var args = ['-o', dest];

    if (options.width) {
        args.push('--resize-width');
        args.push(options.width);
    }
    if (options.height) {
        args.push('--resize-height');
        args.push(options.height);
    }
    if (options.scale) {
        args.push('--scale');
        args.push(options.scale);
    }
    if (options.loop) {
        if (options.loop === '-1') {
            args.push('--no-loopcount');
        } else if (options.loop === '0') {
            args.push('--loopcount=forever')
        } else {
            args.push(`--loopcount=${options.loop}`);
        }
    }
    args.push(src);

    execFile(gifsicle, args, err => {
        if (err) {
            console.log(`Cannot process image: ${src}: ${err}`)
        }
    });

    console.debug(`Created file: ${dest}`);
}

function processLargeGif(src, dest) {
    processGif({
        width: process.env.THUMBNAIL_IMAGE_LARGE_WIDTH,
        height: process.env.THUMBNAIL_IMAGE_LARGE_HEIGHT,
        scale: process.env.THUMBNAIL_IMAGE_LARGE_SCALE,
        loop: process.env.THUMBNAIL_IMAGE_LOOPCOUNT,
    }, src, dest)
}

function processSmallGif(src, dest) {
    processGif({
        width: process.env.THUMBNAIL_IMAGE_SMALL_WIDTH,
        height: process.env.THUMBNAIL_IMAGE_SMALL_HEIGHT,
        scale: process.env.THUMBNAIL_IMAGE_SMALL_SCALE,
        loop: process.env.THUMBNAIL_IMAGE_LOOPCOUNT,
    }, src, dest)
}

exports.sourceNodes = (options) => {
    console.log("hi");
    const { reporter } = options;

    var src = process.env.THUMBNAIL_IMAGE_PATH;
    var suffix = process.env.THUMBNAIL_IMAGE_SUFFIX || '/static/images';
    var dest = `${__dirname}/public/${suffix}`;
    var large = `${dest}/large`;
    var small = `${dest}/small`;

    [large, small].forEach((dest) => {
        fs.mkdirSync(dest, { recursive: true }, (err) => {
            if (err) {
                console.log(`Cannot create directory: ${dest}`)
            }
        });
    });

    fs.readdir(src, (err, files) => {
        if (err) {
            console.log(`Cannot read directory: ${src}`);
            return;
        }

        var gifs = files.filter((file) => {
            return path.extname(file).toLowerCase() == ".gif"
        });

        gifs.forEach((file) => {
            processLargeGif(path.join(src, file), path.join(large, file));
            processSmallGif(path.join(src, file), path.join(small, file));
        })
    })
}
