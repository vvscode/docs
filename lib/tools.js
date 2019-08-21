const fs = require('fs');


function flatten (ary) {
    var ret = [];
    for(var i = 0; i < ary.length; i++) {
        if(Array.isArray(ary[i])) {
            ret = ret.concat(flatten(ary[i]));
        } else {
            ret.push(ary[i]);
        }
    }
    return ret;
}


async function fileExists(path) {
    return new Promise((resolve, reject) => {
        fs.access(path, fs.F_OK, (err) => {
            if (err) {
                reject(reject);
                return;
            }
            resolve();
        })
    });
}


module.exports.flatten = flatten;
module.exports.fileExists = fileExists;