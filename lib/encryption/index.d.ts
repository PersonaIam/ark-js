/// <reference types="node" />
import { aesDecrypt, aesEncrypt, decodeHex, getValidSecret } from "./utils";
export declare function encrypt(receiverPubhex: string, msg: Buffer): Buffer;
export declare function decrypt(receiverPrvhex: string, msg: Buffer): Buffer;
export { PrivateKey, PublicKey } from "./keys";
export declare const utils: {
    aesDecrypt: typeof aesDecrypt;
    aesEncrypt: typeof aesEncrypt;
    decodeHex: typeof decodeHex;
    getValidSecret: typeof getValidSecret;
};
