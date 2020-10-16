const util = require('util');
const { createFilePath } = require(`gatsby-source-filesystem`)
const fs = require('fs-extra')
const path = require('path')
const gifsicle = require('gifsicle')

const execFile = util.promisify(require('child_process').execFile);

async function createGifFile(options, src, dest) {
    await fs.mkdirp(path.dirname(dest));

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

    var extra_options = process.env.THUMBNAIL_GIFSICLE_OPTIONS;
    if (extra_options) {
        args.concat(extra_options.split(" "));
    }

    args.push(src);

    await execFile(gifsicle, args);
}

async function createGifNode(options, attr, rel, src, dest) {
    var { actions, createNodeId, createContentDigest } = options;
    var { createNode } = actions;

    var file = path.basename(dest);

    var content = Buffer.from(await fs.readFile(dest)).toString(`base64`);
    var id = createNodeId(`stamp-${attr}-${file}`);

    var meta = {
        id,
        parent: null,
        children: [],
        internal: {
            type: `Stamp`,
            mediaType: 'image/gif',
            content: `${attr}-${file}`,
            contentDigest: createContentDigest(content),
        }
    };
    var data = {
        attr: attr,
        filename: file,
        absolutePath: dest,
        sourcePath: src,
        relativePath: rel,
        base64: content,
    };
    var node = Object.assign({}, data, meta);
    await createNode(node);
}

async function processGif(options, attr, src, file) {
    var suffix = process.env.THUMBNAIL_IMAGE_SITEPATH || '/static/images';
    var dest = `${__dirname}/public${suffix}`;

    let eattr = attr.toUpperCase();
    let srcfile = path.join(src, file);
    let destfile = path.join(dest, attr, file);
    let relfile = path.join(suffix, attr, file);

    await createGifFile({
        width: process.env[`THUMBNAIL_IMAGE_${eattr}_WIDTH`],
        height: process.env[`THUMBNAIL_IMAGE_${eattr}_HEIGHT`],
        scale: process.env[`THUMBNAIL_IMAGE_${eattr}_SCALE`],
        loop: process.env[`THUMBNAIL_IMAGE_LOOPCOUNT`],
    }, srcfile, destfile);
    await createGifNode(options, attr, relfile, srcfile, destfile);
}

exports.sourceNodes = async (options) => {
    var src = process.env.THUMBNAIL_IMAGE_PATH || `${__dirname}/src/images`;

    var files = await fs.readdir(src);
    var gifs = files.filter((file) => {
        return path.extname(file).toLowerCase() == ".gif"
    });

    for (const gif of gifs) {
        await processGif(options, "small", src, gif);
        await processGif(options, "large", src, gif);
    }
}
