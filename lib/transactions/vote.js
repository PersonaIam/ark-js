/** @module vote */

var crypto = require("./crypto.js"),
    constants = require("../constants.js"),
    networks = require("../networks.js"),
    slots = require("../time/slots.js");

/**
 * @static
 * @param {ECPair|string} secret
 * @param {Array} delegates
 * @param {ECPair|string} [secondSecret]
 * @param {boolean} [isLedger]
 * @param {Number} version
 * @param {String} publicKey
 * @returns {Transaction}
 */
function createVote(secret, delegates, secondSecret, isLedger, version, publicKey) {
    if (!(secret || isLedger) || !Array.isArray(delegates)) return false;

    var timestamp = !version || version === networks.persona.pubKeyHash ? slots.getTime() : slots.getTimeTestnet();

    var transaction = {
        type: 3,
        amount: 0,
        secret: secret,
        fee: constants.fees.vote,
        timestamp: timestamp,
        asset: {
            votes: delegates
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

        transaction.recipientId = crypto.getAddress(keys.publicKey);
        transaction.senderPublicKey = keys.publicKey;

        crypto.sign(transaction, keys);

        transaction.id = crypto.getId(transaction);
    }
    else if (publicKey) {
        transaction.recipientId = crypto.getAddress(publicKey);
    }


    if (secondSecret) {
        var secondKeys = secondSecret;
        if (!crypto.isECPair(secondSecret)) {
            secondKeys = crypto.getKeys(secondSecret);
        }
        crypto.secondSign(transaction, secondKeys);
        transaction.secondSecret = secondSecret;
    }

    return transaction;
}

module.exports = {
    createVote: createVote
}
