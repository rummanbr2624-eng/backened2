const express = require("express");
const router = express.Router();

const {
    getUsers,
    getMyProfile,
    updateMyProfile,
    deleteMyAccount
} = require("../controllers/usercontroller");

const { protect } = require("../middleware/authmiddleware");

// View all registered users
router.get("/all", protect, getUsers);

// View my profile
router.get("/profile", protect, getMyProfile);

// Update my profile
router.put("/profile", protect, updateMyProfile);

// Delete my account
router.delete("/profile", protect, deleteMyAccount);

module.exports = router;