const lan = require("./text")
const api = require("./api")
require('dotenv').config()

const selflink = process.env.BOT_SELF_LINK

async function main(bot, uid, req, data) {
    //process.env.CHANNEL_ID
    const msg =  await bot.sendMessage(uid, lan.text.main[0], {
        parse_mode: 'MarkDown',
        disable_web_page_preview: "true",
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{
                    "text": lan.buttonText.main[0],
                    "callback_data": "/share"
                }]
                ,
                [{
                    "text": lan.buttonText.main[1],
                    url: encodeURI(`https://t.me/share/url?url=${selflink}&text= \n \n \n 🍬 Share some token you like 🍬`)
                }]
            ]
        })
    });
    return msg
}


async function searchMenu(bot, uid, req, data) {
    //process.env.CHANNEL_ID
    const msg =  await bot.sendMessage(uid, lan.text.main[1], {
        parse_mode: 'MarkDown',
        disable_web_page_preview: "true",
        reply_markup: JSON.stringify({
        })
    });
    return msg
}

function tokenAnalyze(data)
{
    var ret = {
        chain : data[0].chainId,
        dex:data[0].dexId,
        token : data[0].baseToken,
        inform : data[0].info,
        price : {
            native : data[0].priceNative,
            usd : data[0].priceUsd,
        },
        txns :{
            total : 0,
            buys : 0,
            sells : 0,
        },
        volume : 0 ,
        liquidity:{
            total: 0,
            usd: 0,
            base: 0,
        },
        fdv:0,
        time:data[0].pairCreatedAt,
        explorer : "",
    }

    switch (ret.chain)
    {
        case 'solana':
            explorer = `https://solscan.io/address/${ret.token.address}`
            break;
        default : 
            break;
    }

    data.forEach(e => {
        //Txn informations
        try{
            ret.txns.total +=( e.txns.h24.buys+e.txns.h24.sells)
            ret.txns.buys += e.txns.h24.buys
            ret.txns.sells += e.txns.h24.sells
    
            //Vol
            ret.volume+=e.volume.h24
    
            //Liquidity
            ret.liquidity.total += e.liquidity.usd
            ret.liquidity.usd += e.liquidity.usd
            ret.liquidity.quote += e.liquidity.base
    
            //fdv
            ret.fdv += e.fdv
        }catch(e){}

    });
    return ret;

}

async function search(bot, uid, req, data) {
    const token =await api.dexscreener_search(req.params[0]);
    var text = ``
    var btn = []
    if(token && token.pairs && token.pairs.length > 0 )
    {
        const az = tokenAnalyze(token.pairs)
        // console.log(az)
        text += `
🚀 Token : [$${az.token.symbol}](${az.explorer})🚀

👛 Price : ${az.price.usd}

💰 Liqudity : \`${az.liquidity.total}\` | FDV : \`${az.fdv}\`

🚄 TXNs 24H : \`${az.txns.total}\` (\`${az.txns.buys}\` / \`${az.txns.sells}\`)

🔥 Address : \`${az.token.address}\`

⏰ Create : \`${new Date(az.time).toLocaleString()}\`

*You can generate it in* [@tokenshare_Bot](https://t.me/Tokenshare_bot)
`
    btn.push(
        [{
            "text": 'Buy',
            "url": "https://tokenshare.tonspay.top/?tgWebAppStartParam="+Buffer.from(JSON.stringify({t:1,d:az})).toString('hex')
        }]
    )
    }else{
        //Token not exsit or emp
    }
    
    const channelMsg =  await bot.sendMessage(process.env.CHANNEL_ID, text, {
        parse_mode: 'MarkDown',
        disable_web_page_preview: "true",
        reply_markup: JSON.stringify({
            inline_keyboard: btn
        })
    });
    return await bot.forwardMessage(uid,process.env.CHANNEL_ID,channelMsg.message_id,{});
}
module.exports = {
    main,
    search,
    searchMenu
}