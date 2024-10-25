const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
	comments: [
		{
			text: String,
			addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
			date: { type: Date, default: Date.now },
		},
	],
	feedback: String,
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", projectSchema);
