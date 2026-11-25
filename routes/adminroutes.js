
const express = require("express");
const router = express.Router();

const {
    getAllAccounts,
    updateAccount,
    deleteAccount,
    getStats
} = require("../controllers/admincontroller");

const { protect, adminOnly } = require("../middleware/authmiddleware");

// All routes require admin login
router.use(protect, adminOnly);

// View all accounts
router.get("/all", getAllAccounts);

// Update any account
router.put("/:id", updateAccount);

// Delete any account
router.delete("/:id", deleteAccount);

// Dashboard statistics
router.get("/stats", getStats);

module.exports = router;
