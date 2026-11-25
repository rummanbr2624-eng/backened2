const Account = require("../model/account");

// GET ALL USERS
exports.getUsers = async (req, res) => {
    try {
        const users = await Account.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET MY PROFILE
exports.getMyProfile = async (req, res) => {
    try {
        const account = await Account.findById(req.account.id).select("-password");

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        res.json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE MY PROFILE
exports.updateMyProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const account = await Account.findByIdAndUpdate(
            req.account.id,
            { name, email },
            { new: true, runValidators: true }
        ).select("-password");

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        res.json({
            message: "Profile updated successfully",
            account
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE MY ACCOUNT
exports.deleteMyAccount = async (req, res) => {
    try {
        await Account.findByIdAndDelete(req.account.id);

        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};