const fs = require('fs');
const Path = require('path');

function readdir(path, ext) {
    fs.readdir(path, (err, files) => {
        if (err) {
            console.error(err);
        }
        files.forEach(file => {
            if (Path.extname(file) === '.' + ext) {
                console.log(file);
            }
        })
    });

}

readdir("C:\\Users\\admin\\Desktop\\screen shoot\\产品图片", "txt");