const path = require('path'); // Used to get the path of the current directory 
const fs = require('fs'); // Filereader
const solc = require('solc'); // Solidity Compiler


const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol'); // Get the path of the Inbox.sol
const source = fs.readFileSync(inboxPath, 'utf8');

console.log(solc.compile(source,1));

