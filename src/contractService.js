import { ethers } from 'ethers';
import { contractABI, contractAddress } from './ConfigData'; // Adjust the import path if needed

// Initialize provider and contract
const provider = new ethers.BrowserProvider(window.ethereum); // Updated initialization
const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());

async function issueCertificate(uucmsId, details) {
    try {
        // Call the smart contract function
        const tx = await contract.issueCertificate(uucmsId, details);
        console.log('Transaction sent:', tx.hash);

        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        console.log('Transaction confirmed:', receipt);

        // Fetch the transaction details
        const txDetails = {
            txHash: tx.hash,
            gasUsed: receipt.gasUsed.toString(),
            blockNumber: receipt.blockNumber,
            timestamp: new Date(),
            UUCMSID: uucmsId, // Include the UUCMS ID
            details: details // Include the details
        };

        // Store transaction details in local storage
        storeTransactionDetails(txDetails);

    } catch (error) {
        console.error('Error issuing certificate:', error);
    }
}

// Function to store transaction details in local storage
function storeTransactionDetails(txDetails) {
    // Retrieve existing transactions from local storage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Add new transaction to the list
    transactions.push(txDetails);

    // Store updated list back in local storage
    localStorage.setItem('transactions', JSON.stringify(transactions));

    console.log('Transaction details stored in local storage');
}

// Function to retrieve stored transactions (for viewing purposes)
export const getStoredTransactions = async () => {
    const transactions = JSON.parse(localStorage.getItem('transactions'));
    return Array.isArray(transactions) ? transactions : []; // Ensure it's always an array
};


// Export the issueCertificate function
export { issueCertificate };
