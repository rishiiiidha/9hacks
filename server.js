const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const initializeDummyUsers = require("./utils/initializeDummyUsers");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
	console.log(`Server running on port ${PORT}`);
	await initializeDummyUsers();
});
