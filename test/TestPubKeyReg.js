//@dev Based on OpenZeppelin's expectThrow
// https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/test/helpers/expectThrow.js
let expectThrow = async (promise, message) => {
    try {
        await promise;
    } catch (error) {
        // TODO: Check jump destination to destinguish between a throw
        //       and an actual invalid jump.
        const invalidOpcode = error.message.search('invalid opcode') >= 0;
        // TODO: When we contract A calls contract B, and B throws, instead
        //       of an 'invalid jump', we get an 'out of gas' error. How do
        //       we distinguish this from an actual out of gas event? (The
        //       testrpc log actually show an 'invalid jump' event.)
        const outOfGas = error.message.search('out of gas') >= 0;
        const revert = error.message.search('revert') >= 0;
        assert(
            invalidOpcode || outOfGas || revert,
            'Expected throw, got \'' + error + '\' instead',
        );
        return;
    }
    console.err(message);
    assert.fail(message);
};

const PubKeyReg = artifacts.require('PublicKeyRegistry');

const validPubKeyAddressPair = {
    addr: "0x862c75ed138ae33412e34b4d892cc22f2672647b",
    pubKey: "0xd9d7cb512ac5b8779b9337631efb268142b9a6eec2b2913ca4d4fe584580ab072a3802867ff36f33fe48b74c327aa1d36113f0e431ea0f724fb42e7961d9c30a"
}

const invalidPubKeyAddressPair = {
    addr: "0x862c75ed138ae33412e34b4d892cc22f2672647c",
    pubKey: "0xd9d7cb512ac5b8779b9337631efb268142b9a6eec2b2913ca4d4fe584580ab072a3802867ff36f33fe48b74c327aa1d36113f0e431ea0f724fb42e7961d9c30a"
}

contract('PubKeyReg', async () => {
    let pubKeyReg;

    before(async () => {
        pubKeyReg = await PubKeyReg.new();
    });

    it('Registers public keys', async () => {
        await pubKeyReg.registerPubKey(validPubKeyAddressPair.addr, validPubKeyAddressPair.pubKey);

        let registeredPubKey = await pubKeyReg.publicKeys(validPubKeyAddressPair.addr);

        assert.equal(
            registeredPubKey,
            validPubKeyAddressPair.pubKey,
            "The public key was not registered correctly"
        );
    });
    
    it('Checks that registered public keys are valid', async () => {
        await expectThrow(
            pubKeyReg.registerPubKey(invalidPubKeyAddressPair.addr, invalidPubKeyAddressPair.pubKey),
            "Cannot register invalid public keys"
        );
    });
});