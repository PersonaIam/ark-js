"use strict";
var ecpair = require('../ecpair');
var eciesjs = require('./index')

/**
 * @param {string|Buffer} publicKey
 * @param {string|Buffer} value
 * @returns {Buffer}
 */

function encrypt(publicKey, value){
    let publicKeyBuffer = new Buffer(publicKey, "hex");
    let keysUsedByOwner = ecpair.fromPublicKeyBuffer(publicKeyBuffer, null);
    return eciesjs.encrypt(keysUsedByOwner.getPublicKeyBuffer(), value);
}

/**
 * @param {string|Buffer} secret
 * @param {string|Buffer} cipher
 * @returns {string}
 */
function decrypt(secret, cipher){
    let keysUsedByProvider = new ecpair.fromSeed(secret, null)
    return eciesjs.decrypt(keysUsedByProvider.d.toBuffer(32), cipher).toString('utf8');
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt
}
