const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const initializeDummyUsers = async () => {
	try {
		await User.deleteMany({});
		const users = [
			{ email: "user1@gmail.com", password: "12345", role: "syndicate" },
			{ email: "user2@gmail.com", password: "123456", role: "member" },
			{ email: "user3@gmail.com", password: "1234567", role: "member" },
		];

		for (const user of users) {
			const hashedPassword = await bcrypt.hash(user.password, 10);
			await User.create({ email: user.email, password: hashedPassword, role: user.role });
		}
		console.log("Dummy users created successfully");
	} catch (error) {
		console.error("Error creating dummy users:", error);
	}
};

module.exports = initializeDummyUsers;
