/** @module verify */

var crypto = require("./crypto.js"),
  constants = require("../constants.js"),
  slots = require("../time/slots.js");

/**
 * @static
 * @param {ECPair|string} secret
 * @param {string} fName
 * @param {string} lName
 * @param {ECPair|string} [secondSecret]
 * @returns {Transaction}
 */
function createVerification(secret, data, secondSecret) {
  if (!secret || !fName || !lName) return;

  var keys = secret;

  if (!crypto.isECPair(secret)) {
    keys = crypto.getKeys(secret);
  }

  if (!keys.publicKey) {
    throw new Error("Invalid public key");
  }

  var transaction = {
    type: 7,
    amount: 0,
    fee: constants.fees.verify,
    recipientId: null,
    senderPublicKey: keys.publicKey,
    timestamp: slots.getTime(),
    asset: {
      //sign data
    }
  };

  crypto.sign(transaction, keys);

  if (secondSecret) {
    var secondKeys = secondSecret;
    if (!crypto.isECPair(secondSecret)) {
      secondKeys = crypto.getKeys(secondSecret);
    }
    crypto.secondSign(transaction, secondKeys);
  }

  transaction.id = crypto.getId(transaction);

  return transaction;
}

module.exports = {
  createVerification: createVerification
}
