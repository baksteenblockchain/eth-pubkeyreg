const ethJsUtil = require('ethereumjs-util');

const PubKeyRegistry = require('./build/contracts/PublicKeyRegistry.json');

class EthPubKeyReg {

    static get MAINNET_ADDRESS() {
        return "0x89f93d4ED3b82d95310958774209E012D608813F";
    } 

    static get ROPSTEN_ADDRESS() {
        return "0x8faAaA0f4983B8A517416466a9391751f79Ada2e";
    }

    constructor(web3, keyRegAddress) {
        this.web3 = web3;
        this.keyRegAddress = keyRegAddress;
    }   

    async getContract() {
        return await new this.web3.eth.Contract(PubKeyRegistry.abi, this.keyRegAddress);
    }
}

module.exports = EthPubKeyReg;