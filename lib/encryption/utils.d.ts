/// <reference types="node" />
export declare function decodeHex(hex: string): Buffer;
export declare function getValidSecret(): Buffer;
export declare function aesEncrypt(key: Buffer, plainText: Buffer): Buffer;
export declare function aesDecrypt(key: Buffer, cipherText: Buffer): Buffer;
