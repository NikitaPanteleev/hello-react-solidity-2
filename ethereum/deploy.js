// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    'PHASE',
    'https://goerli.infura.io/v3/1e9e716253134c85924216c52f9f8070'
)
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to get from', accounts[0]);

    result = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: '2000000' })
        .catch(ex => console.log(ex));

    provider.engine.stop();
    console.log(JSON.stringify(compiledFactory.abi));
    console.log('Contract deployed to', result.options.address);
    // deployed at  0xC1Ae2Df108Bb6B4C834Cf7718Fd5798452944Fa6
};

deploy();