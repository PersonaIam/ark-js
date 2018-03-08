/** @module register */

var cryptoUtils = require("./crypto.js");
var constants = require("../constants.js");
var crypto = require("crypto");
var slots = require("../time/slots.js");


/**
 * @static
 * @param {ECPair|string} secret
 * @param {number} type
 * @param {string} data
 * @param {ECPair|string} [secondSecret]
 * @returns {Transaction}
 */
function createRegistration(secret, type, data, dataSig, secondSecret) {
	if (!secret || type == null || !data || !dataSig) return;

	//should also check for length of data

	var keys = secret;

	if (!cryptoUtils.isECPair(secret)) {
		keys = cryptoUtils.getKeys(secret);
  }

  if (!keys.publicKey) {
    throw new Error("Invalid public key");
	}

	var asset = {
		type: type,
		data: data,
		dataSig: dataSig
	};

	// use hmac to get data/payload id
	var hmac = crypto.createHmac('sha256', keys.publicKey);
	hmac.update(JSON.stringify(asset));
	asset.id = hmac.digest('hex');

	var transaction = {
		type: 6,
		amount: 0,
		fee: constants.fees.register,
		recipientId: null,
		senderPublicKey: keys.publicKey,
		timestamp: slots.getTime(),
		asset: asset
	};

	cryptoUtils.sign(transaction, keys);

	if (secondSecret) {
		var secondKeys = secondSecret;
		if (!cryptoUtils.isECPair(secondSecret)) {
			secondKeys = crypto.getKeys(secondSecret);
		}
		cryptoUtils.secondSign(transaction, secondKeys);
	}

	transaction.id = cryptoUtils.getId(transaction);

	return transaction;
}

module.exports = {
	createRegistration: createRegistration
}
