/**
 * Tokenshare proxy server
 * 
 * This server is to redirect the proxy for the deeplink wallet
 */
var querystring = require('querystring');
var express = require('express');
const fs = require("fs");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.listen(30001, async function() {
    console.log('web-server start')
})

async function sendErr(res, err) {
    if (!err) {
        err = "unknow error"
    }
    return await res.status(500).send({
        "code": 500,
        "error": err
    })
}


//Ping
app.get('/ping', async function(req, res) {
    // console.log(res.locals.auth)
    res.status(200).send({
        "code": 200,
        "data": 'success'
    })
})

//Redirect function
app.get('/redirect/:path', async function(req, res) {
    res.redirect(Buffer.from(req.params.path,'hex').toString('utf-8'))
})

app.get('/proxy/:path', async function(req, res) {
    res.redirect(Buffer.from(req.params.path,'hex').toString('utf-8'))
})

//INIT
async function init() {

}

module.exports = {
    init
}