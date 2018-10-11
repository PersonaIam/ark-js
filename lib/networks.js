/** @module networks */

module.exports = {
  /** @type {Network} */
  persona: {
    messagePrefix: '\x18Persona Signed Message:\n',
    bip32: {
      public: 0x2bf4968, // base58 will have a prefix 'apub'
      private: 0x2bf4530 // base58Priv will have a prefix 'apriv'
    },
    name: 'persona',
    nethash: '14b55c1de06caa015362d59ad97a144bc3c9fc2b50ece84b78d13ceaeaf7d8fb',
    token: 'PERSONA',
    symbol: 'PRSN',
    pubKeyHash: 0x37, // Addresses will begin with 'P'
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
    messagePrefix: '\x18Persona Testnet Signed Message:\n',
    bip32: {
      public: 0x043587cf,
      private: 0x04358394
    },
    name: 'testnet',
    nethash: 'a6a53c0da7822012da6de41cdcaef2ecad885c7df2fc97011e5c40c5684f80a9',
    token: 'TPERSONA',
    symbol: 'TP',
    pubKeyHash: 0x42, // Addresses will begin with 'T'
    explorer: 'http://5.135.75.68',
    wif: 0x50, // Network prefix for wif generation
    activePeer: {
      ip: '5.135.75.64',
      port: 4101
    },
    peers: [
      { ip: '5.135.75.64', port: 4101 },
      { ip: '5.135.75.65', port: 4101 },
      { ip: '5.135.75.66', port: 4101 },
      { ip: '5.135.75.67', port: 4101 },
      { ip: '5.135.75.68', port: 4101 }
    ]
  },
    /** @type {Network} */
    localnet: {
        messagePrefix: '\x18Localnet Testnet Signed Message:\n',
        bip32: {
            public: 0x043587cf,
            private: 0x04358394
        },
        name: 'localnet',
        nethash: '527df5a4bf0fbd0dbe4b6c0a255c14a8451f4f3144afdf82bcb65b68ff963114',
        token: 'LPERSONA',
        symbol: 'LP',
        pubKeyHash: 0x30, // Addresses will begin with 'L'
        explorer: 'http:/localhost',
        wif: 0x50, // Network prefix for wif generation
        activePeer: {
            ip: '127.0.0.1',
            port: 4100
        },
        peers: [
            { ip: '127.0.0.1', port: 4100 }
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
