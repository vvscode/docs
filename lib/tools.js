const request = require('request-promise-native');


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


async function checkUrlExists(url) {
    function checkError(err) {
        if ([400, 404, 401, 500].includes(err.statusCode)) {
            throw `URL seems broken: HTTP Status ${err.statusCode}`;
        }
    }

    async function attemptFetch(httpOp) {
        return httpOp(url, {
            headers: {
                'Accept': '*/*',
                'User-Agent': 'curl/7.54.0',  // some servers block requests from scripts, attempt cURL impersonation
            }
        });
    }

    // first attempt a HEAD operation
    return attemptFetch(request.head)
        .catch(err => {
            // if HEAD fails with 404, retry with GET
            if (err.statusCode === 404) {
                return attemptFetch(request.get);
            }
            checkError(err);
        }).catch(err => {
            checkError(err);
            return url;
        })
        .then(resp => url);
}

module.exports.flatten = flatten;
module.exports.checkUrlExists = checkUrlExists;