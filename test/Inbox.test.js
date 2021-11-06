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
const INITIAL_MESSAGE = 'Hello';


const api = 'https://rinkeby.infura.io/v3/96d56aba0a1141a69f484f3be6509343';


// Declare global array of accounts to be populated
let accounts;
let inbox;

// This functon runs before each test
beforeEach( async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: [INITIAL_MESSAGE]
        })
        .send({
            from: accounts[0], 
            gas: '1000000'
        });
});

// Run the tests
describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address); // Checks the address is okay of contrac
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call(); // Calls the attribute of 'Inbox' -> no need to specify address, just retrieving data from DB
        assert.equal(message, INITIAL_MESSAGE);
    });

    it('can change message', async () => {
        const newMessage = 'New Message';
        await inbox.methods.setMessage(newMessage).send({ // Send Message
            from: accounts[0]
        });

        const message = await inbox.methods.message().call(); 
        assert.equal(message, newMessage);
    });

});



