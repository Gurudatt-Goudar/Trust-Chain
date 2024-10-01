const { ethers } = require('ethers');

// Function to generate a wallet from a USN
function generateWalletFromUSN(uucmsId) {
  const wallet = ethers.Wallet.createRandom();
  return {
    uucmsId,
    address: wallet.address
  };
}

// Generate addresses for USNs from P02KU22S126001 to P02KU22S126010
const startUSN = 126011;
const endUSN = 126049;
const uucmsIdPrefix = 'P02KU22S';

let dataset = {};

for (let i = startUSN; i <= endUSN; i++) {
  const uucmsId = `${uucmsIdPrefix}${i.toString().padStart(6, '0')}`;
  const wallet = generateWalletFromUSN(uucmsId);
  dataset[uucmsId] = wallet.address;
}

console.log('Student Data Config:', dataset);
