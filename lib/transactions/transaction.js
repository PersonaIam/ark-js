/** @module transaction */

var crypto = require("./crypto.js"),
    constants = require("../constants.js"),
    networks = require("../networks.js"),
    slots = require("../time/slots.js");

/**
 * @static
 * @param {string} recipientId
 * @param {number} amount
 * @param {string|null} vendorField
 * @param {ECPair|string} secret
 * @param {ECPair|string} [secondSecret]
 * @param {number} [version]
 * @param {boolean} [isLedger]
 * @returns {Transaction}
 */
function createTransaction(recipientId, amount, vendorField, secret, secondSecret, version, isLedger) {
    // transaction made through the ledger do not require passing a secret ( the signature is already
    // provided )
    if (!recipientId || !amount || !(secret || isLedger)) return false;

    if (!crypto.validateAddress(recipientId, version)) {
        throw new Error("Wrong recipientId");
    }
    var timestamp = !version || version === networks.persona.pubKeyHash ? slots.getTime() : slots.getTimeTestnet();

    var transaction = {
        type: 0,
        amount: amount,
        fee: constants.fees.send,
        recipientId: recipientId,
        timestamp: timestamp,
        asset: {}
    };

    if (vendorField) {
        transaction.vendorField = vendorField;
        if (transaction.vendorField.length > 64) {
            return null;
        }
    }

    if (secret) {
        var keys = secret;

        if (!crypto.isECPair(secret)) {
            keys = crypto.getKeys(secret);
        }
        if (!keys.publicKey) {
            throw new Error("Invalid public key");
        }
        transaction.senderPublicKey = keys.publicKey;
        crypto.sign(transaction, keys);
        transaction.id = crypto.getId(transaction);
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
    createTransaction: createTransaction
}
