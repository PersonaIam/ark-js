/** @module delegate */

var crypto = require("./crypto.js"),
    constants = require("../constants.js"),
    networks = require("../networks.js"),
    slots = require("../time/slots.js");

/**
 * @static
 * @param {string} secret
 * @param {string} username
 * @param {ECPair|string} [secondSecret]
 * @param {boolean} [isLedger]
 * @param {number} [version]
 * @param {string} [publicKey]
 */
function createDelegate(secret, username, secondSecret, isLedger, version, publicKey) {
    if (!(secret || isLedger) || !username) return false;

    var timestamp = !version || version === networks.persona.pubKeyHash ? slots.getTime() : slots.getTimeTestnet();

    var transaction = {
        type: 2,
        amount: 0,
        fee: constants.fees.delegate,
        recipientId: null,
        timestamp: timestamp,
        asset: {
            delegate: {
                username: username,
            }
        }
    };

    if (secret) {
        var keys = secret;

        if (!crypto.isECPair(secret)) {
            keys = crypto.getKeys(secret);
        }

        if (!keys.publicKey) {
            throw new Error("Invalid public key");
        }

        transaction.senderPublicKey = keys.publicKey;
        transaction.asset.delegate.publicKey = keys.publicKey;

        crypto.sign(transaction, keys);

        transaction.id = crypto.getId(transaction);
    }
    else if (publicKey) {
        transaction.asset.delegate.publicKey = publicKey;
    }

    if (secondSecret) {
        var secondKeys = secondSecret;
        if (!crypto.isECPair(secondSecret)) {
            secondKeys = crypto.getKeys(secondSecret);
        }
        crypto.secondSign(transaction, secondKeys);
    }

    return transaction;
}

module.exports = {
    createDelegate : createDelegate
}
