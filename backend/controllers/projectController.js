const Project = require("../models/projectModel");

exports.submitProject = async (req, res) => {
	try {
		if (req.user.role === "syndicate") {
			return res.status(403).json({ message: "Syndicate members cannot submit projects" });
		}

		const { title, description } = req.body;
		const project = new Project({
			title,
			description,
			submittedBy: req.user.id,
		});

		await project.save();
		res.status(201).json(project);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Additional controllers for dashboards, comments, and status updates can go here.
