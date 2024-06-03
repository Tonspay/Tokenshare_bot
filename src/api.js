const request = require('request');

const router = {
    dexscreener_search : 'https://api.dexscreener.com/latest/dex/search/?q='
}

async function doRequest(options)
{
    return new Promise(function (resolve, reject) {
        request(options, function (error, response) {
            if (error) throw new Error(error);
            rawData = JSON.parse(response.body);
            resolve(rawData);
        });
      });
}

async function dexscreener_search(token)
{
    var options = {
        'method': 'GET',
        'url': router.dexscreener_search+token,
        'headers': {
          'user-agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
          'Content-Type': 'application/json'
        },
      };
      // console.log(options)
      try{
        return doRequest(options);
      }catch(e)
      {
        return false;
      }
      
}

module.exports = {
    dexscreener_search,
}