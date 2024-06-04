const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()
const token = process.env.TELEGRAMAPI;
const bot = new TelegramBot(token, { polling: true });
const src = require("./src/index")
const proxy = require('./proxy')
proxy.init()
bot.on('message', async(msg) => {
    try {
        if (msg["reply_to_message"]) {
            // console.log(msg)
        } else {
            // console.log(msg)
            if(msg.chat.type =='private')
            {
                await router(msg)
            }
        }
    } catch (e) {
        console.log(e);
    }

});

bot.on('callback_query', async function onCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    const opts = {
        chat_id: msg.chat.id,
        message_id: msg.message_id,
    };
    try {
        await callBackRouter(msg, action, opts);
    } catch (e) {
        console.log(e);
    }

});


async function router(data) {
    const uid = data.chat.id;
    const req = src.pathRouter(data.text);
    if(!req){
        return 0 ;
    }
    // console.log(req)
    switch (req.command) {
        case "start":
            await src.menu.main(bot, uid, req, data);
            break;
        case "menu":
            await src.menu.main(bot, uid, req, data);
            break;
        default:
            await src.menu.search(bot, uid, req, data);
            break;
    }
}

async function callBackRouter(data, action, opts) {
    const uid = data.chat.id;
    const req = src.pathRouter(action);
    if(!req){
        return 0 ;
    }
    switch (req.command) {
        case "start":
            await src.menu.main(bot, uid, req, data);
            break;
        case "share":
            await src.menu.searchMenu(bot, uid, req, data);
            break;
        default:
            break;
    }
    bot.deleteMessage(opts.chat_id, opts.message_id);
}