/** @module networks */

module.exports = {
  /** @type {Network} */
  persona: {
    messagePrefix: '\x18Ark Signed Message:\n',
    bip32: {
      public: 0x2bf4968, // base58 will have a prefix 'apub'
      private: 0x2bf4530 // base58Priv will have a prefix 'apriv'
    },
    name: 'persona',
    nethash: '14b55c1de06caa015362d59ad97a144bc3c9fc2b50ece84b78d13ceaeaf7d8fb',
    token: 'PERSONA',
    symbol: 'P',
    pubKeyHash: 0x37, // Addresses will begin with 'A'
    explorer: 'http://explorer.persona.im',
    wif: 0x50, // Network prefix for wif generation
    activePeer: {
      ip: '89.40.7.63',
      port: 4102
    },
    peers: [
      { ip: '89.40.7.63', port: 4102 },
      { ip: '192.99.54.32', port: 4102 },
      { ip: '45.77.180.23', port: 4102 },
      { ip: '5.135.75.77', port: 4102 }
    ],
  },
  /** @type {Network} */
  testnet: {
    messagePrefix: '\x18Ark Testnet Signed Message:\n',
    bip32: {
      public: 0x043587cf,
      private: 0x04358394
    },
    name: 'devnet',
    nethash: 'b4e87739ca85f7eabf844a643930573e9a2dd9da291662e74d26962b5c3f0ed9',
    token: 'TPERSONA',
    symbol: 'TP',
    pubKeyHash: 0x37, // Addresses will begin with 'a'
    explorer: 'https://testnet.explorer.persona.im',
    wif: 0x50, // Network prefix for wif generation
    activePeer: {
      ip: '5.135.75.64',
      port: 4101
    },
    peers: [
      { ip: '5.135.75.64', port: 4101 }
    ]
  },
  /** @type {Network} */
  bitcoin: {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4
    },
    pubKeyHash: 0x00,
    wif: 0x80
  }
}
