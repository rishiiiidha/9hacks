const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(400).json({ message: "User not found" });

		const validPassword = await bcrypt.compare(req.body.password, user.password);
		if (!validPassword) return res.status(400).json({ message: "Invalid password" });

		const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		res.json({ token, role: user.role });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
