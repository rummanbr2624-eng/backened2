const Account = require("../model/account");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingAccount = await Account.findOne({ email });

        if (existingAccount) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const account = await Account.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Account created successfully",
            account: {
                id: account._id,
                name: account.name,
                email: account.email,
                role: account.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const account = await Account.findOne({ email });

        if (!account) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (account.status === "inactive") {
            return res.status(403).json({ message: "Account is inactive" });
        }

        const isMatch = await bcrypt.compare(password, account.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: account._id, role: account.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token,
            role: account.role
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};