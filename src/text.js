const text = {
    "main": [
        `💰 *Tokenshare Bot* 💰

Welcome to token share bot 

This bot allows you to share & buy tokens in group & channel 

You can : 

1.Search token here

2.Generate share text in [TokenshareChannel](https://t.me/tonstest)

3.Add this bot to your group
`,

`You can send the *Token address* here and share the token .`
    ],
    'token': [
        'chain',
        'symbol',
        'name',
        'address',
        'liqudity'
    ],
}

const buttonText = {
    "main": [
        `Share token`,
        `Share us`
    ],
}

function close()
{
    return [
        {
            text:'❎Close',
            callback_data:"/close"
        },
        {
            text:'🏡Menu',
            callback_data:"/menu"
        }
    ]
}
module.exports = {
    text,
    buttonText,
    close
}