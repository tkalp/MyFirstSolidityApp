const assert = require('assert'); // a service used to make assertions about test
const ganache = require('ganache-cli') // serve as local ETH test network

// Web3 is portal to ETH programming
// Has Versioning issues 
// 0.x.x - Primitive interface, only callbacks for async code
// 1.x.x = Support for promises + async/wai
const Web3 = require('web3');
// Create instance of Web3
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');



// Declare global array of accounts to be populated
let accounts;
let inbox;

beforeEach( async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: ['Hello']
        })
        .send({
            from: accounts[0], 
            gas: '1000000'
        })
});

// Run the tests
describe('Inbox', () => {
    it('deploys a contract', () => {
        console.log(inbox);
    });
});



