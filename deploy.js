// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile.js');

const mneumonic = 'tattoo pioneer maximum roof result tomato involve index strategy radar bike still';
const api = 'https://rinkeby.infura.io/v3/96d56aba0a1141a69f484f3be6509343';

const INITIAL_MESSAGE = 'Hello';


const provider = new HDWalletProvider(
    mneumonic, // Mneumonic Phrase
    api // Node we want to connect to
);

const web3 = new Web3(provider);


let accounts;
let inbox;
// call function so that we can use the 'async' keyword
const deploy = async () => {
    accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account ', accounts[0]);

    inbox = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({
                data: bytecode,
                arguments: [INITIAL_MESSAGE]
            })
            .send({
                from: accounts[0], 
                gas: '1000000'
            });


    console.log('Contract deployed to ', inbox.options.address);
    provider.engine.stop();
};

deploy();



