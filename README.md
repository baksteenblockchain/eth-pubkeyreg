# eth-pubkeyreg
A public key registry for Ethereum smart contracts

Installation: `npm install web3 eth-pubkeyreg`

Usage:

```
const Web3 = require('web3');

const EthPubKeyReg = require('eth-pubkeyreg');

let web3 = new Web3("https://ropsten.infura.io/PaB3bocMHxzGiIRvftaE");

let pubKeyReg = new EthPubKeyReg(web3, EthPubKeyReg.ROPSTEN_ADDRESS);

pubKeyReg.getContract().then(contract => {


    async function getPubKey(address) {    
        let pubKey = await contract.method.publicKeys('address').call();
        return pubKey;
    }
    
    
    async function registerPubKey(address, pubKey) {
        await contract.methods.registerPubKey(address, pubKey).send();
    }
    
    (async () => {
        await getPubKey('<SOME_ADDRESS>')
    })();
    
    (async () => {
        await registerPubKey('<SOME_ADDRESS>', '<SOME_PULBIC_KEY>')
    })()
});
```

Currently deployed on
  * Mainnet: [0x89f93d4ED3b82d95310958774209E012D608813F](https://etherscan.io/address/0x89f93d4ed3b82d95310958774209e012d608813f)
  * Ropsten testnet: [0x8faAaA0f4983B8A517416466a9391751f79Ada2e](https://ropsten.etherscan.io/address/0x8faAaA0f4983B8A517416466a9391751f79Ada2e)
