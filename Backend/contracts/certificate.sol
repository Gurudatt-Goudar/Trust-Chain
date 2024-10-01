// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyCertificate {
    mapping(address => string) public certificates;

    event CertificateStored(address indexed receiver, string hash);

    function storeCertificate(address recipient, string memory hash) public {
        // Store the hash for the recipient address
        certificates[recipient] = hash;

        // Emit an event for the transaction
        emit CertificateStored(recipient, hash);
    }

    function getCertificate() public view returns (string memory) {
        return certificates[msg.sender];
    }

    function getCertificateByAddress(address _address) public view returns (string memory) {
        return certificates[_address];
    }
}