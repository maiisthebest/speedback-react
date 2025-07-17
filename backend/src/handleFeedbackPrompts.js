import { GoogleGenerativeAI } from "@google/generative-ai";

export const PROMPT_TEMPLATE = `Suggest 3–5 short and simple feedback prompts to help someone give constructive feedback to the person they were paired with during a speedback round (let's refer to as "their pair") about "{topic}". The prompts should be open-ended, encourage specific observations about the other person’s performance on this topic, and be phrased in a friendly and neutral tone. Do not include yes/no questions or any extra explanation. Return only the list of prompts.`;
export const AI_MODEL = "gemini-2.0-flash";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const handleFeedbackPrompts = async (topic) => {
	const prompt = PROMPT_TEMPLATE.replace("{topic}", topic);

	try {
		const model = genAI.getGenerativeModel({ model: AI_MODEL });
		const result = await model.generateContent(prompt);

		const responseText = await result.response.text();
		return responseText
			.split("\n")
			.map((line) => line.trim())
			.filter(Boolean);
	} catch (error) {
		console.error("Error generating topics: ", error);
	}
};

export default handleFeedbackPrompts;
