"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var keys = require("./keys");
var utils = require("./utils");
function encrypt(receiverPubhex, msg) {
    var disposableKey = new keys.PrivateKey();
    var receiverPubkey = keys.PublicKey.fromHex(receiverPubhex);
    var aesKey = disposableKey.ecdh(receiverPubkey);
    var encrypted = utils.aesEncrypt(aesKey, msg);
    return Buffer.concat([disposableKey.publicKey.uncompressed, encrypted]);
}
exports.encrypt = encrypt;
function decrypt(receiverPrvhex, msg) {
    var receiverPrvkey = keys.PrivateKey.fromHex(receiverPrvhex);
    var senderPubkey = new keys.PublicKey(msg.slice(0, 65));
    var encrypted = msg.slice(65);
    var aesKey = receiverPrvkey.ecdh(senderPubkey);
    return utils.aesDecrypt(aesKey, encrypted);
}
exports.decrypt = decrypt;
var keys_2 = require("./keys");
exports.PrivateKey = keys_2.PrivateKey;
exports.PublicKey = keys_2.PublicKey;
exports.utils = {
    aesDecrypt: utils.aesDecrypt, aesEncrypt: utils.aesEncrypt, decodeHex: utils.decodeHex, getValidSecret: utils.getValidSecret, remove0x: utils.remove0x, sha256: utils.sha256,
};
//# sourceMappingURL=index.js.map
