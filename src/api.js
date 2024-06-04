const request = require('request');

const router = {
    dexscreener_search: 'https://api.dexscreener.com/latest/dex/search/?q=',
    geckoterminal_search: {
        base: 'https://api.geckoterminal.com/api/v2/networks/',
        token: "token"
    }
}

async function doRequest(options) {
    return new Promise(function(resolve, reject) {
        request(options, function(error, response) {
            if (error) throw new Error(error);
            var rawData = false;
            try {
                rawData = JSON.parse(response.body);
            } catch (e) {}

            resolve(rawData);
        });
    });
}

async function dexscreener_search(token) {
    var options = {
        'method': 'GET',
        'url': router.dexscreener_search + token,
        'headers': {
            'user-agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
            'Content-Type': 'application/json'
        },
    };
    // console.log(options)
    try {
        return doRequest(options);
    } catch (e) {
        return false;
    }
}

async function ton_geckoterminal_search(token) {
    var options = {
        'method': 'GET',
        'url': router.geckoterminal_search.base + 'ton/tokens/' + token,
        'headers': {
            'user-agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
            'Content-Type': 'application/json'
        },
    };
    // console.log(options)
    try {
        return doRequest(options);
    } catch (e) {
        return false;
    }
}

module.exports = {
    dexscreener_search,
    ton_geckoterminal_search
}