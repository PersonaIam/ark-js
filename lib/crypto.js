var createHash = require('create-hash')
var cryptoJS = require("crypto-js");


/**
 * @memberOf module:crypto
 * @param {string|Buffer} buffer
 * @param {string|Buffer} key
 * @returns {Buffer}
 */
function encrypt(buffer, key){
  return cryptoJS.AES.encrypt(buffer, key);
}

/**
 * @memberOf module:crypto
 * @param {string|Buffer} buffer
 * @param {string|Buffer} key
 * @returns {string}
 */
function decrypt(buffer, key){
    return cryptoJS.AES.decrypt(buffer.toString(), key).toString(cryptoJS.enc.Utf8);
}


/**
 * @memberof module:crypto
 * @param {string|Buffer} buffer
 * @returns {Buffer}
 */
function ripemd160 (buffer) {
  return createHash('rmd160').update(buffer).digest()
}

/**
 * @memberof module:crypto
 * @param {string|Buffer} buffer
 * @returns {Buffer}
 */
function sha1 (buffer) {
  return createHash('sha1').update(buffer).digest()
}

/**
 * @memberof module:crypto
 * @param {string|Buffer} buffer
 * @returns {Buffer}
 */
function sha256 (buffer) {
  return createHash('sha256').update(buffer).digest()
}

/**
 * @memberof module:crypto
 * @param {string|Buffer} buffer
 * @returns {Buffer}
 */
function hash160 (buffer) {
  return ripemd160(sha256(buffer))
}

/**
 * @memberof module:crypto
 * @param {string|Buffer} buffer
 * @returns {Buffer}
 */
function hash256 (buffer) {
  return sha256(sha256(buffer))
}

module.exports = {
  hash160: hash160,
  hash256: hash256,
  ripemd160: ripemd160,
  sha1: sha1,
  sha256: sha256,
  encrypt: encrypt,
  decrypt: decrypt
}
