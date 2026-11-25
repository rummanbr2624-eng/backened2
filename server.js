
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/database");

const authRoutes = require("./routes/authroutes");
const userRoutes = require("./routes/userroutes");
const adminRoutes = require("./routes/adminroutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// Start Server
connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log("Backend2 server is running");
    });
}).catch((error) => {
    console.error("Server startup failed:", error.message);
});
