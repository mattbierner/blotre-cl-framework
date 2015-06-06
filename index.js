var Blotre = require('blotre');
var rp = require('request-promise');
var fs = require('fs');

/**
 * Prompt the user to redeem an authorization code.
 */
var askAuth = function(client) {
    console.log("Code:", client.client.code);
};

/**
 * Persist client info.
 */
var writeClient = function(client) {
    fs.writeFileSync("client-data.json", JSON.stringify(client)); 
};

/**
 * Try to read 
 */
var readClient = function(clientInfo, config) {
    try {
        var data = JSON.parse(fs.readFileSync("client-data.json"));
        return Blotre.create(data.client, data.creds, CONFIG); 
    } catch (e) {
        return null;
    }
};

/**
 * Attempt to redeem the current disposable client code.
 */
var tryRedeem = function(client) {
    console.log("Press enter once you have authorized.")
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    return new Promise(function(resolve, reject) {
        process.stdin.once('data', function(chunk) {
            client.redeemOnetimeCode()
                .then(function(creds) {
                    client.setCreds(creds);
                    resolve(client);
                })
                .catch(reject);
        });
    });
};


var CONFIG = {
    onCredsChanged: writeClient
};

/**
 * 
 */
module.exports = function(clientInfo, userConf) {
    var config = extend(CONFIG, userConf || {});
    var existingClient = readClient(clientInfo, config);
    if (existingClient) {
        console.log("Found existing client");
        return Promise.resolve(existingClient);
    } else {
        Blotre.createDisposable(clientInfo, config)
            .then(function(client) {
                askAuth(client);
                return tryRedeem(client, start);
            });
    }
};
