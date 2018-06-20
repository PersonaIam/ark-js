# Persona JS

Persona JS is a JavaScript library for sending Persona transactions.
It does not require a locally installed node, and instead utilizes the existing peers on the network.
It can be used from the client as a [browserify](http://browserify.org/) compiled module, or on the server as a standard Node.js module.

## Building

Build the browserify module for client use:

```sh
npm build:browserify
```

Clean:

```sh
npm clean:browserify
```

## Tests

```
npm test
```

Tests written using mocha + schedule.js.

***

## Usage

On the client:

```html
<script src="node_modules/persona/bundle.min.js"></script>
```

On the server:

```js
var persona = require("personajs");
```

### Generating a key pair

To generate a public / private key pair from a given passphrase:

```js
var keys = persona.crypto.getKeys("passphrase");
```

Returning:

```js
{
  publicKey: "02e012f0a7cac12a74bdc17d844cbc9f637177b470019c32a53cef94c7a56e2ea9",
  privateKey: ""
}
```

To get the private key:

```js
keys.d.toBuffer().toString("hex");
```

Returning:
```
1e089e3c5323ad80a90767bdd5907297b4138163f027097fd3bdbeab528d2d68
```


### Generating an address

To generate a unique Persona address from a given public key:

```js
var address = persona.crypto.getAddress("5d036a858ce89f844491762eb89e2bfbd50a4a0a0da658e4b2628b25b117ae09");
```

Returning:

```
AGihocTkwDygiFvmg6aG8jThYTic47GzU9
```

### Creating a transaction

To create a signed transaction object, which can then be broadcasted onto the network:

```js
var amount      = 1000 * Math.pow(10, 8); // 100000000000
var transaction = persona.transaction.createTransaction("AGihocTkwDygiFvmg6aG8jThYTic47GzU9", amount, null, "passphrase", "secondPassphrase");
```

Returning:

```js
{
  type: 0, // Transaction type. 0 = Normal transaction.
  amount: 100000000000, // The amount to send expressed as an integer value.
  asset: {}, // Transaction asset, dependent on tx type.
  fee: 100000000, // 0.1 Persona expressed as an integer value.
  id: "500224999259823996", // Transaction ID.
  recipientId: "AGihocTkwDygiFvmg6aG8jThYTic47GzU9", // Recipient ID.
  senderPublicKey: "56e106a1d4a53dbe22cac52fefd8fc4123cfb4ee482f8f25a4fc72eb459b38a5", // Sender's public key.
  signSignature: "03fdd33bed30270b97e77ada44764cc8628f6ad3bbd84718571695262a5a18baa37bd76a62dd25bc21beacd61eaf2c63af0cf34edb0d191d225f4974cd3aa509", // Sender's second passphrase signature.
  signature: "9419ca3cf11ed2e3fa4c63bc9a4dc18b5001648e74522bc0f22bda46a188e462da4785e5c71a43cfc0486af08d447b9340ba8b93258c4c7f50798060fff2d709", // Transaction signature.
  timestamp: 27953413 // Based on UTC time of genesis since epoch.
}
```

### Network identification with Nethash

You need to obtain the nethash in order to be sure you are broadcasting to the right network (testnet, mainnet or others). The nethash is simply the payload hash from the genesisBlock. If no nethash or wrong nethash is provided in the headers, the request will be rejected returning the expected nethash.

```json
{ "success": false, "message": "Request is made on the wrong network", "expected":"e2f8f69ec6ab4b12550a314bd867c46e64e429961bb427514a3a534c602ff467", "received":"wrong-nethash" }
```

The nethash for a given network can be obtained at the following API endpoint:

```
/api/blocks/getNetHash
```

### Posting a transaction

Transaction objects are sent to `/peer/transactions`, using the `POST` method.

Example:

```js
Method: POST
Content-Type: application/json

{
    "transactions" : [{
        ...
    }]
}
```

#### Peer Response

Upon successfully accepting a transaction, the receiving node will respond with:

```json
{ "success": true, "result": "5318121831703437738" }
```

If the transaction is deemed invalid, or an error is encountered, the receiving node will respond with:

```json
{ "success": false, "message": "Error message" }
```

***

### Other transaction types

#### Creating a delegate transaction

```js
var transaction = persona.delegate.createDelegate("secret", "username", "secondSecret");
```

#### Creating a second signature transaction

```js
var transaction = persona.signature.createSignature("secret", "secondSecret");
```

#### Creating a vote transaction

```js
var transaction = persona.vote.createVote("secret", ["+58199578191950019299181920120128129"], "secondSecret");
```

## License

The MIT License (MIT)

Copyright (c) 2016 Lisk<br />
Copyright (c) 2015 Crypti

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
