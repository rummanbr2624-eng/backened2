
const Account = require("../model/account");

// GET ALL ACCOUNTS
exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find().select("-password");
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE ANY ACCOUNT
exports.updateAccount = async (req, res) => {
    try {
        const { name, email, role, status } = req.body;

        const account = await Account.findByIdAndUpdate(
            req.params.id,
            { name, email, role, status },
            { new: true, runValidators: true }
        ).select("-password");

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        res.json({
            message: "Account updated successfully",
            account
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE ANY ACCOUNT
exports.deleteAccount = async (req, res) => {
    try {
        const account = await Account.findByIdAndDelete(req.params.id);

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DASHBOARD STATISTICS
exports.getStats = async (req, res) => {
    try {
        const total = await Account.countDocuments();
        const active = await Account.countDocuments({ status: "active" });
        const inactive = await Account.countDocuments({ status: "inactive" });

        res.json({ total, active, inactive });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
