const Certificate = require('../models/certificateModel');

// Issue certificate (Admin only)
exports.issueCertificate = async (req, res) => {
    try {
        const { studentAddress, uucmsId, transactionHash, blockNumber } = req.body;

        const certificate = new Certificate({
            studentAddress,
            uucmsId,
            transactionHash,
            blockNumber,
            issuedBy: req.user.id
        });

        await certificate.save();
        res.json({ message: 'Certificate issued successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Verify certificate (Verifier)
exports.verifyCertificate = async (req, res) => {
    try {
        const { uucmsId } = req.params;

        const certificate = await Certificate.findOne({ uucmsId });
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }

        res.json(certificate);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
