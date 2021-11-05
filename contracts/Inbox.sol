pragma solidity ^0.4.17;  // Specify the version of Solidity

contract Inbox { // Creates a contract class

    string public message; // Public member of Contract

    function Inbox (string initialMessage) public { // Constructor
        message = initialMessage;
    }
    
    function setMessage(string newMessage) public { // Setter
        message = newMessage;
    }
    
}
