/** @module register */

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
function createRegistration(secret, type, data, secondSecret) {
	if (!secret || !type || !data) return;

	var keys = secret;

	if (!crypto.isECPair(secret)) {
		keys = crypto.getKeys(secret);
  }

  if (!keys.publicKey) {
    throw new Error("Invalid public key");
  }

  var typeBuff = Buffer.from(type);
  var dataBuff = Buffer.from(data);
  var id = Buffer.concat([typeBuff, dataBuff], typeBuff.length + dataBuff.length);

  id = crypto.signBuffer(id, keys);

	var transaction = {
		type: 6,
		amount: 0,
		fee: constants.fees.register,
		recipientId: null,
		senderPublicKey: keys.publicKey,
		timestamp: slots.getTime(),
		asset: {
      id: id,
      type: type,
      data: data
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
	createRegistration: createRegistration
}
