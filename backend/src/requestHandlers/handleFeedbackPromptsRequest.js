import { generateFeedbackPrompts } from "../generateFeedbackPrompts.js";

export const handleFeedbackPromptsRequest = async (req, res) => {
	const { topic } = req.body;

	if (!topic || topic.trim() === "") {
		return res.status(400).json({
			error: "Topic is required and must be a non-empty string.",
		});
	}

	try {
		const prompts = await generateFeedbackPrompts(topic);
		res.status(200).json({ prompts });
	} catch (error) {
		console.error("Error in handleFeedbackPromptsRequest: ", error);
		res.status(500).json({
			error: "Failed to generate prompts due to an internal error.",
		});
	}
};
