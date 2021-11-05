const path = require('path'); // Used to get the path of the current directory 
const fs = require('fs'); // Filereader
const solc = require('solc'); // Solidity Compiler

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol'); // Get the path of the Inbox.sol
const source = fs.readFileSync(inboxPath, 'utf8'); // Filereader

module.exports = solc.compile(source,1).contracts[':Inbox']; // Compile the code and get the specific contract, in this case 'Inbox'

