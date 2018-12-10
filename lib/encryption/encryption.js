"use strict";
var ecpair = require('../ecpair');
var eciesjs = require('./index')

/**
 * @param {string|Buffer} publicKey
 * @param {string|Buffer} value
 * @returns {Buffer}
 */

function encryptToBuffer(publicKey, value){
    let publicKeyBuffer = new Buffer(publicKey, "hex");
    let keysUsedByOwner = ecpair.fromPublicKeyBuffer(publicKeyBuffer, null);
    return eciesjs.encrypt(keysUsedByOwner.getPublicKeyBuffer(), value);
}

/**
 * @param {string|Buffer} secret
 * @param {Buffer} cipher
 * @returns {string}
 */
function decryptFromBuffer(secret, cipher){
    let keysUsedByProvider = new ecpair.fromSeed(secret, null)
    return eciesjs.decrypt(keysUsedByProvider.d.toBuffer(32), cipher).toString('utf8');
}

/**
 * @param {string|Buffer} publicKey
 * @param {string|Buffer} value
 * @returns {string}
 */

function encrypt(publicKey, value){
    let publicKeyBuffer = new Buffer(publicKey, "hex");
    let keysUsedByOwner = ecpair.fromPublicKeyBuffer(publicKeyBuffer, null);
    let encryptedValue = eciesjs.encrypt(keysUsedByOwner.getPublicKeyBuffer(), value);
    let json = JSON.stringify(encryptedValue);
    let buffer = Buffer.from(JSON.parse(json).data);
    return JSON.stringify(buffer)
}

/**
 * @param {string|Buffer} secret
 * @param {string} cipher
 * @returns {string}
 */
function decrypt(secret, cipher){
    let jsonFromString = JSON.parse(cipher)
    let bufferFromJSONFromString = Buffer.from(jsonFromString);
    let keysUsedByProvider = new ecpair.fromSeed(secret, null)
    return eciesjs.decrypt(keysUsedByProvider.d.toBuffer(32), bufferFromJSONFromString).toString('utf8');
}


module.exports = {
    encryptToBuffer: encryptToBuffer,
    decryptFromBuffer: decryptFromBuffer,
    encrypt: encrypt,
    decrypt: decrypt
}
